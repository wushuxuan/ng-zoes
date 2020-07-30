import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { InputBoolean, InputNumber, toBoolean } from 'ng-zorro-antd/core/util';
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
let UploadComponent = class UploadComponent {
    // #endregion
    constructor(cdr, localeService, injector) {
        this.cdr = cdr;
        this.localeService = localeService;
        this.injector = injector;
        this.nzType = 'select';
        this.nzSort = false;
        this.nzLimit = 0;
        this.nzSize = 0;
        this.nzDirectory = false;
        this.nzOpenFileDialogOnClick = true;
        this.nzFilter = [];
        this.nzFileList = [];
        this.nzDisabled = false;
        this.nzCompress = false;
        this.nzQuality = 0.5;
        this.NZConvertSize = 5000;
        this.nzListType = 'text';
        this.nzMultiple = false;
        this.nzName = 'file';
        this._showUploadList = true;
        this.nzShowButton = true;
        this.nzWithCredentials = false;
        this.nzIconRender = null;
        this.nzFileListRender = null;
        this.nzChange = new EventEmitter();
        this.nzFileListChange = new EventEmitter();
        this.onStart = (file) => {
            if (!this.nzFileList) {
                this.nzFileList = [];
            }
            const targetItem = this.fileToObject(file);
            targetItem.status = 'uploading';
            this.nzFileList = this.nzFileList.concat(targetItem);
            this.nzFileListChange.emit(this.nzFileList);
            this.nzChange.emit({ file: targetItem, fileList: this.nzFileList, type: 'start' });
            this.detectChangesList();
        };
        this.onProgress = (e, file) => {
            const fileList = this.nzFileList;
            const targetItem = this.getFileItem(file, fileList);
            targetItem.percent = e.percent;
            this.nzChange.emit({
                event: e,
                file: Object.assign({}, targetItem),
                fileList: this.nzFileList,
                type: 'progress'
            });
            this.detectChangesList();
        };
        this.onSuccess = (res, file) => {
            const fileList = this.nzFileList;
            const targetItem = this.getFileItem(file, fileList);
            targetItem.status = 'done';
            targetItem.response = res;
            this.nzChange.emit({
                file: Object.assign({}, targetItem),
                fileList,
                type: 'success'
            });
            this.detectChangesList();
        };
        this.onError = (err, file) => {
            const fileList = this.nzFileList;
            const targetItem = this.getFileItem(file, fileList);
            targetItem.error = err;
            targetItem.status = this.nzAction ? 'error' : 'done';
            this.nzChange.emit({
                file: Object.assign({}, targetItem),
                fileList,
                type: this.nzAction ? 'error' : 'success'
            });
            this.detectChangesList();
        };
        this.onRemove = (file) => {
            this.uploadComp.abort(file);
            file.status = 'removed';
            const fnRes = typeof this.nzRemove === 'function' ? this.nzRemove(file) : this.nzRemove == null ? true : this.nzRemove;
            (fnRes instanceof Observable ? fnRes : of(fnRes)).pipe(filter((res) => res)).subscribe(() => {
                this.nzFileList = this.removeFileItem(file, this.nzFileList);
                this.nzChange.emit({
                    file,
                    fileList: this.nzFileList,
                    type: 'removed'
                });
                this.nzFileListChange.emit(this.nzFileList);
                this.cdr.detectChanges();
            });
        };
        // #endregion
        // #region styles
        this.prefixCls = 'ant-upload';
        this.classList = [];
        this.locale = this.localeService.getData('zu');
        this.detectChangesList();
    }
    set nzShowUploadList(value) {
        this._showUploadList = typeof value === 'boolean' ? toBoolean(value) : value;
    }
    get nzShowUploadList() {
        return this._showUploadList;
    }
    zipOptions() {
        if (typeof this.nzShowUploadList === 'boolean' && this.nzShowUploadList) {
            this.nzShowUploadList = {
                showPreviewIcon: true,
                showRemoveIcon: true,
                showDownloadIcon: true
            };
        }
        // filters
        const filters = this.nzFilter.slice();
        if (this.nzMultiple && this.nzLimit > 0 && filters.findIndex(w => w.name === 'limit') === -1) {
            filters.push({
                name: 'limit',
                fn: (fileList) => fileList.slice(-this.nzLimit)
            });
        }
        if (this.nzSize > 0 && filters.findIndex(w => w.name === 'size') === -1) {
            filters.push({
                name: 'size',
                fn: (fileList) => fileList.filter(w => w.size / 1024 <= this.nzSize)
            });
        }
        if (this.nzFileType && this.nzFileType.length > 0 && filters.findIndex(w => w.name === 'type') === -1) {
            const types = this.nzFileType.split(',');
            filters.push({
                name: 'type',
                fn: (fileList) => fileList.filter(w => ~types.indexOf(w.type))
            });
        }
        this._btnOptions = {
            compress: this.nzCompress,
            quality: this.nzQuality,
            convertSize: this.NZConvertSize,
            disabled: this.nzDisabled,
            accept: this.nzAccept,
            action: this.nzAction,
            directory: this.nzDirectory,
            openFileDialogOnClick: this.nzOpenFileDialogOnClick,
            beforeUpload: this.nzBeforeUpload,
            customRequest: this.nzCustomRequest,
            data: this.nzData,
            headers: this.nzHeaders,
            name: this.nzName,
            multiple: this.nzMultiple,
            withCredentials: this.nzWithCredentials,
            filters,
            transformFile: this.nzTransformFile,
            onStart: this.onStart,
            onProgress: this.onProgress,
            onSuccess: this.onSuccess,
            onError: this.onError
        };
        return this;
    }
    // #region upload
    fileToObject(file) {
        return {
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.filename || file.name,
            size: file.size,
            type: file.type,
            uid: file.uid,
            response: file.response,
            error: file.error,
            percent: 0,
            originFileObj: file
        };
    }
    getFileItem(file, fileList) {
        return fileList.filter(item => item.uid === file.uid)[0];
    }
    removeFileItem(file, fileList) {
        return fileList.filter(item => item.uid !== file.uid);
    }
    // skip safari bug
    fileDrop(e) {
        if (e.type === this.dragState) {
            return;
        }
        this.dragState = e.type;
        this.setClassMap();
    }
    // #endregion
    // #region list
    detectChangesList() {
        // this.cdr.detectChanges();
        // this.listComp.detectChanges();
    }
    setClassMap() {
        let subCls = [];
        if (this.nzType === 'drag') {
            if (this.nzFileList.some(file => file.status === 'uploading')) {
                subCls.push(`${this.prefixCls}-drag-uploading`);
            }
            if (this.dragState === 'dragover') {
                subCls.push(`${this.prefixCls}-drag-hover`);
            }
        }
        else {
            subCls = [`${this.prefixCls}-select-${this.nzListType}`];
        }
        this.classList = [
            this.prefixCls,
            `${this.prefixCls}-${this.nzType}`,
            ...subCls,
            (this.nzDisabled && `${this.prefixCls}-disabled`) || ''
        ].filter(item => !!item);
        this.cdr.detectChanges();
    }
    // #endregion
    ngOnInit() {
    }
    ngOnChanges() {
        this.zipOptions().setClassMap();
    }
    listChange(e) {
        this.nzFileList = e;
        console.log(e);
        this.nzChange.emit({ file: e.length > 0 ? e[e.length - 1] : {}, fileList: e, type: 'sort' });
    }
};
__decorate([
    ViewChild('uploadComp', { static: false })
], UploadComponent.prototype, "uploadComp", void 0);
__decorate([
    ViewChild('listComp', { static: false })
], UploadComponent.prototype, "listComp", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "option", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzType", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzSort", void 0);
__decorate([
    Input(), InputNumber()
], UploadComponent.prototype, "nzLimit", void 0);
__decorate([
    Input(), InputNumber()
], UploadComponent.prototype, "nzSize", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzFileType", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzAccept", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzAction", void 0);
__decorate([
    Input(), InputBoolean()
], UploadComponent.prototype, "nzDirectory", void 0);
__decorate([
    Input(), InputBoolean()
], UploadComponent.prototype, "nzOpenFileDialogOnClick", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzBeforeUpload", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzCustomRequest", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzData", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzFilter", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzFileList", void 0);
__decorate([
    Input(), InputBoolean()
], UploadComponent.prototype, "nzDisabled", void 0);
__decorate([
    Input(), InputBoolean()
], UploadComponent.prototype, "nzCompress", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzQuality", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "NZConvertSize", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzHeaders", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzListType", void 0);
__decorate([
    Input(), InputBoolean()
], UploadComponent.prototype, "nzMultiple", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzName", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzShowUploadList", null);
__decorate([
    Input(), InputBoolean()
], UploadComponent.prototype, "nzShowButton", void 0);
__decorate([
    Input(), InputBoolean()
], UploadComponent.prototype, "nzWithCredentials", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzRemove", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzPreview", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzPreviewFile", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzTransformFile", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzDownload", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzIconRender", void 0);
__decorate([
    Input()
], UploadComponent.prototype, "nzFileListRender", void 0);
__decorate([
    Output()
], UploadComponent.prototype, "nzChange", void 0);
__decorate([
    Output()
], UploadComponent.prototype, "nzFileListChange", void 0);
UploadComponent = __decorate([
    Component({
        selector: 'zu',
        template: "<ng-template #list>\r\n  <nz-upload-list *ngIf=\"!nzFileListRender\" #listComp [style.display]=\"nzShowUploadList ? '' : 'none'\" [locale]=\"locale\"\r\n    [listType]=\"nzListType\" [items]=\"nzFileList || []\" [icons]=\"$any(nzShowUploadList)\" [iconRender]=\"nzIconRender\"\r\n    [previewFile]=\"nzPreviewFile\" [onPreview]=\"nzPreview\" [onRemove]=\"onRemove\" [onDownload]=\"nzDownload\"\r\n    [nzAction]=\"nzAction\" [nzSort]=\"nzSort\" (listChange)=\"listChange($event)\"></nz-upload-list>\r\n  <ng-container *ngIf=\"nzFileListRender\">\r\n    <ng-container *ngTemplateOutlet=\"nzFileListRender; context: { $implicit: nzFileList }\"></ng-container>\r\n  </ng-container>\r\n</ng-template>\r\n<ng-template #con>\r\n  <ng-content></ng-content>\r\n</ng-template>\r\n<ng-template #btn>\r\n  <div [ngClass]=\"classList\" [style.display]=\"nzShowButton ? '' : 'none'\">\r\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\">\r\n      <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\r\n    </div>\r\n  </div>\r\n</ng-template>\r\n<ng-container *ngIf=\"nzType === 'drag'; else select\">\r\n  <div [ngClass]=\"classList\" (drop)=\"fileDrop($event)\" (dragover)=\"fileDrop($event)\" (dragleave)=\"fileDrop($event)\">\r\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\" class=\"ant-upload-btn\">\r\n      <div class=\"ant-upload-drag-container\">\r\n        <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\r\n</ng-container>\r\n<ng-template #select>\r\n  <ng-container *ngIf=\"nzListType === 'picture-card'; else pic\">\r\n    <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\r\n    <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\r\n  </ng-container>\r\n</ng-template>\r\n<ng-template #pic>\r\n  <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\r\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\r\n</ng-template>\r\n",
        styles: [".file_uplaod_list{border:1px solid #d9d9d9;border-radius:2px;cursor:pointer;float:left;height:104px;margin:0 8px 8px 0;padding:6px;position:relative;width:104px}.file_upload{height:90px;overflow:hidden;text-align:center;width:100%}.file_upload_icon{font-size:26px;line-height:54px;opacity:.8}.file_upload_text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file_uplaod_delete{color:red;font-size:18px;position:absolute;right:-4px;top:-4px}"]
    })
], UploadComponent);
export { UploadComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXpvZXMvbGliL2NvbXBvbmVudHMvdXBsb2FkL3VwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFHTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBRU4sU0FBUyxFQUVWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFtQi9FLFNBQVMsU0FBUyxDQUFDLElBQVU7SUFDM0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBT0QsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQW9JMUIsYUFBYTtJQUViLFlBQW9CLEdBQXNCLEVBQVUsYUFBNEIsRUFDdEUsUUFBa0I7UUFEUixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ3RFLGFBQVEsR0FB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RTt5REFBOEY7QUF6RTVGLGVBQWU7SUFMM0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLElBQUk7UUFDZCw4OERBQXNDOztLQUV2QyxDQUFDO0dBQ1csZUFBZSxDQXFUM0I7U0FyVFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEluamVjdG9yXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnVtYmVySW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBMb2NhbGVTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi90aGVtZS9sb2NhbGUuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIElucHV0TnVtYmVyLCB0b0Jvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XHJcbmltcG9ydCB7IE56STE4blNlcnZpY2UsIE56VXBsb2FkSTE4bkludGVyZmFjZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XHJcbmltcG9ydCB7IE56TW9kYWxTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tb2RhbCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE56U2hvd1VwbG9hZExpc3QsXHJcbiAgTnpVcGxvYWRDaGFuZ2VQYXJhbSxcclxuICBOelVwbG9hZEZpbGUsXHJcbiAgTnpVcGxvYWRMaXN0VHlwZSxcclxuICBOelVwbG9hZFRyYW5zZm9ybUZpbGVUeXBlLFxyXG4gIE56VXBsb2FkVHlwZSxcclxuICBOelVwbG9hZFhIUkFyZ3MsXHJcbiAgVXBsb2FkRmlsdGVyLFxyXG4gIFppcEJ1dHRvbk9wdGlvbnNcclxufSBmcm9tICcuL2ludGVyZmFjZSc7XHJcbmltcG9ydCB7IFVwbG9hZEJ0bkNvbXBvbmVudCB9IGZyb20gJy4vdXBsb2FkLWJ0bi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBVcGxvYWRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi91cGxvYWQtbGlzdC5jb21wb25lbnQnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGdldEJhc2U2NChmaWxlOiBGaWxlKTogUHJvbWlzZTxzdHJpbmcgfCBBcnJheUJ1ZmZlciB8IG51bGw+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XHJcbiAgICByZWFkZXIub25lcnJvciA9IGVycm9yID0+IHJlamVjdChlcnJvcik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnenUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi91cGxvYWQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3VwbG9hZC5jb21wb25lbnQuc3R5bCddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekxpbWl0OiBOdW1iZXJJbnB1dDtcclxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaXplOiBOdW1iZXJJbnB1dDtcclxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXJlY3Rvcnk6IEJvb2xlYW5JbnB1dDtcclxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpPcGVuRmlsZURpYWxvZ09uQ2xpY2s6IEJvb2xlYW5JbnB1dDtcclxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xyXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek11bHRpcGxlOiBCb29sZWFuSW5wdXQ7XHJcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1VwbG9hZExpc3Q6IEJvb2xlYW5JbnB1dCB8IE56U2hvd1VwbG9hZExpc3QgfCB1bmRlZmluZWQgfCBudWxsO1xyXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dCdXR0b246IEJvb2xlYW5JbnB1dDtcclxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpXaXRoQ3JlZGVudGlhbHM6IEJvb2xlYW5JbnB1dDtcclxuXHJcbiAgcHJpdmF0ZSBpMThuJCE6IFN1YnNjcmlwdGlvbjtcclxuICBAVmlld0NoaWxkKCd1cGxvYWRDb21wJywgeyBzdGF0aWM6IGZhbHNlIH0pIHVwbG9hZENvbXAhOiBVcGxvYWRCdG5Db21wb25lbnQ7XHJcbiAgQFZpZXdDaGlsZCgnbGlzdENvbXAnLCB7IHN0YXRpYzogZmFsc2UgfSkgbGlzdENvbXAhOiBVcGxvYWRMaXN0Q29tcG9uZW50O1xyXG5cclxuICBsb2NhbGUhOiBOelVwbG9hZEkxOG5JbnRlcmZhY2U7XHJcblxyXG4gIC8vICNyZWdpb24gZmllbGRzXHJcblxyXG4gIEBJbnB1dCgpIG9wdGlvbjogYW55O1xyXG5cclxuICBASW5wdXQoKSBuelR5cGU6IE56VXBsb2FkVHlwZSA9ICdzZWxlY3QnO1xyXG4gIEBJbnB1dCgpIG56U29ydDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56TGltaXQgPSAwO1xyXG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56U2l6ZSA9IDA7XHJcblxyXG4gIEBJbnB1dCgpIG56RmlsZVR5cGU/OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgbnpBY2NlcHQ/OiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBASW5wdXQoKSBuekFjdGlvbj86IHN0cmluZyB8ICgoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz4pO1xyXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpcmVjdG9yeSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek9wZW5GaWxlRGlhbG9nT25DbGljayA9IHRydWU7XHJcbiAgQElucHV0KCkgbnpCZWZvcmVVcGxvYWQ/OiAoZmlsZTogTnpVcGxvYWRGaWxlLCBmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pID0+IGJvb2xlYW4gfCBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG4gIEBJbnB1dCgpIG56Q3VzdG9tUmVxdWVzdD86IChpdGVtOiBOelVwbG9hZFhIUkFyZ3MpID0+IFN1YnNjcmlwdGlvbjtcclxuICBASW5wdXQoKSBuekRhdGE/OiB7fSB8ICgoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB7fSB8IE9ic2VydmFibGU8e30+KTtcclxuICBASW5wdXQoKSBuekZpbHRlcjogVXBsb2FkRmlsdGVyW10gPSBbXTtcclxuICBASW5wdXQoKSBuekZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSA9IFtdO1xyXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkID0gZmFsc2U7XHJcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q29tcHJlc3MgPSBmYWxzZTtcclxuICBASW5wdXQoKSBuelF1YWxpdHk6TnVtYmVyID0gMC41O1xyXG4gIEBJbnB1dCgpIE5aQ29udmVydFNpemU6TnVtYmVyID0gNTAwMDtcclxuXHJcbiAgQElucHV0KCkgbnpIZWFkZXJzPzoge30gfCAoKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4ge30gfCBPYnNlcnZhYmxlPHt9Pik7XHJcbiAgQElucHV0KCkgbnpMaXN0VHlwZTogTnpVcGxvYWRMaXN0VHlwZSA9ICd0ZXh0JztcclxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpNdWx0aXBsZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIG56TmFtZSA9ICdmaWxlJztcclxuXHJcbiAgcHJpdmF0ZSBfc2hvd1VwbG9hZExpc3Q6IGJvb2xlYW4gfCBOelNob3dVcGxvYWRMaXN0ID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgbnpTaG93VXBsb2FkTGlzdCh2YWx1ZTogYm9vbGVhbiB8IE56U2hvd1VwbG9hZExpc3QpIHtcclxuICAgIHRoaXMuX3Nob3dVcGxvYWRMaXN0ID0gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgPyB0b0Jvb2xlYW4odmFsdWUpIDogdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgbnpTaG93VXBsb2FkTGlzdCgpOiBib29sZWFuIHwgTnpTaG93VXBsb2FkTGlzdCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hvd1VwbG9hZExpc3Q7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93QnV0dG9uID0gdHJ1ZTtcclxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpXaXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gIEBJbnB1dCgpIG56UmVtb3ZlPzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gYm9vbGVhbiB8IE9ic2VydmFibGU8Ym9vbGVhbj47XHJcbiAgQElucHV0KCkgbnpQcmV2aWV3PzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gdm9pZDtcclxuICBASW5wdXQoKSBuelByZXZpZXdGaWxlPzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG4gIEBJbnB1dCgpIG56VHJhbnNmb3JtRmlsZT86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IE56VXBsb2FkVHJhbnNmb3JtRmlsZVR5cGU7XHJcbiAgQElucHV0KCkgbnpEb3dubG9hZD86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHZvaWQ7XHJcbiAgQElucHV0KCkgbnpJY29uUmVuZGVyOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XHJcbiAgQElucHV0KCkgbnpGaWxlTGlzdFJlbmRlcjogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2hhbmdlOiBFdmVudEVtaXR0ZXI8TnpVcGxvYWRDaGFuZ2VQYXJhbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE56VXBsb2FkQ2hhbmdlUGFyYW0+KCk7XHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RmlsZUxpc3RDaGFuZ2U6IEV2ZW50RW1pdHRlcjxOelVwbG9hZEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPE56VXBsb2FkRmlsZVtdPigpO1xyXG5cclxuICBfYnRuT3B0aW9ucz86IFppcEJ1dHRvbk9wdGlvbnM7XHJcblxyXG4gIHByaXZhdGUgemlwT3B0aW9ucygpOiB0aGlzIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5uelNob3dVcGxvYWRMaXN0ID09PSAnYm9vbGVhbicgJiYgdGhpcy5uelNob3dVcGxvYWRMaXN0KSB7XHJcbiAgICAgIHRoaXMubnpTaG93VXBsb2FkTGlzdCA9IHtcclxuICAgICAgICBzaG93UHJldmlld0ljb246IHRydWUsXHJcbiAgICAgICAgc2hvd1JlbW92ZUljb246IHRydWUsXHJcbiAgICAgICAgc2hvd0Rvd25sb2FkSWNvbjogdHJ1ZVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gZmlsdGVyc1xyXG4gICAgY29uc3QgZmlsdGVyczogVXBsb2FkRmlsdGVyW10gPSB0aGlzLm56RmlsdGVyLnNsaWNlKCk7XHJcbiAgICBpZiAodGhpcy5uek11bHRpcGxlICYmIHRoaXMubnpMaW1pdCA+IDAgJiYgZmlsdGVycy5maW5kSW5kZXgodyA9PiB3Lm5hbWUgPT09ICdsaW1pdCcpID09PSAtMSkge1xyXG4gICAgICBmaWx0ZXJzLnB1c2goe1xyXG4gICAgICAgIG5hbWU6ICdsaW1pdCcsXHJcbiAgICAgICAgZm46IChmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pID0+IGZpbGVMaXN0LnNsaWNlKC10aGlzLm56TGltaXQpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubnpTaXplID4gMCAmJiBmaWx0ZXJzLmZpbmRJbmRleCh3ID0+IHcubmFtZSA9PT0gJ3NpemUnKSA9PT0gLTEpIHtcclxuICAgICAgZmlsdGVycy5wdXNoKHtcclxuICAgICAgICBuYW1lOiAnc2l6ZScsXHJcbiAgICAgICAgZm46IChmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pID0+IGZpbGVMaXN0LmZpbHRlcih3ID0+IHcuc2l6ZSEgLyAxMDI0IDw9IHRoaXMubnpTaXplKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm56RmlsZVR5cGUgJiYgdGhpcy5uekZpbGVUeXBlLmxlbmd0aCA+IDAgJiYgZmlsdGVycy5maW5kSW5kZXgodyA9PiB3Lm5hbWUgPT09ICd0eXBlJykgPT09IC0xKSB7XHJcbiAgICAgIGNvbnN0IHR5cGVzID0gdGhpcy5uekZpbGVUeXBlLnNwbGl0KCcsJyk7XHJcbiAgICAgIGZpbHRlcnMucHVzaCh7XHJcbiAgICAgICAgbmFtZTogJ3R5cGUnLFxyXG4gICAgICAgIGZuOiAoZmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdKSA9PiBmaWxlTGlzdC5maWx0ZXIodyA9PiB+dHlwZXMuaW5kZXhPZih3LnR5cGUhKSlcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9idG5PcHRpb25zID0ge1xyXG4gICAgICBjb21wcmVzczp0aGlzLm56Q29tcHJlc3MsXHJcbiAgICAgIHF1YWxpdHk6dGhpcy5uelF1YWxpdHksXHJcbiAgICAgIGNvbnZlcnRTaXplOnRoaXMuTlpDb252ZXJ0U2l6ZSxcclxuICAgICAgZGlzYWJsZWQ6IHRoaXMubnpEaXNhYmxlZCxcclxuICAgICAgYWNjZXB0OiB0aGlzLm56QWNjZXB0LFxyXG4gICAgICBhY3Rpb246IHRoaXMubnpBY3Rpb24sXHJcbiAgICAgIGRpcmVjdG9yeTogdGhpcy5uekRpcmVjdG9yeSxcclxuICAgICAgb3BlbkZpbGVEaWFsb2dPbkNsaWNrOiB0aGlzLm56T3BlbkZpbGVEaWFsb2dPbkNsaWNrLFxyXG4gICAgICBiZWZvcmVVcGxvYWQ6IHRoaXMubnpCZWZvcmVVcGxvYWQsXHJcbiAgICAgIGN1c3RvbVJlcXVlc3Q6IHRoaXMubnpDdXN0b21SZXF1ZXN0LFxyXG4gICAgICBkYXRhOiB0aGlzLm56RGF0YSxcclxuICAgICAgaGVhZGVyczogdGhpcy5uekhlYWRlcnMsXHJcbiAgICAgIG5hbWU6IHRoaXMubnpOYW1lLFxyXG4gICAgICBtdWx0aXBsZTogdGhpcy5uek11bHRpcGxlLFxyXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMubnpXaXRoQ3JlZGVudGlhbHMsXHJcbiAgICAgIGZpbHRlcnMsXHJcbiAgICAgIHRyYW5zZm9ybUZpbGU6IHRoaXMubnpUcmFuc2Zvcm1GaWxlLFxyXG4gICAgICBvblN0YXJ0OiB0aGlzLm9uU3RhcnQsXHJcbiAgICAgIG9uUHJvZ3Jlc3M6IHRoaXMub25Qcm9ncmVzcyxcclxuICAgICAgb25TdWNjZXNzOiB0aGlzLm9uU3VjY2VzcyxcclxuICAgICAgb25FcnJvcjogdGhpcy5vbkVycm9yXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBsb2NhbGVTZXJ2aWNlOiBMb2NhbGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsICkge1xyXG4gICAgdGhpcy5sb2NhbGUgPSB0aGlzLmxvY2FsZVNlcnZpY2UuZ2V0RGF0YSgnenUnKVxyXG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzTGlzdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gI3JlZ2lvbiB1cGxvYWRcclxuXHJcbiAgcHJpdmF0ZSBmaWxlVG9PYmplY3QoZmlsZTogTnpVcGxvYWRGaWxlKTogTnpVcGxvYWRGaWxlIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxhc3RNb2RpZmllZDogZmlsZS5sYXN0TW9kaWZpZWQsXHJcbiAgICAgIGxhc3RNb2RpZmllZERhdGU6IGZpbGUubGFzdE1vZGlmaWVkRGF0ZSxcclxuICAgICAgbmFtZTogZmlsZS5maWxlbmFtZSB8fCBmaWxlLm5hbWUsXHJcbiAgICAgIHNpemU6IGZpbGUuc2l6ZSxcclxuICAgICAgdHlwZTogZmlsZS50eXBlLFxyXG4gICAgICB1aWQ6IGZpbGUudWlkLFxyXG4gICAgICByZXNwb25zZTogZmlsZS5yZXNwb25zZSxcclxuICAgICAgZXJyb3I6IGZpbGUuZXJyb3IsXHJcbiAgICAgIHBlcmNlbnQ6IDAsXHJcbiAgICAgIG9yaWdpbkZpbGVPYmo6IGZpbGUgYXMgTnpTYWZlQW55XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRGaWxlSXRlbShmaWxlOiBOelVwbG9hZEZpbGUsIGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSk6IE56VXBsb2FkRmlsZSB7XHJcbiAgICByZXR1cm4gZmlsZUxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS51aWQgPT09IGZpbGUudWlkKVswXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlRmlsZUl0ZW0oZmlsZTogTnpVcGxvYWRGaWxlLCBmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pOiBOelVwbG9hZEZpbGVbXSB7XHJcbiAgICByZXR1cm4gZmlsZUxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS51aWQgIT09IGZpbGUudWlkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TdGFydCA9IChmaWxlOiBOelVwbG9hZEZpbGUpOiB2b2lkID0+IHtcclxuXHJcbiAgICBpZiAoIXRoaXMubnpGaWxlTGlzdCkge1xyXG4gICAgICB0aGlzLm56RmlsZUxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXJnZXRJdGVtID0gdGhpcy5maWxlVG9PYmplY3QoZmlsZSk7XHJcbiAgICB0YXJnZXRJdGVtLnN0YXR1cyA9ICd1cGxvYWRpbmcnO1xyXG4gICAgdGhpcy5uekZpbGVMaXN0ID0gdGhpcy5uekZpbGVMaXN0LmNvbmNhdCh0YXJnZXRJdGVtKTtcclxuICAgIHRoaXMubnpGaWxlTGlzdENoYW5nZS5lbWl0KHRoaXMubnpGaWxlTGlzdCk7XHJcbiAgICB0aGlzLm56Q2hhbmdlLmVtaXQoeyBmaWxlOiB0YXJnZXRJdGVtLCBmaWxlTGlzdDogdGhpcy5uekZpbGVMaXN0LCB0eXBlOiAnc3RhcnQnIH0pO1xyXG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzTGlzdCgpO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgb25Qcm9ncmVzcyA9IChlOiB7IHBlcmNlbnQ6IG51bWJlciB9LCBmaWxlOiBOelVwbG9hZEZpbGUpOiB2b2lkID0+IHtcclxuXHJcbiAgICBjb25zdCBmaWxlTGlzdCA9IHRoaXMubnpGaWxlTGlzdDtcclxuICAgIGNvbnN0IHRhcmdldEl0ZW0gPSB0aGlzLmdldEZpbGVJdGVtKGZpbGUsIGZpbGVMaXN0KTtcclxuICAgIHRhcmdldEl0ZW0ucGVyY2VudCA9IGUucGVyY2VudDtcclxuICAgIHRoaXMubnpDaGFuZ2UuZW1pdCh7XHJcbiAgICAgIGV2ZW50OiBlLFxyXG4gICAgICBmaWxlOiB7IC4uLnRhcmdldEl0ZW0gfSxcclxuICAgICAgZmlsZUxpc3Q6IHRoaXMubnpGaWxlTGlzdCxcclxuICAgICAgdHlwZTogJ3Byb2dyZXNzJ1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmRldGVjdENoYW5nZXNMaXN0KCk7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBvblN1Y2Nlc3MgPSAocmVzOiB7fSwgZmlsZTogTnpVcGxvYWRGaWxlKTogdm9pZCA9PiB7XHJcblxyXG4gICAgY29uc3QgZmlsZUxpc3QgPSB0aGlzLm56RmlsZUxpc3Q7XHJcbiAgICBjb25zdCB0YXJnZXRJdGVtID0gdGhpcy5nZXRGaWxlSXRlbShmaWxlLCBmaWxlTGlzdCk7XHJcbiAgICB0YXJnZXRJdGVtLnN0YXR1cyA9ICdkb25lJztcclxuICAgIHRhcmdldEl0ZW0ucmVzcG9uc2UgPSByZXM7XHJcbiAgICB0aGlzLm56Q2hhbmdlLmVtaXQoe1xyXG4gICAgICBmaWxlOiB7IC4uLnRhcmdldEl0ZW0gfSxcclxuICAgICAgZmlsZUxpc3QsXHJcbiAgICAgIHR5cGU6ICdzdWNjZXNzJ1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmRldGVjdENoYW5nZXNMaXN0KCk7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBvbkVycm9yID0gKGVycjoge30sIGZpbGU6IE56VXBsb2FkRmlsZSk6IHZvaWQgPT4ge1xyXG5cclxuICAgIGNvbnN0IGZpbGVMaXN0ID0gdGhpcy5uekZpbGVMaXN0O1xyXG4gICAgY29uc3QgdGFyZ2V0SXRlbSA9IHRoaXMuZ2V0RmlsZUl0ZW0oZmlsZSwgZmlsZUxpc3QpO1xyXG4gICAgdGFyZ2V0SXRlbS5lcnJvciA9IGVycjtcclxuICAgIHRhcmdldEl0ZW0uc3RhdHVzID0gdGhpcy5uekFjdGlvbiA/ICdlcnJvcicgOiAnZG9uZSc7XHJcbiAgICB0aGlzLm56Q2hhbmdlLmVtaXQoe1xyXG4gICAgICBmaWxlOiB7IC4uLnRhcmdldEl0ZW0gfSxcclxuICAgICAgZmlsZUxpc3QsXHJcbiAgICAgIHR5cGU6IHRoaXMubnpBY3Rpb24gPyAnZXJyb3InIDogJ3N1Y2Nlc3MnXHJcbiAgICB9KTtcclxuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc0xpc3QoKTtcclxuICB9O1xyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gZHJhZ1xyXG5cclxuICBwcml2YXRlIGRyYWdTdGF0ZT86IHN0cmluZztcclxuXHJcbiAgLy8gc2tpcCBzYWZhcmkgYnVnXHJcbiAgZmlsZURyb3AoZTogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZS50eXBlID09PSB0aGlzLmRyYWdTdGF0ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmRyYWdTdGF0ZSA9IGUudHlwZTtcclxuICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcclxuICB9XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBsaXN0XHJcblxyXG4gIHByaXZhdGUgZGV0ZWN0Q2hhbmdlc0xpc3QoKTogdm9pZCB7XHJcbiAgICAvLyB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAvLyB0aGlzLmxpc3RDb21wLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIG9uUmVtb3ZlID0gKGZpbGU6IE56VXBsb2FkRmlsZSk6IHZvaWQgPT4ge1xyXG5cclxuICAgIHRoaXMudXBsb2FkQ29tcC5hYm9ydChmaWxlKTtcclxuICAgIGZpbGUuc3RhdHVzID0gJ3JlbW92ZWQnO1xyXG4gICAgY29uc3QgZm5SZXMgPSB0eXBlb2YgdGhpcy5uelJlbW92ZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMubnpSZW1vdmUoZmlsZSkgOiB0aGlzLm56UmVtb3ZlID09IG51bGwgPyB0cnVlIDogdGhpcy5uelJlbW92ZTtcclxuICAgIChmblJlcyBpbnN0YW5jZW9mIE9ic2VydmFibGUgPyBmblJlcyA6IG9mKGZuUmVzKSkucGlwZShmaWx0ZXIoKHJlczogYm9vbGVhbikgPT4gcmVzKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5uekZpbGVMaXN0ID0gdGhpcy5yZW1vdmVGaWxlSXRlbShmaWxlLCB0aGlzLm56RmlsZUxpc3QpO1xyXG4gICAgICB0aGlzLm56Q2hhbmdlLmVtaXQoe1xyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgZmlsZUxpc3Q6IHRoaXMubnpGaWxlTGlzdCxcclxuICAgICAgICB0eXBlOiAncmVtb3ZlZCdcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubnpGaWxlTGlzdENoYW5nZS5lbWl0KHRoaXMubnpGaWxlTGlzdCk7XHJcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBzdHlsZXNcclxuXHJcbiAgcHJpdmF0ZSBwcmVmaXhDbHMgPSAnYW50LXVwbG9hZCc7XHJcbiAgY2xhc3NMaXN0OiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIHNldENsYXNzTWFwKCk6IHZvaWQge1xyXG5cclxuICAgIGxldCBzdWJDbHM6IHN0cmluZ1tdID0gW107XHJcbiAgICBpZiAodGhpcy5uelR5cGUgPT09ICdkcmFnJykge1xyXG4gICAgICBpZiAodGhpcy5uekZpbGVMaXN0LnNvbWUoZmlsZSA9PiBmaWxlLnN0YXR1cyA9PT0gJ3VwbG9hZGluZycpKSB7XHJcbiAgICAgICAgc3ViQ2xzLnB1c2goYCR7dGhpcy5wcmVmaXhDbHN9LWRyYWctdXBsb2FkaW5nYCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZHJhZ1N0YXRlID09PSAnZHJhZ292ZXInKSB7XHJcbiAgICAgICAgc3ViQ2xzLnB1c2goYCR7dGhpcy5wcmVmaXhDbHN9LWRyYWctaG92ZXJgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3ViQ2xzID0gW2Ake3RoaXMucHJlZml4Q2xzfS1zZWxlY3QtJHt0aGlzLm56TGlzdFR5cGV9YF07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jbGFzc0xpc3QgPSBbXHJcbiAgICAgIHRoaXMucHJlZml4Q2xzLFxyXG4gICAgICBgJHt0aGlzLnByZWZpeENsc30tJHt0aGlzLm56VHlwZX1gLFxyXG4gICAgICAuLi5zdWJDbHMsXHJcbiAgICAgICh0aGlzLm56RGlzYWJsZWQgJiYgYCR7dGhpcy5wcmVmaXhDbHN9LWRpc2FibGVkYCkgfHwgJydcclxuICAgIF0uZmlsdGVyKGl0ZW0gPT4gISFpdGVtKTtcclxuXHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy56aXBPcHRpb25zKCkuc2V0Q2xhc3NNYXAoKTtcclxuICB9XHJcblxyXG5cclxuICBsaXN0Q2hhbmdlKGUpIHtcclxuICAgIHRoaXMubnpGaWxlTGlzdCA9IGU7XHJcbiAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgdGhpcy5uekNoYW5nZS5lbWl0KHsgZmlsZTogZS5sZW5ndGg+MD9lW2UubGVuZ3RoLTFdOnt9LCBmaWxlTGlzdDogZSwgdHlwZTogJ3NvcnQnIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==