/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __param } from "tslib";
import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
const isImageFileType = (type) => !!type && type.indexOf('image/') === 0;
const ɵ0 = isImageFileType;
const MEASURE_SIZE = 200;
let UploadListComponent = class UploadListComponent {
    // #endregion
    constructor(cdr, doc, ngZone, platform) {
        this.cdr = cdr;
        this.doc = doc;
        this.ngZone = ngZone;
        this.platform = platform;
        this.list = [];
        this.locale = {};
        this.nzSort = false;
        this.iconRender = null;
        this.listChange = new EventEmitter();
    }
    get showPic() {
        return this.listType === 'picture' || this.listType === 'picture-card';
    }
    set items(list) {
        this.list = list;
    }
    genErr(file) {
        if (file.response && typeof file.response === 'string') {
            return file.response;
        }
        return (file.error && file.error.statusText) || (this.locale ? (this.nzAction ? this.locale.uploadError : this.locale.uploadStorage) : 'loading...');
    }
    extname(url) {
        const temp = url.split('/');
        const filename = temp[temp.length - 1];
        const filenameWithoutSuffix = filename.split(/#|\?/)[0];
        return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
    }
    isImageUrl(file) {
        if (isImageFileType(file.type)) {
            return true;
        }
        const url = (file.thumbUrl || file.url || '');
        if (!url) {
            return false;
        }
        const extension = this.extname(url);
        if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg)$/i.test(extension)) {
            return true;
        }
        else if (/^data:/.test(url)) {
            // other file types of base64
            return false;
        }
        else if (extension) {
            // other file types which have extension
            return false;
        }
        return true;
    }
    getIconType(file) {
        if (!this.showPic) {
            return '';
        }
        if (file.isUploading || (!file.thumbUrl && !file.url)) {
            return 'uploading';
        }
        else {
            return 'thumbnail';
        }
    }
    previewImage(file) {
        return new Promise(resolve => {
            if (!isImageFileType(file.type)) {
                resolve('');
                return;
            }
            this.ngZone.runOutsideAngular(() => {
                const canvas = this.doc.createElement('canvas');
                canvas.width = MEASURE_SIZE;
                canvas.height = MEASURE_SIZE;
                canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
                this.doc.body.appendChild(canvas);
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = () => {
                    const { width, height } = img;
                    let drawWidth = MEASURE_SIZE;
                    let drawHeight = MEASURE_SIZE;
                    let offsetX = 0;
                    let offsetY = 0;
                    if (width < height) {
                        drawHeight = height * (MEASURE_SIZE / width);
                        offsetY = -(drawHeight - drawWidth) / 2;
                    }
                    else {
                        drawWidth = width * (MEASURE_SIZE / height);
                        offsetX = -(drawWidth - drawHeight) / 2;
                    }
                    try {
                        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                    }
                    catch (_a) { }
                    const dataURL = canvas.toDataURL();
                    this.doc.body.removeChild(canvas);
                    resolve(dataURL);
                };
                img.src = window.URL.createObjectURL(file);
            });
        });
    }
    genThumb() {
        if (!this.platform.isBrowser) {
            return;
        }
        const win = window;
        if (!this.showPic || typeof document === 'undefined' || typeof win === 'undefined' || !win.FileReader || !win.File) {
            return;
        }
        this.list
            .filter(file => file.originFileObj instanceof File && file.thumbUrl === undefined)
            .forEach(file => {
            file.thumbUrl = '';
            (this.previewFile ? this.previewFile(file).toPromise() : this.previewImage(file.originFileObj)).then(dataUrl => {
                file.thumbUrl = dataUrl;
                this.detectChanges();
            });
        });
    }
    listItemNameCls(file) {
        const count = [this.showDownload(file), this.icons.showRemoveIcon].filter(x => x).length;
        return {
            [`ant-upload-list-item-name`]: true,
            [`ant-upload-list-item-name-icon-count-${count}`]: true
        };
    }
    showDownload(file) {
        return !!(this.icons.showDownloadIcon && file.status === 'done');
    }
    fixData() {
        this.list.forEach(file => {
            file.isUploading = file.status === 'uploading';
            file.message = this.genErr(file);
            file.linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
            file.isImageUrl = this.isImageUrl(file);
            file.iconType = this.getIconType(file);
            file.listItemNameCls = this.listItemNameCls(file);
            file.showDownload = this.showDownload(file);
        });
    }
    handlePreview(file, e) {
        if (!this.onPreview) {
            return;
        }
        e.preventDefault();
        return this.onPreview(file);
    }
    handleRemove(file, e) {
        e.preventDefault();
        if (this.onRemove) {
            this.onRemove(file);
        }
        return;
    }
    handleDownload(file) {
        if (typeof this.onDownload === 'function') {
            this.onDownload(file);
        }
        else if (file.url) {
            window.open(file.url);
        }
    }
    detectChanges() {
        this.fixData();
        this.cdr.detectChanges();
    }
    ngOnChanges() {
        this.fixData();
        this.genThumb();
    }
    sortChange(e) {
        this.list = e;
        this.listChange.emit(e);
    }
};
__decorate([
    Input()
], UploadListComponent.prototype, "locale", void 0);
__decorate([
    Input()
], UploadListComponent.prototype, "nzSort", void 0);
__decorate([
    Input()
], UploadListComponent.prototype, "listType", void 0);
__decorate([
    Input()
], UploadListComponent.prototype, "nzAction", void 0);
__decorate([
    Input()
], UploadListComponent.prototype, "items", null);
__decorate([
    Input()
], UploadListComponent.prototype, "icons", void 0);
__decorate([
    Input()
], UploadListComponent.prototype, "onPreview", void 0);
__decorate([
    Input()
], UploadListComponent.prototype, "onRemove", void 0);
__decorate([
    Input()
], UploadListComponent.prototype, "onDownload", void 0);
__decorate([
    Input()
], UploadListComponent.prototype, "previewFile", void 0);
__decorate([
    Input()
], UploadListComponent.prototype, "iconRender", void 0);
__decorate([
    Output()
], UploadListComponent.prototype, "listChange", void 0);
UploadListComponent = __decorate([
    Component({
        selector: 'nz-upload-list',
        exportAs: 'nzUploadList',
        template: "<!-- <div *ngFor=\"let item of list\">{{item.name}}</div> -->\r\n<az-droppable *ngIf=\"list\" [data]=\"list\" [disabled]=\"!nzSort\" [renderItem]=\"renderItems\" (zdSortChange)=\"sortChange($event)\"></az-droppable>\r\n<ng-template #renderItems let-file>\r\n  <div class=\"ant-upload-list-item ant-upload-list-item-{{\r\n    file.status\r\n  }} ant-upload-list-item-list-type-{{ listType }}\">\r\n  <ng-template #icon>\r\n    <ng-container [ngSwitch]=\"file.iconType\">\r\n      <div *ngSwitchCase=\"'uploading'\" class=\"ant-upload-list-item-thumbnail\"\r\n        [class.ant-upload-list-item-file]=\"!file.isUploading\">\r\n        <ng-template [ngTemplateOutlet]=\"iconNode\" [ngTemplateOutletContext]=\"{ $implicit: file }\"></ng-template>\r\n      </div>\r\n      <a *ngSwitchCase=\"'thumbnail'\" class=\"ant-upload-list-item-thumbnail\"\r\n        [class.ant-upload-list-item-file]=\"!file.isImageUrl\" target=\"_blank\" rel=\"noopener noreferrer\"\r\n        [href]=\"file.url || file.thumbUrl\" (click)=\"handlePreview(file, $event)\">\r\n        <img *ngIf=\"file.isImageUrl; else noImageThumbTpl\" class=\"ant-upload-list-item-image\"\r\n          [src]=\"file.thumbUrl || file.url\" [attr.alt]=\"file.name\" />\r\n      </a>\r\n      <span *ngSwitchDefault class=\"ant-upload-text-icon\">\r\n        <ng-template [ngTemplateOutlet]=\"iconNode\" [ngTemplateOutletContext]=\"{ $implicit: file }\"></ng-template>\r\n      </span>\r\n    </ng-container>\r\n    <ng-template #noImageThumbTpl>\r\n      <ng-template [ngTemplateOutlet]=\"iconNode\" [ngTemplateOutletContext]=\"{ $implicit: file }\"></ng-template>\r\n    </ng-template>\r\n  </ng-template>\r\n  <ng-template #iconNode let-file>\r\n    <ng-container *ngIf=\"!iconRender; else iconRender\">\r\n      <ng-container [ngSwitch]=\"listType\">\r\n        <ng-container *ngSwitchCase=\"'picture'\">\r\n          <ng-container *ngIf=\"file.isUploading; else iconNodeFileIcon\">\r\n            <i nz-icon nzType=\"loading\"></i>\r\n          </ng-container>\r\n        </ng-container>\r\n        <ng-container *ngSwitchCase=\"'picture-card'\">\r\n          <ng-container *ngIf=\"file.isUploading; else iconNodeFileIcon\">{{\r\n            locale.uploading\r\n          }}</ng-container>\r\n        </ng-container>\r\n        <i *ngSwitchDefault nz-icon [nzType]=\"file.isUploading ? 'loading' : 'paper-clip'\"></i>\r\n      </ng-container>\r\n    </ng-container>\r\n    <ng-template #iconNodeFileIcon>\r\n      <i nz-icon [nzType]=\"file.isImageUrl ? 'picture' : 'file'\" nzTheme=\"twotone\"></i>\r\n    </ng-template>\r\n  </ng-template>\r\n  <ng-template #downloadOrDelete>\r\n    <span *ngIf=\"listType !== 'picture-card'\"\r\n      class=\"ant-upload-list-item-card-actions {{ listType === 'picture' ? 'picture' : '' }}\">\r\n      <a *ngIf=\"file.showDownload\" title=\"{{ locale.downloadFile }}\">\r\n        <ng-template [ngTemplateOutlet]=\"downloadIcon\"></ng-template>\r\n      </a>\r\n      <a *ngIf=\"icons.showRemoveIcon\" title=\"{{ locale.removeFile }}\">\r\n        <ng-template [ngTemplateOutlet]=\"removeIcon\"></ng-template>\r\n      </a>\r\n    </span>\r\n  </ng-template>\r\n  <ng-template #preview>\r\n    <a *ngIf=\"file.url\" target=\"_blank\" rel=\"noopener noreferrer\" [ngClass]=\"file.listItemNameCls!\"\r\n      [attr.title]=\"file.name\" [href]=\"file.url\" [attr.download]=\"file.linkProps && file.linkProps.download\"\r\n      (click)=\"handlePreview(file, $event)\">{{ file.name }}</a>\r\n    <span *ngIf=\"!file.url\" [ngClass]=\"file.listItemNameCls!\" [attr.title]=\"file.name\"\r\n      (click)=\"handlePreview(file, $event)\">{{ file.name }}</span>\r\n    <ng-template [ngTemplateOutlet]=\"downloadOrDelete\"></ng-template>\r\n  </ng-template>\r\n  <ng-template #removeIcon>\r\n    <i *ngIf=\"icons.showRemoveIcon\" (click)=\"handleRemove(file, $event)\" nz-icon nzType=\"delete\"\r\n      title=\"{{ locale.removeFile }}\"></i>\r\n  </ng-template>\r\n  <ng-template #downloadIcon>\r\n    <i *ngIf=\"file.showDownload\" (click)=\"handleDownload(file)\" nz-icon nzType=\"download\"\r\n      title=\"{{ locale.downloadFile }}\"></i>\r\n  </ng-template>\r\n  <div class=\"ant-upload-list-item-info\">\r\n    <span>\r\n      <ng-template [ngTemplateOutlet]=\"icon\"></ng-template>\r\n      <ng-template [ngTemplateOutlet]=\"preview\"></ng-template>\r\n    </span>\r\n  </div>\r\n  <span *ngIf=\"listType === 'picture-card' && !file.isUploading\" class=\"ant-upload-list-item-actions\">\r\n    <a *ngIf=\"icons.showPreviewIcon\" [href]=\"file.url || file.thumbUrl\" target=\"_blank\" rel=\"noopener noreferrer\"\r\n      title=\"{{ locale.previewFile }}\"\r\n      [ngStyle]=\"!(file.url || file.thumbUrl) ? { opacity: 0.5, 'pointer-events': 'none' } : null\"\r\n      (click)=\"handlePreview(file, $event)\">\r\n      <i nz-icon nzType=\"eye\"></i>\r\n    </a>\r\n    <ng-template [ngTemplateOutlet]=\"downloadIcon\"></ng-template>\r\n    <ng-template [ngTemplateOutlet]=\"removeIcon\"></ng-template>\r\n  </span>\r\n  <div *ngIf=\"file.isUploading\" class=\"ant-upload-list-item-progress\">\r\n    <nz-progress [nzPercent]=\"file.percent!\" nzType=\"line\" [nzShowInfo]=\"false\" [nzStrokeWidth]=\"2\"></nz-progress>\r\n  </div>\r\n</div>\r\n</ng-template>\r\n",
        animations: [
            trigger('itemState', [
                transition(':enter', [style({ height: '0', width: '0', opacity: 0 }), animate(150, style({ height: '*', width: '*', opacity: 1 }))]),
                transition(':leave', [animate(150, style({ height: '0', width: '0', opacity: 0 }))])
            ])
        ],
        host: {
            '[class.ant-upload-list]': `true`,
            '[class.ant-upload-list-text]': `listType === 'text'`,
            '[class.ant-upload-list-picture]': `listType === 'picture'`,
            '[class.ant-upload-list-picture-card]': `listType === 'picture-card'`
        },
        preserveWhitespaces: false,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __param(1, Inject(DOCUMENT))
], UploadListComponent);
export { UploadListComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctem9lcy9saWIvY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFMUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULE1BQU0sRUFDTixLQUFLLEVBSUwsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFNdkIsTUFBTSxlQUFlLEdBQUcsQ0FBQyxJQUFZLEVBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTFGLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztBQWdDekIsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUF3TDlCLGFBQWE7SUFFYixZQUNVLEdBQXNCLEVBQ0osR0FBYyxFQUNoQyxNQUFjLEVBQ2QsUUFBa0I7UUFIbEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDSixRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBN0w1QixTQUFJLEdBQXFCLEVBQUUsQ0FBQztRQU1uQixXQUFNLEdBQWMsRUFBRSxDQUFDO1FBQ3ZCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFheEIsZUFBVSxHQUFrQyxJQUFJLENBQUM7UUFFeEMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7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RSxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwSSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3JGLENBQUM7U0FDSDtRQUNELElBQUksRUFBRTtZQUNKLHlCQUF5QixFQUFFLE1BQU07WUFDakMsOEJBQThCLEVBQUUscUJBQXFCO1lBQ3JELGlDQUFpQyxFQUFFLHdCQUF3QjtZQUMzRCxzQ0FBc0MsRUFBRSw2QkFBNkI7U0FDdEU7UUFDRCxtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7SUE2TEcsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7R0E1TFIsbUJBQW1CLENBK00vQjtTQS9NWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgYW5pbWF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdDbGFzc1R5cGUsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE56U2hvd1VwbG9hZExpc3QsIE56VXBsb2FkRmlsZSwgTnpVcGxvYWRMaXN0VHlwZSB9IGZyb20gJy4vaW50ZXJmYWNlJztcclxuXHJcbmNvbnN0IGlzSW1hZ2VGaWxlVHlwZSA9ICh0eXBlOiBzdHJpbmcpOiBib29sZWFuID0+ICEhdHlwZSAmJiB0eXBlLmluZGV4T2YoJ2ltYWdlLycpID09PSAwO1xyXG5cclxuY29uc3QgTUVBU1VSRV9TSVpFID0gMjAwO1xyXG5cclxudHlwZSBVcGxvYWRMaXN0SWNvblR5cGUgPSAnJyB8ICd1cGxvYWRpbmcnIHwgJ3RodW1ibmFpbCc7XHJcblxyXG5pbnRlcmZhY2UgVXBsb2FkTGlzdEZpbGUgZXh0ZW5kcyBOelVwbG9hZEZpbGUge1xyXG4gIGlzSW1hZ2VVcmw/OiBib29sZWFuO1xyXG4gIGlzVXBsb2FkaW5nPzogYm9vbGVhbjtcclxuICBpY29uVHlwZT86IFVwbG9hZExpc3RJY29uVHlwZTtcclxuICBsaXN0SXRlbU5hbWVDbHM/OiBOZ0NsYXNzVHlwZTtcclxuICBzaG93RG93bmxvYWQ/OiBib29sZWFuO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ256LXVwbG9hZC1saXN0JyxcclxuICBleHBvcnRBczogJ256VXBsb2FkTGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3VwbG9hZC1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdpdGVtU3RhdGUnLCBbXHJcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtzdHlsZSh7IGhlaWdodDogJzAnLCB3aWR0aDogJzAnLCBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKDE1MCwgc3R5bGUoeyBoZWlnaHQ6ICcqJywgd2lkdGg6ICcqJywgb3BhY2l0eTogMSB9KSldKSxcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW2FuaW1hdGUoMTUwLCBzdHlsZSh7IGhlaWdodDogJzAnLCB3aWR0aDogJzAnLCBvcGFjaXR5OiAwIH0pKV0pXHJcbiAgICBdKVxyXG4gIF0sXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzcy5hbnQtdXBsb2FkLWxpc3RdJzogYHRydWVgLFxyXG4gICAgJ1tjbGFzcy5hbnQtdXBsb2FkLWxpc3QtdGV4dF0nOiBgbGlzdFR5cGUgPT09ICd0ZXh0J2AsXHJcbiAgICAnW2NsYXNzLmFudC11cGxvYWQtbGlzdC1waWN0dXJlXSc6IGBsaXN0VHlwZSA9PT0gJ3BpY3R1cmUnYCxcclxuICAgICdbY2xhc3MuYW50LXVwbG9hZC1saXN0LXBpY3R1cmUtY2FyZF0nOiBgbGlzdFR5cGUgPT09ICdwaWN0dXJlLWNhcmQnYFxyXG4gIH0sXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXBsb2FkTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgbGlzdDogVXBsb2FkTGlzdEZpbGVbXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIGdldCBzaG93UGljKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdFR5cGUgPT09ICdwaWN0dXJlJyB8fCB0aGlzLmxpc3RUeXBlID09PSAncGljdHVyZS1jYXJkJztcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIGxvY2FsZTogTnpTYWZlQW55ID0ge307XHJcbiAgQElucHV0KCkgbnpTb3J0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbGlzdFR5cGUhOiBOelVwbG9hZExpc3RUeXBlO1xyXG4gIEBJbnB1dCgpIG56QWN0aW9uPzogc3RyaW5nIHwgKChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHN0cmluZyB8IE9ic2VydmFibGU8c3RyaW5nPik7XHJcbiAgQElucHV0KClcclxuICBzZXQgaXRlbXMobGlzdDogTnpVcGxvYWRGaWxlW10pIHtcclxuICAgIHRoaXMubGlzdCA9IGxpc3Q7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBpY29ucyE6IE56U2hvd1VwbG9hZExpc3Q7XHJcbiAgQElucHV0KCkgb25QcmV2aWV3PzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gdm9pZDtcclxuICBASW5wdXQoKSBvblJlbW92ZSE6IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHZvaWQ7XHJcbiAgQElucHV0KCkgb25Eb3dubG9hZD86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHZvaWQ7XHJcbiAgQElucHV0KCkgcHJldmlld0ZpbGU/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBPYnNlcnZhYmxlPHN0cmluZz47XHJcbiAgQElucHV0KCkgaWNvblJlbmRlcjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBAT3V0cHV0KCkgcHJpdmF0ZSBsaXN0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIHByaXZhdGUgZ2VuRXJyKGZpbGU6IE56VXBsb2FkRmlsZSk6IHN0cmluZyB7XHJcbiAgICBpZiAoZmlsZS5yZXNwb25zZSAmJiB0eXBlb2YgZmlsZS5yZXNwb25zZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIGZpbGUucmVzcG9uc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKGZpbGUuZXJyb3IgJiYgZmlsZS5lcnJvci5zdGF0dXNUZXh0KSB8fCAodGhpcy5sb2NhbGU/KHRoaXMubnpBY3Rpb24/dGhpcy5sb2NhbGUudXBsb2FkRXJyb3I6dGhpcy5sb2NhbGUudXBsb2FkU3RvcmFnZSk6J2xvYWRpbmcuLi4nKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0bmFtZSh1cmw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCB0ZW1wID0gdXJsLnNwbGl0KCcvJyk7XHJcbiAgICBjb25zdCBmaWxlbmFtZSA9IHRlbXBbdGVtcC5sZW5ndGggLSAxXTtcclxuICAgIGNvbnN0IGZpbGVuYW1lV2l0aG91dFN1ZmZpeCA9IGZpbGVuYW1lLnNwbGl0KC8jfFxcPy8pWzBdO1xyXG4gICAgcmV0dXJuICgvXFwuW14uL1xcXFxdKiQvLmV4ZWMoZmlsZW5hbWVXaXRob3V0U3VmZml4KSB8fCBbJyddKVswXTtcclxuICB9XHJcblxyXG4gIGlzSW1hZ2VVcmwoZmlsZTogTnpVcGxvYWRGaWxlKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoaXNJbWFnZUZpbGVUeXBlKGZpbGUudHlwZSEpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSAoZmlsZS50aHVtYlVybCB8fCBmaWxlLnVybCB8fCAnJykgYXMgc3RyaW5nO1xyXG4gICAgaWYgKCF1cmwpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5leHRuYW1lKHVybCk7XHJcbiAgICBpZiAoL15kYXRhOmltYWdlXFwvLy50ZXN0KHVybCkgfHwgLyh3ZWJwfHN2Z3xwbmd8Z2lmfGpwZ3xqcGVnfGpmaWZ8Ym1wfGRwZykkL2kudGVzdChleHRlbnNpb24pKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIGlmICgvXmRhdGE6Ly50ZXN0KHVybCkpIHtcclxuICAgICAgLy8gb3RoZXIgZmlsZSB0eXBlcyBvZiBiYXNlNjRcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChleHRlbnNpb24pIHtcclxuICAgICAgLy8gb3RoZXIgZmlsZSB0eXBlcyB3aGljaCBoYXZlIGV4dGVuc2lvblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0SWNvblR5cGUoZmlsZTogVXBsb2FkTGlzdEZpbGUpOiBVcGxvYWRMaXN0SWNvblR5cGUge1xyXG4gICAgaWYgKCF0aGlzLnNob3dQaWMpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGUuaXNVcGxvYWRpbmcgfHwgKCFmaWxlLnRodW1iVXJsICYmICFmaWxlLnVybCkpIHtcclxuICAgICAgcmV0dXJuICd1cGxvYWRpbmcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICd0aHVtYm5haWwnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwcmV2aWV3SW1hZ2UoZmlsZTogRmlsZSB8IEJsb2IpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICBpZiAoIWlzSW1hZ2VGaWxlVHlwZShmaWxlLnR5cGUpKSB7XHJcbiAgICAgICAgcmVzb2x2ZSgnJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICBjYW52YXMud2lkdGggPSBNRUFTVVJFX1NJWkU7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IE1FQVNVUkVfU0laRTtcclxuICAgICAgICBjYW52YXMuc3R5bGUuY3NzVGV4dCA9IGBwb3NpdGlvbjogZml4ZWQ7IGxlZnQ6IDA7IHRvcDogMDsgd2lkdGg6ICR7TUVBU1VSRV9TSVpFfXB4OyBoZWlnaHQ6ICR7TUVBU1VSRV9TSVpFfXB4OyB6LWluZGV4OiA5OTk5OyBkaXNwbGF5OiBub25lO2A7XHJcbiAgICAgICAgdGhpcy5kb2MuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGltZztcclxuXHJcbiAgICAgICAgICBsZXQgZHJhd1dpZHRoID0gTUVBU1VSRV9TSVpFO1xyXG4gICAgICAgICAgbGV0IGRyYXdIZWlnaHQgPSBNRUFTVVJFX1NJWkU7XHJcbiAgICAgICAgICBsZXQgb2Zmc2V0WCA9IDA7XHJcbiAgICAgICAgICBsZXQgb2Zmc2V0WSA9IDA7XHJcblxyXG4gICAgICAgICAgaWYgKHdpZHRoIDwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGRyYXdIZWlnaHQgPSBoZWlnaHQgKiAoTUVBU1VSRV9TSVpFIC8gd2lkdGgpO1xyXG4gICAgICAgICAgICBvZmZzZXRZID0gLShkcmF3SGVpZ2h0IC0gZHJhd1dpZHRoKSAvIDI7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkcmF3V2lkdGggPSB3aWR0aCAqIChNRUFTVVJFX1NJWkUgLyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBvZmZzZXRYID0gLShkcmF3V2lkdGggLSBkcmF3SGVpZ2h0KSAvIDI7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY3R4IS5kcmF3SW1hZ2UoaW1nLCBvZmZzZXRYLCBvZmZzZXRZLCBkcmF3V2lkdGgsIGRyYXdIZWlnaHQpO1xyXG4gICAgICAgICAgfSBjYXRjaCB7fVxyXG4gICAgICAgICAgY29uc3QgZGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgICAgICAgIHRoaXMuZG9jLmJvZHkucmVtb3ZlQ2hpbGQoY2FudmFzKTtcclxuXHJcbiAgICAgICAgICByZXNvbHZlKGRhdGFVUkwpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW1nLnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZW5UaHVtYigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHdpbiA9IHdpbmRvdyBhcyBOelNhZmVBbnk7XHJcbiAgICBpZiAoIXRoaXMuc2hvd1BpYyB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW4gPT09ICd1bmRlZmluZWQnIHx8ICF3aW4uRmlsZVJlYWRlciB8fCAhd2luLkZpbGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLmxpc3RcclxuICAgICAgLmZpbHRlcihmaWxlID0+IGZpbGUub3JpZ2luRmlsZU9iaiBpbnN0YW5jZW9mIEZpbGUgJiYgZmlsZS50aHVtYlVybCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAuZm9yRWFjaChmaWxlID0+IHtcclxuICAgICAgICBmaWxlLnRodW1iVXJsID0gJyc7XHJcbiAgICAgICAgKHRoaXMucHJldmlld0ZpbGUgPyB0aGlzLnByZXZpZXdGaWxlKGZpbGUpLnRvUHJvbWlzZSgpIDogdGhpcy5wcmV2aWV3SW1hZ2UoZmlsZS5vcmlnaW5GaWxlT2JqISkpLnRoZW4oZGF0YVVybCA9PiB7XHJcbiAgICAgICAgICBmaWxlLnRodW1iVXJsID0gZGF0YVVybDtcclxuICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbGlzdEl0ZW1OYW1lQ2xzKGZpbGU6IE56VXBsb2FkRmlsZSk6IE5nQ2xhc3NUeXBlIHtcclxuICAgIGNvbnN0IGNvdW50ID0gW3RoaXMuc2hvd0Rvd25sb2FkKGZpbGUpLCB0aGlzLmljb25zLnNob3dSZW1vdmVJY29uXS5maWx0ZXIoeCA9PiB4KS5sZW5ndGg7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBbYGFudC11cGxvYWQtbGlzdC1pdGVtLW5hbWVgXTogdHJ1ZSxcclxuICAgICAgW2BhbnQtdXBsb2FkLWxpc3QtaXRlbS1uYW1lLWljb24tY291bnQtJHtjb3VudH1gXTogdHJ1ZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvd0Rvd25sb2FkKGZpbGU6IE56VXBsb2FkRmlsZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhKHRoaXMuaWNvbnMuc2hvd0Rvd25sb2FkSWNvbiAmJiBmaWxlLnN0YXR1cyA9PT0gJ2RvbmUnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZml4RGF0YSgpOiB2b2lkIHtcclxuICAgIHRoaXMubGlzdC5mb3JFYWNoKGZpbGUgPT4ge1xyXG4gICAgICBmaWxlLmlzVXBsb2FkaW5nID0gZmlsZS5zdGF0dXMgPT09ICd1cGxvYWRpbmcnO1xyXG4gICAgICBmaWxlLm1lc3NhZ2UgPSB0aGlzLmdlbkVycihmaWxlKTtcclxuICAgICAgZmlsZS5saW5rUHJvcHMgPSB0eXBlb2YgZmlsZS5saW5rUHJvcHMgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShmaWxlLmxpbmtQcm9wcykgOiBmaWxlLmxpbmtQcm9wcztcclxuICAgICAgZmlsZS5pc0ltYWdlVXJsID0gdGhpcy5pc0ltYWdlVXJsKGZpbGUpO1xyXG4gICAgICBmaWxlLmljb25UeXBlID0gdGhpcy5nZXRJY29uVHlwZShmaWxlKTtcclxuICAgICAgZmlsZS5saXN0SXRlbU5hbWVDbHMgPSB0aGlzLmxpc3RJdGVtTmFtZUNscyhmaWxlKTtcclxuICAgICAgZmlsZS5zaG93RG93bmxvYWQgPSB0aGlzLnNob3dEb3dubG9hZChmaWxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlUHJldmlldyhmaWxlOiBOelVwbG9hZEZpbGUsIGU6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMub25QcmV2aWV3KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICByZXR1cm4gdGhpcy5vblByZXZpZXcoZmlsZSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVSZW1vdmUoZmlsZTogTnpVcGxvYWRGaWxlLCBlOiBFdmVudCk6IHZvaWQge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKHRoaXMub25SZW1vdmUpIHtcclxuICAgICAgdGhpcy5vblJlbW92ZShmaWxlKTtcclxuICAgIH1cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGhhbmRsZURvd25sb2FkKGZpbGU6IE56VXBsb2FkRmlsZSk6IHZvaWQge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uRG93bmxvYWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5vbkRvd25sb2FkKGZpbGUpO1xyXG4gICAgfSBlbHNlIGlmIChmaWxlLnVybCkge1xyXG4gICAgICB3aW5kb3cub3BlbihmaWxlLnVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IE56U2FmZUFueSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybVxyXG4gICkge31cclxuXHJcbiAgZGV0ZWN0Q2hhbmdlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuZml4RGF0YSgpO1xyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmZpeERhdGEoKTtcclxuICAgIHRoaXMuZ2VuVGh1bWIoKTtcclxuICB9XHJcblxyXG4gIHNvcnRDaGFuZ2UoZTphbnkpe1xyXG4gICB0aGlzLmxpc3Q9IGVcclxuICAgdGhpcy5saXN0Q2hhbmdlLmVtaXQoZSlcclxuICB9XHJcbn1cclxuIl19