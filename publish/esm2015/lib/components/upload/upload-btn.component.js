/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __awaiter, __decorate, __param } from "tslib";
import { ENTER } from '@angular/cdk/keycodes';
import { HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, Input, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { warn } from 'ng-zorro-antd/core/logger';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
let UploadBtnComponent = class UploadBtnComponent {
    constructor(http, fileService, comService) {
        this.http = http;
        this.fileService = fileService;
        this.comService = comService;
        this.reqs = {};
        this.destroy = false;
        if (!http) {
            throw new Error(`Not found 'HttpClient', You can import 'HttpClientModule' in your root module.`);
        }
    }
    onClick() {
        if (this.options.disabled || !this.options.openFileDialogOnClick) {
            return;
        }
        this.file.nativeElement.click();
    }
    onKeyDown(e) {
        if (this.options.disabled) {
            return;
        }
        if (e.key === 'Enter' || e.keyCode === ENTER) {
            this.onClick();
        }
    }
    // skip safari bug
    onFileDrop(e) {
        if (this.options.disabled || e.type === 'dragover') {
            e.preventDefault();
            return;
        }
        if (this.options.directory) {
            this.traverseFileTree(e.dataTransfer.items);
        }
        else {
            const files = Array.prototype.slice
                .call(e.dataTransfer.files)
                .filter((file) => this.attrAccept(file, this.options.accept));
            if (files.length) {
                this.uploadFiles(files);
            }
        }
        e.preventDefault();
    }
    onChange(e) {
        if (this.options.disabled) {
            return;
        }
        const hie = e.target;
        this.uploadFiles(hie.files);
        hie.value = '';
    }
    traverseFileTree(files) {
        const _traverseFileTree = (item, path) => {
            if (item.isFile) {
                item.file((file) => {
                    if (this.attrAccept(file, this.options.accept)) {
                        this.uploadFiles([file]);
                    }
                });
            }
            else if (item.isDirectory) {
                const dirReader = item.createReader();
                dirReader.readEntries((entries) => {
                    for (const entrieItem of entries) {
                        _traverseFileTree(entrieItem, `${path}${item.name}/`);
                    }
                });
            }
        };
        for (const file of files) {
            _traverseFileTree(file.webkitGetAsEntry(), '');
        }
    }
    attrAccept(file, acceptedFiles) {
        if (file && acceptedFiles) {
            const acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
            const fileName = '' + file.name;
            const mimeType = '' + file.type;
            const baseMimeType = mimeType.replace(/\/.*$/, '');
            return acceptedFilesArray.some(type => {
                const validType = type.trim();
                if (validType.charAt(0) === '.') {
                    return (fileName.toLowerCase().indexOf(validType.toLowerCase(), fileName.toLowerCase().length - validType.toLowerCase().length) !== -1);
                }
                else if (/\/\*$/.test(validType)) {
                    // This is something like a image/* mime type
                    return baseMimeType === validType.replace(/\/.*$/, '');
                }
                return mimeType === validType;
            });
        }
        return true;
    }
    attachUid(file) {
        if (!file.uid) {
            file.uid = Math.random().toString(36).substring(2);
        }
        return file;
    }
    uploadFiles(fileList) {
        let filters$ = of(Array.prototype.slice.call(fileList));
        if (this.options.filters) {
            this.options.filters.forEach(f => {
                filters$ = filters$.pipe(switchMap(list => {
                    const fnRes = f.fn(list);
                    return fnRes instanceof Observable ? fnRes : of(fnRes);
                }));
            });
        }
        filters$.subscribe(list => {
            list.forEach((file) => {
                this.attachUid(file);
                this.upload(file, list);
            });
        }, e => {
            warn(`Unhandled upload filter error`, e);
        });
    }
    upload(file, fileList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options.compress && fileList && fileList.length == 1) {
                const res = yield this.fileService.compress(fileList[0], this.options.quality, this.options.convertSize);
                res.uid = file.uid;
                file = res;
                fileList[0] = res;
            }
            if (!this.options.beforeUpload) {
                return this.post(file);
            }
            const before = this.options.beforeUpload(file, fileList);
            if (before instanceof Observable) {
                before.subscribe((processedFile) => {
                    const processedFileType = Object.prototype.toString.call(processedFile);
                    if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
                        this.attachUid(processedFile);
                        this.post(processedFile);
                    }
                    else if (typeof processedFile === 'boolean' && processedFile !== false) {
                        this.post(file);
                    }
                }, e => {
                    warn(`Unhandled upload beforeUpload error`, e);
                });
            }
            else if (before !== false) {
                return this.post(file);
            }
        });
    }
    post(file) {
        if (this.destroy) {
            return;
        }
        let process$ = of(file);
        const opt = this.options;
        const { uid } = file;
        const { action, data, headers, transformFile } = opt;
        const args = {
            action: typeof action === 'string' ? action : '',
            name: opt.name,
            headers,
            file,
            postFile: file,
            data,
            withCredentials: opt.withCredentials,
            onProgress: opt.onProgress
                ? e => {
                    opt.onProgress(e, file);
                }
                : undefined,
            onSuccess: (ret, xhr) => {
                this.clean(uid);
                opt.onSuccess(ret, file, xhr);
            },
            onError: xhr => {
                this.clean(uid);
                opt.onError(xhr, file);
            }
        };
        if (typeof action === 'function') {
            const actionResult = action(file);
            if (actionResult instanceof Observable) {
                process$ = process$.pipe(switchMap(() => actionResult), map(res => {
                    args.action = res;
                    return file;
                }));
            }
            else {
                args.action = actionResult;
            }
        }
        if (typeof transformFile === 'function') {
            const transformResult = transformFile(file);
            process$ = process$.pipe(switchMap(() => (transformResult instanceof Observable ? transformResult : of(transformResult))));
        }
        if (typeof data === 'function') {
            const dataResult = data(file);
            if (dataResult instanceof Observable) {
                process$ = process$.pipe(switchMap(() => dataResult), map(res => {
                    args.data = res;
                    return file;
                }));
            }
            else {
                args.data = dataResult;
            }
        }
        if (typeof headers === 'function') {
            const headersResult = headers(file);
            if (headersResult instanceof Observable) {
                process$ = process$.pipe(switchMap(() => headersResult), map(res => {
                    args.headers = res;
                    return file;
                }));
            }
            else {
                args.headers = headersResult;
            }
        }
        process$.subscribe(newFile => {
            args.postFile = newFile;
            const req$ = (opt.customRequest || this.xhr).call(this, args);
            if (!(req$ instanceof Subscription)) {
                warn(`Must return Subscription type in '[nzCustomRequest]' property`);
            }
            this.reqs[uid] = req$;
            opt.onStart(file);
        });
    }
    xhr(args) {
        const formData = new FormData();
        if (args.data) {
            Object.keys(args.data).map(key => {
                formData.append(key, args.data[key]);
            });
        }
        formData.append(args.name, args.postFile);
        if (!args.headers) {
            args.headers = {};
        }
        if (args.headers['X-Requested-With'] !== null) {
            args.headers['X-Requested-With'] = `XMLHttpRequest`;
        }
        else {
            delete args.headers['X-Requested-With'];
        }
        const req = new HttpRequest('POST', args.action, formData, {
            reportProgress: true,
            withCredentials: args.withCredentials,
            headers: new HttpHeaders(args.headers)
        });
        return this.http.request(req).subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
                if (event.total > 0) {
                    event.percent = (event.loaded / event.total) * 100;
                }
                args.onProgress(event, args.file);
            }
            else if (event instanceof HttpResponse) {
                args.onSuccess(event.body, args.file, event);
            }
        }, err => {
            this.abort(args.file);
            args.onError(err, args.file);
        });
    }
    clean(uid) {
        const req$ = this.reqs[uid];
        if (req$ instanceof Subscription) {
            req$.unsubscribe();
        }
        delete this.reqs[uid];
    }
    abort(file) {
        if (file) {
            this.clean(file && file.uid);
        }
        else {
            Object.keys(this.reqs).forEach(uid => this.clean(uid));
        }
    }
    ngOnDestroy() {
        this.destroy = true;
        this.abort();
    }
};
__decorate([
    ViewChild('file', { static: false })
], UploadBtnComponent.prototype, "file", void 0);
__decorate([
    Input()
], UploadBtnComponent.prototype, "options", void 0);
UploadBtnComponent = __decorate([
    Component({
        selector: '[nz-upload-btn]',
        exportAs: 'nzUploadBtn',
        template: "<input\r\n  type=\"file\"\r\n  #file\r\n  (change)=\"onChange($event)\"\r\n  [attr.accept]=\"options.accept\"\r\n  [attr.directory]=\"options.directory ? 'directory' : null\"\r\n  [attr.webkitdirectory]=\"options.directory ? 'webkitdirectory' : null\"\r\n  [multiple]=\"options.multiple\"\r\n  style=\"display: none;\"\r\n/>\r\n<ng-content></ng-content>\r\n",
        host: {
            '[attr.tabindex]': '"0"',
            '[attr.role]': '"button"',
            '[class.ant-upload]': 'true',
            '[class.ant-upload-disabled]': 'options.disabled',
            '(click)': 'onClick()',
            '(keydown)': 'onKeyDown($event)',
            '(drop)': 'onFileDrop($event)',
            '(dragover)': 'onFileDrop($event)'
        },
        preserveWhitespaces: false,
        encapsulation: ViewEncapsulation.None
    }),
    __param(0, Optional())
], UploadBtnComponent);
export { UploadBtnComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLWJ0bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy16b2VzL2xpYi9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQtYnRuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sRUFBeUIsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEgsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQWEsUUFBUSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUF3QmhELElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBd1Q3QixZQUFnQyxJQUFnQixFQUFTLFdBQStCLEVBQVMsVUFBNEI7UUFBN0YsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUFTLGVBQVUsR0FBVixVQUFVLENBQWtCO1FBdlQ3SCxTQUFJLEdBQW9DLEVBQUUsQ0FBQztRQUNuQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBdVR0QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1NBQ25HO0lBRUgsQ0FBQztJQXhURCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLElB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QixDQUFDLElBQUk7S0FDdEMsQ0FBQztJQXlUYSxXQUFBLFFBQVEsRUFBRSxDQUFBO0dBeFRaLGtCQUFrQixDQW1VOUI7U0FuVVksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEVOVEVSIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEV2ZW50LCBIdHRwRXZlbnRUeXBlLCBIdHRwSGVhZGVycywgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPcHRpb25hbCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB3YXJuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2xvZ2dlcic7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBGaWxlc1NlcnZpY2VTZXJ2aWNlIH0gZnJvbSAnLi9maWxlcy1zZXJ2aWNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRzU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZS9jb21wb25lbnRzLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgTnpVcGxvYWRGaWxlLCBOelVwbG9hZFhIUkFyZ3MsIFppcEJ1dHRvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ1tuei11cGxvYWQtYnRuXScsXHJcbiAgZXhwb3J0QXM6ICduelVwbG9hZEJ0bicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3VwbG9hZC1idG4uY29tcG9uZW50Lmh0bWwnLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnXCIwXCInLFxyXG4gICAgJ1thdHRyLnJvbGVdJzogJ1wiYnV0dG9uXCInLFxyXG4gICAgJ1tjbGFzcy5hbnQtdXBsb2FkXSc6ICd0cnVlJyxcclxuICAgICdbY2xhc3MuYW50LXVwbG9hZC1kaXNhYmxlZF0nOiAnb3B0aW9ucy5kaXNhYmxlZCcsXHJcbiAgICAnKGNsaWNrKSc6ICdvbkNsaWNrKCknLFxyXG4gICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXHJcbiAgICAnKGRyb3ApJzogJ29uRmlsZURyb3AoJGV2ZW50KScsXHJcbiAgICAnKGRyYWdvdmVyKSc6ICdvbkZpbGVEcm9wKCRldmVudCknXHJcbiAgfSxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVcGxvYWRCdG5Db21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIHJlcXM6IHsgW2tleTogc3RyaW5nXTogU3Vic2NyaXB0aW9uIH0gPSB7fTtcclxuICBwcml2YXRlIGRlc3Ryb3kgPSBmYWxzZTtcclxuICBAVmlld0NoaWxkKCdmaWxlJywgeyBzdGF0aWM6IGZhbHNlIH0pIGZpbGUhOiBFbGVtZW50UmVmO1xyXG4gIEBJbnB1dCgpIG9wdGlvbnMhOiBaaXBCdXR0b25PcHRpb25zO1xyXG4gIG9uQ2xpY2soKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVkIHx8ICF0aGlzLm9wdGlvbnMub3BlbkZpbGVEaWFsb2dPbkNsaWNrKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgICh0aGlzLmZpbGUubmF0aXZlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jbGljaygpO1xyXG4gIH1cclxuXHJcbiAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInIHx8IGUua2V5Q29kZSA9PT0gRU5URVIpIHtcclxuICAgICAgdGhpcy5vbkNsaWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBza2lwIHNhZmFyaSBidWdcclxuICBvbkZpbGVEcm9wKGU6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlZCB8fCBlLnR5cGUgPT09ICdkcmFnb3ZlcicpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdG9yeSkge1xyXG4gICAgICB0aGlzLnRyYXZlcnNlRmlsZVRyZWUoZS5kYXRhVHJhbnNmZXIhLml0ZW1zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGZpbGVzOiBGaWxlW10gPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcclxuICAgICAgICAuY2FsbChlLmRhdGFUcmFuc2ZlciEuZmlsZXMpXHJcbiAgICAgICAgLmZpbHRlcigoZmlsZTogRmlsZSkgPT4gdGhpcy5hdHRyQWNjZXB0KGZpbGUsIHRoaXMub3B0aW9ucy5hY2NlcHQpKTtcclxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMudXBsb2FkRmlsZXMoZmlsZXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UoZTogRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaGllID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMudXBsb2FkRmlsZXMoaGllLmZpbGVzISk7XHJcbiAgICBoaWUudmFsdWUgPSAnJztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhdmVyc2VGaWxlVHJlZShmaWxlczogRGF0YVRyYW5zZmVySXRlbUxpc3QpOiB2b2lkIHtcclxuICAgIGNvbnN0IF90cmF2ZXJzZUZpbGVUcmVlID0gKGl0ZW06IE56U2FmZUFueSwgcGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLmlzRmlsZSkge1xyXG4gICAgICAgIGl0ZW0uZmlsZSgoZmlsZTogRmlsZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuYXR0ckFjY2VwdChmaWxlLCB0aGlzLm9wdGlvbnMuYWNjZXB0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwbG9hZEZpbGVzKFtmaWxlXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5pc0RpcmVjdG9yeSkge1xyXG4gICAgICAgIGNvbnN0IGRpclJlYWRlciA9IGl0ZW0uY3JlYXRlUmVhZGVyKCk7XHJcblxyXG4gICAgICAgIGRpclJlYWRlci5yZWFkRW50cmllcygoZW50cmllczogTnpTYWZlQW55KSA9PiB7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGVudHJpZUl0ZW0gb2YgZW50cmllcykge1xyXG4gICAgICAgICAgICBfdHJhdmVyc2VGaWxlVHJlZShlbnRyaWVJdGVtLCBgJHtwYXRofSR7aXRlbS5uYW1lfS9gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMgYXMgTnpTYWZlQW55KSB7XHJcbiAgICAgIF90cmF2ZXJzZUZpbGVUcmVlKGZpbGUud2Via2l0R2V0QXNFbnRyeSgpLCAnJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGF0dHJBY2NlcHQoZmlsZTogRmlsZSwgYWNjZXB0ZWRGaWxlcz86IHN0cmluZyB8IHN0cmluZ1tdKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoZmlsZSAmJiBhY2NlcHRlZEZpbGVzKSB7XHJcbiAgICAgIGNvbnN0IGFjY2VwdGVkRmlsZXNBcnJheSA9IEFycmF5LmlzQXJyYXkoYWNjZXB0ZWRGaWxlcykgPyBhY2NlcHRlZEZpbGVzIDogYWNjZXB0ZWRGaWxlcy5zcGxpdCgnLCcpO1xyXG4gICAgICBjb25zdCBmaWxlTmFtZSA9ICcnICsgZmlsZS5uYW1lO1xyXG4gICAgICBjb25zdCBtaW1lVHlwZSA9ICcnICsgZmlsZS50eXBlO1xyXG4gICAgICBjb25zdCBiYXNlTWltZVR5cGUgPSBtaW1lVHlwZS5yZXBsYWNlKC9cXC8uKiQvLCAnJyk7XHJcblxyXG4gICAgICByZXR1cm4gYWNjZXB0ZWRGaWxlc0FycmF5LnNvbWUodHlwZSA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRUeXBlID0gdHlwZS50cmltKCk7XHJcbiAgICAgICAgaWYgKHZhbGlkVHlwZS5jaGFyQXQoMCkgPT09ICcuJykge1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgZmlsZU5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHZhbGlkVHlwZS50b0xvd2VyQ2FzZSgpLCBmaWxlTmFtZS50b0xvd2VyQ2FzZSgpLmxlbmd0aCAtIHZhbGlkVHlwZS50b0xvd2VyQ2FzZSgpLmxlbmd0aCkgIT09IC0xXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoL1xcL1xcKiQvLnRlc3QodmFsaWRUeXBlKSkge1xyXG4gICAgICAgICAgLy8gVGhpcyBpcyBzb21ldGhpbmcgbGlrZSBhIGltYWdlLyogbWltZSB0eXBlXHJcbiAgICAgICAgICByZXR1cm4gYmFzZU1pbWVUeXBlID09PSB2YWxpZFR5cGUucmVwbGFjZSgvXFwvLiokLywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWltZVR5cGUgPT09IHZhbGlkVHlwZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXR0YWNoVWlkKGZpbGU6IE56VXBsb2FkRmlsZSk6IE56VXBsb2FkRmlsZSB7XHJcbiAgICBpZiAoIWZpbGUudWlkKSB7XHJcbiAgICAgIGZpbGUudWlkID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbGU7XHJcbiAgfVxyXG5cclxuICB1cGxvYWRGaWxlcyhmaWxlTGlzdDogRmlsZUxpc3QgfCBGaWxlW10pOiB2b2lkIHtcclxuICAgIGxldCBmaWx0ZXJzJDogT2JzZXJ2YWJsZTxOelVwbG9hZEZpbGVbXT4gPSBvZihBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmaWxlTGlzdCkpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5maWx0ZXJzKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy5maWx0ZXJzLmZvckVhY2goZiA9PiB7XHJcbiAgICAgICAgZmlsdGVycyQgPSBmaWx0ZXJzJC5waXBlKFxyXG4gICAgICAgICAgc3dpdGNoTWFwKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmblJlcyA9IGYuZm4obGlzdCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmblJlcyBpbnN0YW5jZW9mIE9ic2VydmFibGUgPyBmblJlcyA6IG9mKGZuUmVzKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmaWx0ZXJzJC5zdWJzY3JpYmUoXHJcbiAgICAgIGxpc3QgPT4ge1xyXG4gICAgICAgIGxpc3QuZm9yRWFjaCgoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmF0dGFjaFVpZChmaWxlKTtcclxuICAgICAgICAgIHRoaXMudXBsb2FkKGZpbGUsIGxpc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBlID0+IHtcclxuICAgICAgICB3YXJuKGBVbmhhbmRsZWQgdXBsb2FkIGZpbHRlciBlcnJvcmAsIGUpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgdXBsb2FkIChmaWxlOiBOelVwbG9hZEZpbGUsIGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb21wcmVzcyAmJiBmaWxlTGlzdCAmJiBmaWxlTGlzdC5sZW5ndGggPT0gMSkge1xyXG4gICAgICBjb25zdCByZXM6YW55ID0gIGF3YWl0IHRoaXMuZmlsZVNlcnZpY2UuY29tcHJlc3MoZmlsZUxpc3RbMF0sdGhpcy5vcHRpb25zLnF1YWxpdHksdGhpcy5vcHRpb25zLmNvbnZlcnRTaXplKVxyXG4gICAgICByZXMudWlkID0gZmlsZS51aWQ7XHJcbiAgICAgIGZpbGUgPSByZXNcclxuICAgICAgZmlsZUxpc3RbMF0gPSByZXNcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5iZWZvcmVVcGxvYWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucG9zdChmaWxlKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGJlZm9yZSA9IHRoaXMub3B0aW9ucy5iZWZvcmVVcGxvYWQoZmlsZSwgZmlsZUxpc3QpO1xyXG4gICAgaWYgKGJlZm9yZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgYmVmb3JlLnN1YnNjcmliZShcclxuICAgICAgICAocHJvY2Vzc2VkRmlsZTogTnpVcGxvYWRGaWxlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBwcm9jZXNzZWRGaWxlVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzZWRGaWxlKTtcclxuICAgICAgICAgIGlmIChwcm9jZXNzZWRGaWxlVHlwZSA9PT0gJ1tvYmplY3QgRmlsZV0nIHx8IHByb2Nlc3NlZEZpbGVUeXBlID09PSAnW29iamVjdCBCbG9iXScpIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2hVaWQocHJvY2Vzc2VkRmlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucG9zdChwcm9jZXNzZWRGaWxlKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3NlZEZpbGUgPT09ICdib29sZWFuJyAmJiBwcm9jZXNzZWRGaWxlICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc3QoZmlsZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlID0+IHtcclxuICAgICAgICAgIHdhcm4oYFVuaGFuZGxlZCB1cGxvYWQgYmVmb3JlVXBsb2FkIGVycm9yYCwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChiZWZvcmUgIT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoZmlsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBvc3QoZmlsZTogTnpVcGxvYWRGaWxlKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5kZXN0cm95KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBwcm9jZXNzJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBCbG9iIHwgRmlsZSB8IE56VXBsb2FkRmlsZT4gPSBvZihmaWxlKTtcclxuICAgIGNvbnN0IG9wdCA9IHRoaXMub3B0aW9ucztcclxuICAgIGNvbnN0IHsgdWlkIH0gPSBmaWxlO1xyXG4gICAgY29uc3QgeyBhY3Rpb24sIGRhdGEsIGhlYWRlcnMsIHRyYW5zZm9ybUZpbGUgfSA9IG9wdDtcclxuXHJcbiAgICBjb25zdCBhcmdzOiBOelVwbG9hZFhIUkFyZ3MgPSB7XHJcbiAgICAgIGFjdGlvbjogdHlwZW9mIGFjdGlvbiA9PT0gJ3N0cmluZycgPyBhY3Rpb24gOiAnJyxcclxuICAgICAgbmFtZTogb3B0Lm5hbWUsXHJcbiAgICAgIGhlYWRlcnMsXHJcbiAgICAgIGZpbGUsXHJcbiAgICAgIHBvc3RGaWxlOiBmaWxlLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IG9wdC53aXRoQ3JlZGVudGlhbHMsXHJcbiAgICAgIG9uUHJvZ3Jlc3M6IG9wdC5vblByb2dyZXNzXHJcbiAgICAgICAgPyBlID0+IHtcclxuICAgICAgICAgIG9wdC5vblByb2dyZXNzIShlLCBmaWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICAgIG9uU3VjY2VzczogKHJldCwgeGhyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jbGVhbih1aWQpO1xyXG4gICAgICAgIG9wdC5vblN1Y2Nlc3MhKHJldCwgZmlsZSwgeGhyKTtcclxuICAgICAgfSxcclxuICAgICAgb25FcnJvcjogeGhyID0+IHtcclxuICAgICAgICB0aGlzLmNsZWFuKHVpZCk7XHJcbiAgICAgICAgb3B0Lm9uRXJyb3IhKHhociwgZmlsZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgY29uc3QgYWN0aW9uUmVzdWx0ID0gKGFjdGlvbiBhcyAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz4pKGZpbGUpO1xyXG4gICAgICBpZiAoYWN0aW9uUmVzdWx0IGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICAgIHByb2Nlc3MkID0gcHJvY2VzcyQucGlwZShcclxuICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiBhY3Rpb25SZXN1bHQpLFxyXG4gICAgICAgICAgbWFwKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGFyZ3MuYWN0aW9uID0gcmVzO1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsZTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhcmdzLmFjdGlvbiA9IGFjdGlvblJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdHJhbnNmb3JtRmlsZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBjb25zdCB0cmFuc2Zvcm1SZXN1bHQgPSB0cmFuc2Zvcm1GaWxlKGZpbGUpO1xyXG4gICAgICBwcm9jZXNzJCA9IHByb2Nlc3MkLnBpcGUoc3dpdGNoTWFwKCgpID0+ICh0cmFuc2Zvcm1SZXN1bHQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlID8gdHJhbnNmb3JtUmVzdWx0IDogb2YodHJhbnNmb3JtUmVzdWx0KSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgY29uc3QgZGF0YVJlc3VsdCA9IChkYXRhIGFzIChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHt9IHwgT2JzZXJ2YWJsZTx7fT4pKGZpbGUpO1xyXG4gICAgICBpZiAoZGF0YVJlc3VsdCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgICBwcm9jZXNzJCA9IHByb2Nlc3MkLnBpcGUoXHJcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZGF0YVJlc3VsdCksXHJcbiAgICAgICAgICBtYXAocmVzID0+IHtcclxuICAgICAgICAgICAgYXJncy5kYXRhID0gcmVzO1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsZTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhcmdzLmRhdGEgPSBkYXRhUmVzdWx0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBoZWFkZXJzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGNvbnN0IGhlYWRlcnNSZXN1bHQgPSAoaGVhZGVycyBhcyAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB7fSB8IE9ic2VydmFibGU8e30+KShmaWxlKTtcclxuICAgICAgaWYgKGhlYWRlcnNSZXN1bHQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XHJcbiAgICAgICAgcHJvY2VzcyQgPSBwcm9jZXNzJC5waXBlKFxyXG4gICAgICAgICAgc3dpdGNoTWFwKCgpID0+IGhlYWRlcnNSZXN1bHQpLFxyXG4gICAgICAgICAgbWFwKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGFyZ3MuaGVhZGVycyA9IHJlcztcclxuICAgICAgICAgICAgcmV0dXJuIGZpbGU7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXJncy5oZWFkZXJzID0gaGVhZGVyc1Jlc3VsdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3MkLnN1YnNjcmliZShuZXdGaWxlID0+IHtcclxuICAgICAgYXJncy5wb3N0RmlsZSA9IG5ld0ZpbGU7XHJcbiAgICAgIGNvbnN0IHJlcSQgPSAob3B0LmN1c3RvbVJlcXVlc3QgfHwgdGhpcy54aHIpLmNhbGwodGhpcywgYXJncyk7XHJcbiAgICAgIGlmICghKHJlcSQgaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24pKSB7XHJcbiAgICAgICAgd2FybihgTXVzdCByZXR1cm4gU3Vic2NyaXB0aW9uIHR5cGUgaW4gJ1tuekN1c3RvbVJlcXVlc3RdJyBwcm9wZXJ0eWApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVxc1t1aWRdID0gcmVxJDtcclxuICAgICAgb3B0Lm9uU3RhcnQhKGZpbGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHhocihhcmdzOiBOelVwbG9hZFhIUkFyZ3MpOiBTdWJzY3JpcHRpb24ge1xyXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuXHJcbiAgICBpZiAoYXJncy5kYXRhKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKGFyZ3MuZGF0YSkubWFwKGtleSA9PiB7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgYXJncy5kYXRhIVtrZXldKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybURhdGEuYXBwZW5kKGFyZ3MubmFtZSEsIGFyZ3MucG9zdEZpbGUgYXMgTnpTYWZlQW55KTtcclxuXHJcbiAgICBpZiAoIWFyZ3MuaGVhZGVycykge1xyXG4gICAgICBhcmdzLmhlYWRlcnMgPSB7fTtcclxuICAgIH1cclxuICAgIGlmIChhcmdzLmhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSAhPT0gbnVsbCkge1xyXG4gICAgICBhcmdzLmhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSA9IGBYTUxIdHRwUmVxdWVzdGA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkZWxldGUgYXJncy5oZWFkZXJzWydYLVJlcXVlc3RlZC1XaXRoJ107XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXEgPSBuZXcgSHR0cFJlcXVlc3QoJ1BPU1QnLCBhcmdzLmFjdGlvbiEsIGZvcm1EYXRhLCB7XHJcbiAgICAgIHJlcG9ydFByb2dyZXNzOiB0cnVlLFxyXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IGFyZ3Mud2l0aENyZWRlbnRpYWxzLFxyXG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoYXJncy5oZWFkZXJzKVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QocmVxKS5zdWJzY3JpYmUoXHJcbiAgICAgIChldmVudDogSHR0cEV2ZW50PE56U2FmZUFueT4pID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gSHR0cEV2ZW50VHlwZS5VcGxvYWRQcm9ncmVzcykge1xyXG4gICAgICAgICAgaWYgKGV2ZW50LnRvdGFsISA+IDApIHtcclxuICAgICAgICAgICAgKGV2ZW50IGFzIE56U2FmZUFueSkucGVyY2VudCA9IChldmVudC5sb2FkZWQgLyBldmVudC50b3RhbCEpICogMTAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYXJncy5vblByb2dyZXNzIShldmVudCwgYXJncy5maWxlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBhcmdzLm9uU3VjY2VzcyEoZXZlbnQuYm9keSwgYXJncy5maWxlLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBlcnIgPT4ge1xyXG4gICAgICAgIHRoaXMuYWJvcnQoYXJncy5maWxlKTtcclxuICAgICAgICBhcmdzLm9uRXJyb3IhKGVyciwgYXJncy5maWxlKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYW4odWlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJlcSQgPSB0aGlzLnJlcXNbdWlkXTtcclxuICAgIGlmIChyZXEkIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHJlcSQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIGRlbGV0ZSB0aGlzLnJlcXNbdWlkXTtcclxuICB9XHJcblxyXG4gIGFib3J0KGZpbGU/OiBOelVwbG9hZEZpbGUpOiB2b2lkIHtcclxuICAgIGlmIChmaWxlKSB7XHJcbiAgICAgIHRoaXMuY2xlYW4oZmlsZSAmJiBmaWxlLnVpZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnJlcXMpLmZvckVhY2godWlkID0+IHRoaXMuY2xlYW4odWlkKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQscHJpdmF0ZSBmaWxlU2VydmljZTpGaWxlc1NlcnZpY2VTZXJ2aWNlLHByaXZhdGUgY29tU2VydmljZTpDb21wb25lbnRzU2VydmljZSkge1xyXG4gICAgaWYgKCFodHRwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IGZvdW5kICdIdHRwQ2xpZW50JywgWW91IGNhbiBpbXBvcnQgJ0h0dHBDbGllbnRNb2R1bGUnIGluIHlvdXIgcm9vdCBtb2R1bGUuYCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLmRlc3Ryb3kgPSB0cnVlO1xyXG4gICAgdGhpcy5hYm9ydCgpO1xyXG4gIH1cclxufVxyXG4iXX0=