import { __decorate, __param, __awaiter } from 'tslib';
import { InjectionToken, Injectable, Inject, Optional, SkipSelf, NgModule, EventEmitter, Input, Output, ViewChild, Component, ɵɵdefineInjectable, ɵɵinject, INJECTOR, ViewContainerRef, ViewEncapsulation, ChangeDetectionStrategy, Pipe } from '@angular/core';
import { BehaviorSubject, Observable, of, from, Subscription } from 'rxjs';
import { en_US, zh_CN, zh_TW, NzI18nModule } from 'ng-zorro-antd/i18n';
import { filter, switchMap, map } from 'rxjs/operators';
import { toBoolean as toBoolean$1, InputNumber, InputBoolean } from 'ng-zorro-antd/core/util';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ComponentPortal } from '@angular/cdk/portal';
import '@angular/cdk/overlay-prebuilt.css';
import { Overlay, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT, registerLocaleData, CommonModule } from '@angular/common';
import { NzCardModule, NzIconModule, NzTabsModule, NzButtonModule, NzDividerModule, NzTableModule, NzSpinModule, NzCheckboxModule, NzRadioModule, NzProgressModule, NzEmptyModule, NzModalService as NzModalService$1 } from 'ng-zorro-antd';
import { ENTER } from '@angular/cdk/keycodes';
import { HttpRequest, HttpHeaders, HttpEventType, HttpResponse, HttpClientModule, HttpClient } from '@angular/common/http';
import { warn } from 'ng-zorro-antd/core/logger';
import { trigger, transition, style, animate } from '@angular/animations';
import _ from 'lodash';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'ngx-sortablejs';
import { AccountBookFill, AlertOutline, AlertFill } from '@ant-design/icons-angular/icons';
import ImageCompressor from 'image-compressor.js';

var zhCN = {
    abbr: 'zh-CN',
    zt: {
        emptyText: '暂无数据',
        clearText: '清空',
        total: '共 {{total}} 条',
    },
    zu: {
        uploading: '文件上传中',
        removeFile: '删除文件',
        uploadError: '上传错误',
        previewFile: '预览文件',
        downloadFile: '下载文件',
        uploadStorage: '暂存文件',
    },
    zf: {
        submit: '提交',
        cancel: '取消',
    }
};

const ZOE_LOCALE = new InjectionToken('zoe-locale');

const localeData = {
    "en-US": en_US,
    "zh-CN": zh_CN,
    "zh-TW": zh_TW,
};
let LocaleService = class LocaleService {
    constructor(i18n, locale) {
        this.i18n = i18n;
        this.change$ = new BehaviorSubject(this._locale);
        this.setLocale(locale || zhCN);
    }
    get change() {
        return this.change$.asObservable();
    }
    setLocale(locale) {
        // console.log(locale)
        if (this._locale && this._locale.abbr === locale.abbr) {
            return;
        }
        this._locale = locale;
        for (const [key, value] of Object.entries(localeData)) {
            if (locale.abbr == key) {
                console.log(value);
                this.i18n.setLocale(value);
                // this.i18n.setLocale(value);
            }
        }
        this.change$.next(locale);
    }
    get locale() {
        return this._locale;
    }
    getData(path) {
        return (this._locale[path] || {});
    }
};
LocaleService = __decorate([
    Injectable(),
    __param(1, Inject(ZOE_LOCALE))
], LocaleService);
function LOCALE_SERVICE_PROVIDER_FACTORY(exist, locale) {
    return exist || new LocaleService(null, locale);
}
const LOCALE_SERVICE_PROVIDER = {
    provide: LocaleService,
    useFactory: LOCALE_SERVICE_PROVIDER_FACTORY,
    deps: [[new Optional(), new SkipSelf(), LocaleService], ZOE_LOCALE],
};

const ɵ0 = zhCN;
let LocaleModule = class LocaleModule {
};
LocaleModule = __decorate([
    NgModule({
        providers: [{ provide: ZOE_LOCALE, useValue: ɵ0 }, LOCALE_SERVICE_PROVIDER],
    })
], LocaleModule);

let TableComponent = class TableComponent {
    constructor(cdr, servie, locale) {
        this.cdr = cdr;
        this.servie = servie;
        this.locale = locale;
        this.columns = [];
        this.ps = 10; //每页展示多少数据，可双向绑定
        this.pi = 1; //当前页码，可双向绑定
        this.loading = null;
        this.change = new EventEmitter();
        //样式
        this.bordered = false;
        this._allChecked = false;
        this._allCheckedDisabled = false;
        this._indeterminate = false;
        this.totalTpl = ``;
        //分页
        this._isPagination = true; //是否显示分页器
        this._isSizeChanger = false; //是否可以改变 nzPageSize
        this._isQuickJumper = false; //是否可以快速跳转至某页
        this._isPageSizeOptions = [10, 20, 30, 40, 50]; //页数选择器可选值
        this._isOnSinglePage = false; //只有一页时是否隐藏分页器
        this._paginationPosition = 'bottom'; //指定分页显示的位置   'top' | 'bottom' | 'both'
        this._frontPagination = true; //是否在前端对数据进行分页(data=>true,)，如果在服务器分页数据或者需要在前端显示全部数据时传入 false
        this._data = [];
        this.local = this.locale.getData('zt');
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        // console.log(changes);
        if (changes['url'] || changes['req'] || changes['pi'] || changes['ps']) {
            // this._frontPagination = false;
            this._loadData(this.url, this.req);
        }
        else if (changes['data']) {
            this._showData(changes['data'].currentValue);
        }
        if (changes['loading']) {
            // console.log("loading change")
        }
        if (changes['operators']) {
            this._changeOperator(changes['operators'].currentValue);
        }
        if (changes['page']) {
            this.updateTotalTpl();
            this._changePage(changes['page'].currentValue);
        }
    }
    _refCheck() {
        // console.log(this._data);
        // console.log(this.ps);
        const validData = this._data.filter(w => !w.disabled);
        const checkedList = validData.filter(w => w.checked === true);
        console.log(checkedList);
        this._allChecked = checkedList.length > 0 && checkedList.length === validData.length;
        const allUnChecked = validData.every(value => !value.checked);
        this._indeterminate = !this._allChecked && !allUnChecked;
        console.log("_indeterminate:" + this._indeterminate);
        this._allCheckedDisabled = this._data.length === this._data.filter(w => w.disabled).length;
        return this.cd();
    }
    cd() {
        this.cdr.detectChanges();
        return this;
    }
    updateTotalTpl() {
        const { total } = this.page;
        if (typeof total === 'string' && total.length) {
            this.totalTpl = total;
        }
        else if (this.toBoolean(total)) {
            this.totalTpl = this.local.total;
        }
        else {
            this.totalTpl = '';
        }
    }
    toBoolean(value, allowUndefined = false) {
        return allowUndefined && typeof value === 'undefined' ? undefined : value != null && `${value}` !== 'false';
    }
    _checkNotify() {
        const res = this._data.filter(w => !w.disabled && w.checked === true);
        console.log(res);
        this.changeEmit('checkbox', res);
        return this;
    }
    _checkAll(checked, item) {
        checked = typeof checked === 'undefined' ? this._allChecked : checked;
        this._data.filter(w => !w.disabled).forEach(i => (i.checked = checked));
        return this._refCheck()._checkNotify();
    }
    //单选
    _checkSelection(i, value) {
        i.checked = value;
        return this._refCheck()._checkNotify();
    }
    _refRadio(checked, item) {
        this._data.filter(w => !w.disabled).forEach(i => (i.checked = false));
        item.checked = checked;
        this.changeEmit('radio', item);
        return this;
    }
    _changeOperator(operators) {
        const filterOperators = []; //过滤隐藏的按钮
        if (operators && operators.length > 0) {
            operators.forEach((data) => {
                data['hidden'] ? null : filterOperators.push(data);
            });
            this.operators = filterOperators;
        }
    }
    _changePage(page) {
        this._frontPagination = page.front;
        this._isPageSizeOptions = page.pageSizes;
        this._paginationPosition = page.position;
        this._isPagination = page.show;
        this._isQuickJumper = page.showQuickJumper;
        this._isSizeChanger = page.showSize;
    }
    _pageIndexChange(pi) {
        this.pi = pi;
        this._allChecked = false;
        this.changeEmit('pi', pi);
    }
    _pageSizeChange(ps) {
        this.pi = 1;
        this.ps = ps;
        this.changeEmit('ps', ps);
    }
    _showData(data) {
        this._data = data;
        this.total = this.total ? this.total : data.length;
    }
    _loadData(url, req) {
        if (!url) {
            return;
        }
        if (req['reName']) {
            req.params[req['reName']['pi']] = this.pi - 1;
            req.params[req['reName']['ps']] = this.ps;
        }
        this.loading = true;
        this.servie.patchHero(url, req).subscribe((res) => {
            this._data = res;
            this.loading = false;
            this.changeEmit('loaded', res);
            return this._refCheck()._checkNotify();
        }, ((error) => { this.loading = false; }));
    }
    _rowClick(e, item, index) {
        if (e.target.nodeName === 'INPUT')
            return;
        const data = { e, item, index };
        this.changeEmit('click', data);
    }
    setData(list, total) {
        this._data = list; //重新赋值
        this.total = total;
    }
    changeEmit(type, data) {
        // console.log(data);
        const res = {
            type,
            pi: this.pi,
            ps: this.ps,
            total: this.total,
        };
        if (data != null) {
            res[type] = data;
        }
        this.change.emit(res);
    }
    renderTotal(total, range) {
        return this.totalTpl
            ? this.totalTpl.replace('{{total}}', this.total ? this.total : total).replace('{{range[0]}}', range[0]).replace('{{range[1]}}', range[1])
            : '';
    }
};
__decorate([
    Input()
], TableComponent.prototype, "data", void 0);
__decorate([
    Input()
], TableComponent.prototype, "columns", void 0);
__decorate([
    Input()
], TableComponent.prototype, "ps", void 0);
__decorate([
    Input()
], TableComponent.prototype, "pi", void 0);
__decorate([
    Input()
], TableComponent.prototype, "total", void 0);
__decorate([
    Input()
], TableComponent.prototype, "loading", void 0);
__decorate([
    Input()
], TableComponent.prototype, "scroll", void 0);
__decorate([
    Input()
], TableComponent.prototype, "url", void 0);
__decorate([
    Input()
], TableComponent.prototype, "req", void 0);
__decorate([
    Input()
], TableComponent.prototype, "page", void 0);
__decorate([
    Input()
], TableComponent.prototype, "operators", void 0);
__decorate([
    Output()
], TableComponent.prototype, "change", void 0);
__decorate([
    Input()
], TableComponent.prototype, "bordered", void 0);
__decorate([
    ViewChild('table', { static: false })
], TableComponent.prototype, "orgTable", void 0);
TableComponent = __decorate([
    Component({
        selector: 'zt',
        template: "<ng-container>\r\n  <nz-button-group>\r\n    <button *ngFor=\"let operator of operators\" nz-button [nzType]=\"operator.type\" (click)=\"operator.click()\">\r\n      {{operator.text}}\r\n    </button>\r\n  </nz-button-group>\r\n</ng-container>\r\n\r\n<nz-table #table [nzData]=\"_data\" [nzTotal]=\"total\"  [nzBordered]=\"bordered\" [nzLoading]=\"loading\"   [nzScroll]=\"scroll\"  [(nzPageIndex)]=\"pi\"\r\n  [(nzPageSize)]=\"ps\" [nzShowPagination]=\"_isPagination\" [nzShowQuickJumper]=\"_isQuickJumper\"\r\n  [nzPageSizeOptions]=\"_isPageSizeOptions\" [nzHideOnSinglePage]=\"_isOnSinglePage\"\r\n  [nzPaginationPosition]=\"_paginationPosition\" [nzFrontPagination]=\"_frontPagination\"\r\n  [nzShowSizeChanger]=\"_isSizeChanger\" (nzPageIndexChange)=\"_pageIndexChange($event)\"\r\n  (nzPageSizeChange)=\"_pageSizeChange($event)\"  [nzShowTotal]=\"totalTpl\">\r\n  <thead>\r\n    <tr>\r\n      <th *ngFor=\"let col of columns; let $index = index\" [nzAlign]=\"col.type && col.type=='checkbox'?'center':'auto'\">\r\n        <label *ngIf=\"col.type && col.type=='checkbox'\" nz-checkbox [(ngModel)]=\"_allChecked\"\r\n          [nzIndeterminate]=\"_indeterminate\" (ngModelChange)=\"_checkAll($event,col)\"></label>\r\n        <span *ngIf=\"!col.type || col.type!='checkbox'\">{{col.text}}</span>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <ng-container *ngFor=\"let dataItem of table.data;let i = index;\">\r\n      <tr (click)=\"_rowClick($event, dataItem, i)\">\r\n        <ng-container *ngFor=\"let col of columns; let ii = index\">\r\n          <!-- normal -->\r\n          <ng-container *ngIf=\"!col.pipe && !col.pipeType && !col.type && !col.render && !col.buttons\">\r\n            <td> {{dataItem[col.index]}}</td>\r\n          </ng-container>\r\n          <!-- type -->\r\n          <ng-container *ngIf=\"!col.pipe && !col.pipeType && col.type && !col.render && !col.buttons\">\r\n            <td [nzAlign]=\"col.type && (col.type=='checkbox' || col.type=='radio')?'center':'auto'\" >\r\n              <ng-container [ngSwitch]=\"col.type\">\r\n                <label *ngSwitchCase=\"'checkbox'\" nz-checkbox [nzDisabled]=\"dataItem.disabled\"\r\n                  [ngModel]=\"dataItem.checked\" (ngModelChange)=\"_checkSelection(dataItem, $event)\"></label>\r\n                <label *ngSwitchCase=\"'radio'\" nz-radio [nzDisabled]=\"dataItem.disabled\" [ngModel]=\"dataItem.checked\"\r\n                  (ngModelChange)=\"_refRadio($event, dataItem)\"></label>\r\n                <img *ngSwitchCase=\"'img'\" style=\"width: auto; height: 30px;\" [src]=\"dataItem[col.index]\" alt=\"\"\r\n                  srcset=\"\">\r\n              </ng-container>\r\n            </td>\r\n          </ng-container>\r\n          <!-- pipe -->\r\n          <ng-container *ngIf=\"col.pipe && !col.pipeType && !col.type && !col.render && !col.buttons\">\r\n            <td>{{dataItem[col.index] | tablePipe: col.pipe}}</td>\r\n          </ng-container>\r\n          <!-- pipeType -->\r\n          <ng-container *ngIf=\"!col.pipe && col.pipeType && !col.type && !col.render && !col.buttons\">\r\n            <td>\r\n              {{dataItem[col.index] | date:col.pipeType ==='timestampHms'?'yyyy-MM-dd HH:mm:ss':(col.pipeType ==='timestamp'?'yyyy-MM-dd':'yyyy-MM-dd')}}\r\n            </td>\r\n          </ng-container>\r\n          <!-- render -->\r\n          <ng-container *ngIf=\"!col.pipe && !col.pipeType && !col.type && col.render && !col.buttons\">\r\n            <td>\r\n              <div [innerHTML]=\" dataItem[col.index] | renderPipe:dataItem:col.index:col.render\">\r\n              </div>\r\n            </td>\r\n          </ng-container>\r\n          <!-- buttons -->\r\n          <ng-container *ngIf=\"!col.pipe && !col.pipeType && !col.type && !col.render && col.buttons\">\r\n            <td>\r\n              <table-columns-buttons [buttons]=\"col.buttons\" [type]=\"col.buttonType\" [row]=\"dataItem\" [rowIndex]=\"i\">\r\n              </table-columns-buttons>\r\n            </td>\r\n          </ng-container>\r\n        </ng-container>\r\n      </tr>\r\n    </ng-container>\r\n\r\n  </tbody>\r\n  <ng-template #totalTpl let-range=\"range\" let-total>{{ renderTotal(total, range) }}</ng-template>\r\n</nz-table>\r\n",
        styles: ["button{margin-bottom:12px;margin-right:12px}"]
    })
], TableComponent);

let TableColumnsButtonsComponent = class TableColumnsButtonsComponent {
    constructor() {
        this.type = 'button'; //button or link
        this.extButtons = [];
        this.normalButtons = [];
    }
    ngOnInit() {
        var canAccessActions = [];
        for (const iterator of this.buttons) {
            if (iterator['permission']) {
                //有权限限制
                if (iterator['permission'](this.row, this.rowIndex)) {
                    canAccessActions.push(iterator);
                }
            }
            else {
                //无权限限制
                canAccessActions.push(iterator);
            }
        }
        this.normalButtons = canAccessActions;
    }
};
__decorate([
    Input()
], TableColumnsButtonsComponent.prototype, "buttons", void 0);
__decorate([
    Input()
], TableColumnsButtonsComponent.prototype, "type", void 0);
__decorate([
    Input()
], TableColumnsButtonsComponent.prototype, "row", void 0);
__decorate([
    Input()
], TableColumnsButtonsComponent.prototype, "rowIndex", void 0);
__decorate([
    Input()
], TableColumnsButtonsComponent.prototype, "extButtons", void 0);
TableColumnsButtonsComponent = __decorate([
    Component({
        selector: 'table-columns-buttons',
        template: "<ng-container>\r\n    <nz-button-group *ngIf=\"type=='button'\">\r\n      <button nz-button *ngFor=\"let action of normalButtons\" [nzType]=\"action.type\" (click)=\"action.click(row,rowIndex)\">{{action.text}}</button>\r\n    </nz-button-group>\r\n    <ng-container  *ngIf=\"type=='link'\">\r\n      <ng-container *ngFor=\"let action of normalButtons;let $index = index;\">\r\n          <a (click)=\"action.click(row,rowIndex)\">{{action.text}}</a>\r\n          <nz-divider *ngIf=\"$index!=normalButtons.length-1\" nzType=\"vertical\"></nz-divider>\r\n      </ng-container>\r\n    </ng-container>\r\n</ng-container>\r\n\r\n",
        styles: ["button{margin-right:12px}"]
    })
], TableColumnsButtonsComponent);

let DroppableComponent = class DroppableComponent {
    constructor() {
        this.disabled = false;
        this.zdSortChange = new EventEmitter();
        this.options = {
            onUpdate: (event) => {
                this.zdSortChange.emit(this.data);
            }
        };
    }
    ngOnInit() {
        this._setOption(this.disabled);
    }
    ngOnChanges(changes) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        if (changes['disabled']) {
            this._disabledChange(changes['disabled'].currentValue);
        }
    }
    _disabledChange(value) {
        this._setOption(value);
    }
    _setOption(value) {
        this.disabled = value;
    }
};
__decorate([
    Input()
], DroppableComponent.prototype, "data", void 0);
__decorate([
    Input()
], DroppableComponent.prototype, "renderItem", void 0);
__decorate([
    Input()
], DroppableComponent.prototype, "disabled", void 0);
__decorate([
    Output()
], DroppableComponent.prototype, "zdSortChange", void 0);
DroppableComponent = __decorate([
    Component({
        selector: 'az-droppable',
        template: "<!-- <p>\u62D6\u62FD\uFF1A</p>\n<span *ngFor=\"let item of data\">{{item.name}}</span> -->\n<div *ngIf=\"disabled\">\n  <div>\n    <ng-container *ngFor=\"let item of data;let ii= index\">\n      <ng-template [ngTemplateOutlet]=\"renderItem\" [ngTemplateOutletContext]=\"{ $implicit: item, index: ii }\">\n      </ng-template>\n    </ng-container>\n  </div>\n</div>\n\n<div *ngIf=\"!disabled\">\n  <!-- <span *ngFor=\"let item of data\">{{item.name}} + \"----\"</span> -->\n  <div [sortablejs]=\"data\" [sortablejsOptions]=\"options\">\n    <ng-container *ngFor=\"let item of data;let ii= index\">\n      <ng-template [ngTemplateOutlet]=\"renderItem\" [ngTemplateOutletContext]=\"{ $implicit: item, index: ii }\">\n      </ng-template>\n    </ng-container>\n  </div>\n</div>\n\n",
        styles: [".example-list{display:block;overflow:hidden}.example-box{align-items:center;cursor:move;display:inline-flex;flex-direction:row}.cdk-drag-preview{border:1px solid red}.cdk-drop-list-dragging .cdk-drag{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-animating{transition:transform .3s cubic-bezier(0,0,.2,1)}"]
    })
], DroppableComponent);

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
        this._showUploadList = typeof value === 'boolean' ? toBoolean$1(value) : value;
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

/**
 * '_executeValidators' utility function
 *
 * Validates a control against an array of validators, and returns
 * an array of the same length containing a combination of error messages
 * (from invalid validators) and null values (from valid validators)
 *
 * //  { AbstractControl } control - control to validate
 * //  { IValidatorFn[] } validators - array of validators
 * //  { boolean } invert - invert?
 * // { PlainObject[] } - array of nulls and error message
 */
function _executeValidators(control, validators, invert = false) {
    return validators.map(validator => validator(control, invert));
}
/**
 * '_executeAsyncValidators' utility function
 *
 * Validates a control against an array of async validators, and returns
 * an array of observabe results of the same length containing a combination of
 * error messages (from invalid validators) and null values (from valid ones)
 *
 * //  { AbstractControl } control - control to validate
 * //  { AsyncIValidatorFn[] } validators - array of async validators
 * //  { boolean } invert - invert?
 * //  - array of observable nulls and error message
 */
function _executeAsyncValidators(control, validators, invert = false) {
    return validators.map(validator => validator(control, invert));
}
/**
 * '_mergeObjects' utility function
 *
 * Recursively Merges one or more objects into a single object with combined keys.
 * Automatically detects and ignores null and undefined inputs.
 * Also detects duplicated boolean 'not' keys and XORs their values.
 *
 * //  { PlainObject[] } objects - one or more objects to merge
 * // { PlainObject } - merged object
 */
function _mergeObjects(...objects) {
    const mergedObject = {};
    for (const currentObject of objects) {
        if (isObject(currentObject)) {
            for (const key of Object.keys(currentObject)) {
                const currentValue = currentObject[key];
                const mergedValue = mergedObject[key];
                mergedObject[key] = !isDefined(mergedValue) ? currentValue :
                    key === 'not' && isBoolean(mergedValue, 'strict') &&
                        isBoolean(currentValue, 'strict') ? xor(mergedValue, currentValue) :
                        getType(mergedValue) === 'object' && getType(currentValue) === 'object' ?
                            _mergeObjects(mergedValue, currentValue) :
                            currentValue;
            }
        }
    }
    return mergedObject;
}
/**
 * '_mergeErrors' utility function
 *
 * Merges an array of objects.
 * Used for combining the validator errors returned from 'executeValidators'
 *
 * //  { PlainObject[] } arrayOfErrors - array of objects
 * // { PlainObject } - merged object, or null if no usable input objectcs
 */
function _mergeErrors(arrayOfErrors) {
    const mergedErrors = _mergeObjects(...arrayOfErrors);
    return isEmpty(mergedErrors) ? null : mergedErrors;
}
/**
 * 'isDefined' utility function
 *
 * Checks if a variable contains a value of any type.
 * Returns true even for otherwise 'falsey' values of 0, '', and false.
 *
 * //   value - the value to check
 * // { boolean } - false if undefined or null, otherwise true
 */
function isDefined(value) {
    return value !== undefined && value !== null;
}
/**
 * 'hasValue' utility function
 *
 * Checks if a variable contains a value.
 * Returs false for null, undefined, or a zero-length strng, '',
 * otherwise returns true.
 * (Stricter than 'isDefined' because it also returns false for '',
 * though it stil returns true for otherwise 'falsey' values 0 and false.)
 *
 * //   value - the value to check
 * // { boolean } - false if undefined, null, or '', otherwise true
 */
function hasValue(value) {
    return value !== undefined && value !== null && value !== '';
}
/**
 * 'isEmpty' utility function
 *
 * Similar to !hasValue, but also returns true for empty arrays and objects.
 *
 * //   value - the value to check
 * // { boolean } - false if undefined, null, or '', otherwise true
 */
function isEmpty(value) {
    if (isArray(value)) {
        return !value.length;
    }
    if (isObject(value)) {
        return !Object.keys(value).length;
    }
    return value === undefined || value === null || value === '';
}
/**
 * 'isString' utility function
 *
 * Checks if a value is a string.
 *
 * //   value - the value to check
 * // { boolean } - true if string, false if not
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * 'isNumber' utility function
 *
 * Checks if a value is a regular number, numeric string, or JavaScript Date.
 *
 * //   value - the value to check
 * //  { any = false } strict - if truthy, also checks JavaScript tyoe
 * // { boolean } - true if number, false if not
 */
function isNumber(value, strict = false) {
    if (strict && typeof value !== 'number') {
        return false;
    }
    return !isNaN(value) && value !== value / 0;
}
/**
 * 'isInteger' utility function
 *
 * Checks if a value is an integer.
 *
 * //   value - the value to check
 * //  { any = false } strict - if truthy, also checks JavaScript tyoe
 * // {boolean } - true if number, false if not
 */
function isInteger(value, strict = false) {
    if (strict && typeof value !== 'number') {
        return false;
    }
    return !isNaN(value) && value !== value / 0 && value % 1 === 0;
}
/**
 * 'isBoolean' utility function
 *
 * Checks if a value is a boolean.
 *
 * //   value - the value to check
 * //  { any = null } option - if 'strict', also checks JavaScript type
 *                              if TRUE or FALSE, checks only for that value
 * // { boolean } - true if boolean, false if not
 */
function isBoolean(value, option = null) {
    if (option === 'strict') {
        return value === true || value === false;
    }
    if (option === true) {
        return value === true || value === 1 || value === 'true' || value === '1';
    }
    if (option === false) {
        return value === false || value === 0 || value === 'false' || value === '0';
    }
    return value === true || value === 1 || value === 'true' || value === '1' ||
        value === false || value === 0 || value === 'false' || value === '0';
}
function isFunction(item) {
    return typeof item === 'function';
}
function isObject(item) {
    return item !== null && typeof item === 'object';
}
function isArray(item) {
    return Array.isArray(item);
}
function isDate(item) {
    return !!item && Object.prototype.toString.call(item) === '[object Date]';
}
function isMap(item) {
    return !!item && Object.prototype.toString.call(item) === '[object Map]';
}
function isSet(item) {
    return !!item && Object.prototype.toString.call(item) === '[object Set]';
}
function isSymbol(item) {
    return typeof item === 'symbol';
}
/**
 * 'getType' function
 *
 * Detects the JSON Schema Type of a value.
 * By default, detects numbers and integers even if formatted as strings.
 * (So all integers are also numbers, and any number may also be a string.)
 * However, it only detects true boolean values (to detect boolean values
 * in non-boolean formats, use isBoolean() instead).
 *
 * If passed a second optional parameter of 'strict', it will only detect
 * numbers and integers if they are formatted as JavaScript numbers.
 *
 * Examples:
 * getType('10.5') = 'number'
 * getType(10.5) = 'number'
 * getType('10') = 'integer'
 * getType(10) = 'integer'
 * getType('true') = 'string'
 * getType(true) = 'boolean'
 * getType(null) = 'null'
 * getType({ }) = 'object'
 * getType([]) = 'array'
 *
 * getType('10.5', 'strict') = 'string'
 * getType(10.5, 'strict') = 'number'
 * getType('10', 'strict') = 'string'
 * getType(10, 'strict') = 'integer'
 * getType('true', 'strict') = 'string'
 * getType(true, 'strict') = 'boolean'
 *
 * //   value - value to check
 * //  { any = false } strict - if truthy, also checks JavaScript tyoe
 * // { SchemaType }
 */
function getType(value, strict = false) {
    if (!isDefined(value)) {
        return 'null';
    }
    if (isArray(value)) {
        return 'array';
    }
    if (isObject(value)) {
        return 'object';
    }
    if (isBoolean(value, 'strict')) {
        return 'boolean';
    }
    if (isInteger(value, strict)) {
        return 'integer';
    }
    if (isNumber(value, strict)) {
        return 'number';
    }
    if (isString(value) || (!strict && isDate(value))) {
        return 'string';
    }
    return null;
}
/**
 * 'isType' function
 *
 * Checks wether an input (probably string) value contains data of
 * a specified JSON Schema type
 *
 * //  { PrimitiveValue } value - value to check
 * //  { SchemaPrimitiveType } type - type to check
 * // { boolean }
 */
function isType(value, type) {
    switch (type) {
        case 'string':
            return isString(value) || isDate(value);
        case 'number':
            return isNumber(value);
        case 'integer':
            return isInteger(value);
        case 'boolean':
            return isBoolean(value);
        case 'null':
            return !hasValue(value);
        default:
            console.error(`isType error: "${type}" is not a recognized type.`);
            return null;
    }
}
/**
 * 'isPrimitive' function
 *
 * Checks wether an input value is a JavaScript primitive type:
 * string, number, boolean, or null.
 *
 * //   value - value to check
 * // { boolean }
 */
function isPrimitive(value) {
    return (isString(value) || isNumber(value) ||
        isBoolean(value, 'strict') || value === null);
}
/**
 * 'toJavaScriptType' function
 *
 * Converts an input (probably string) value to a JavaScript primitive type -
 * 'string', 'number', 'boolean', or 'null' - before storing in a JSON object.
 *
 * Does not coerce values (other than null), and only converts the types
 * of values that would otherwise be valid.
 *
 * If the optional third parameter 'strictIntegers' is TRUE, and the
 * JSON Schema type 'integer' is specified, it also verifies the input value
 * is an integer and, if it is, returns it as a JaveScript number.
 * If 'strictIntegers' is FALSE (or not set) the type 'integer' is treated
 * exactly the same as 'number', and allows decimals.
 *
 * Valid Examples:
 * toJavaScriptType('10',   'number' ) = 10   // '10'   is a number
 * toJavaScriptType('10',   'integer') = 10   // '10'   is also an integer
 * toJavaScriptType( 10,    'integer') = 10   //  10    is still an integer
 * toJavaScriptType( 10,    'string' ) = '10' //  10    can be made into a string
 * toJavaScriptType('10.5', 'number' ) = 10.5 // '10.5' is a number
 *
 * Invalid Examples:
 * toJavaScriptType('10.5', 'integer') = null // '10.5' is not an integer
 * toJavaScriptType( 10.5,  'integer') = null //  10.5  is still not an integer
 *
 * //  { PrimitiveValue } value - value to convert
 * //  { SchemaPrimitiveType | SchemaPrimitiveType[] } types - types to convert to
 * //  { boolean = false } strictIntegers - if FALSE, treat integers as numbers
 * // { PrimitiveValue }
 */
function toJavaScriptType(value, types, strictIntegers = true) {
    if (!isDefined(value)) {
        return null;
    }
    if (isString(types)) {
        types = [types];
    }
    if (strictIntegers && inArray('integer', types)) {
        if (isInteger(value, 'strict')) {
            return value;
        }
        if (isInteger(value)) {
            return parseInt(value, 10);
        }
    }
    if (inArray('number', types) || (!strictIntegers && inArray('integer', types))) {
        if (isNumber(value, 'strict')) {
            return value;
        }
        if (isNumber(value)) {
            return parseFloat(value);
        }
    }
    if (inArray('string', types)) {
        if (isString(value)) {
            return value;
        }
        // If value is a date, and types includes 'string',
        // convert the date to a string
        if (isDate(value)) {
            return value.toISOString().slice(0, 10);
        }
        if (isNumber(value)) {
            return value.toString();
        }
    }
    // If value is a date, and types includes 'integer' or 'number',
    // but not 'string', convert the date to a number
    if (isDate(value) && (inArray('integer', types) || inArray('number', types))) {
        return value.getTime();
    }
    if (inArray('boolean', types)) {
        if (isBoolean(value, true)) {
            return true;
        }
        if (isBoolean(value, false)) {
            return false;
        }
    }
    return null;
}
/**
 * 'toSchemaType' function
 *
 * Converts an input (probably string) value to the "best" JavaScript
 * equivalent available from an allowed list of JSON Schema types, which may
 * contain 'string', 'number', 'integer', 'boolean', and/or 'null'.
 * If necssary, it does progressively agressive type coersion.
 * It will not return null unless null is in the list of allowed types.
 *
 * Number conversion examples:
 * toSchemaType('10', ['number','integer','string']) = 10 // integer
 * toSchemaType('10', ['number','string']) = 10 // number
 * toSchemaType('10', ['string']) = '10' // string
 * toSchemaType('10.5', ['number','integer','string']) = 10.5 // number
 * toSchemaType('10.5', ['integer','string']) = '10.5' // string
 * toSchemaType('10.5', ['integer']) = 10 // integer
 * toSchemaType(10.5, ['null','boolean','string']) = '10.5' // string
 * toSchemaType(10.5, ['null','boolean']) = true // boolean
 *
 * String conversion examples:
 * toSchemaType('1.5x', ['boolean','number','integer','string']) = '1.5x' // string
 * toSchemaType('1.5x', ['boolean','number','integer']) = '1.5' // number
 * toSchemaType('1.5x', ['boolean','integer']) = '1' // integer
 * toSchemaType('1.5x', ['boolean']) = true // boolean
 * toSchemaType('xyz', ['number','integer','boolean','null']) = true // boolean
 * toSchemaType('xyz', ['number','integer','null']) = null // null
 * toSchemaType('xyz', ['number','integer']) = 0 // number
 *
 * Boolean conversion examples:
 * toSchemaType('1', ['integer','number','string','boolean']) = 1 // integer
 * toSchemaType('1', ['number','string','boolean']) = 1 // number
 * toSchemaType('1', ['string','boolean']) = '1' // string
 * toSchemaType('1', ['boolean']) = true // boolean
 * toSchemaType('true', ['number','string','boolean']) = 'true' // string
 * toSchemaType('true', ['boolean']) = true // boolean
 * toSchemaType('true', ['number']) = 0 // number
 * toSchemaType(true, ['number','string','boolean']) = true // boolean
 * toSchemaType(true, ['number','string']) = 'true' // string
 * toSchemaType(true, ['number']) = 1 // number
 *
 * //  { PrimitiveValue } value - value to convert
 * //  { SchemaPrimitiveType | SchemaPrimitiveType[] } types - allowed types to convert to
 * // { PrimitiveValue }
 */
function toSchemaType(value, types) {
    if (!isArray(types)) {
        types = [types];
    }
    if (types.includes('null') && !hasValue(value)) {
        return null;
    }
    if (types.includes('boolean') && !isBoolean(value, 'strict')) {
        return value;
    }
    if (types.includes('integer')) {
        const testValue = toJavaScriptType(value, 'integer');
        if (testValue !== null) {
            return +testValue;
        }
    }
    if (types.includes('number')) {
        const testValue = toJavaScriptType(value, 'number');
        if (testValue !== null) {
            return +testValue;
        }
    }
    if ((isString(value) || isNumber(value, 'strict')) &&
        types.includes('string')) { // Convert number to string
        return toJavaScriptType(value, 'string');
    }
    if (types.includes('boolean') && isBoolean(value)) {
        return toJavaScriptType(value, 'boolean');
    }
    if (types.includes('string')) { // Convert null & boolean to string
        if (value === null) {
            return '';
        }
        const testValue = toJavaScriptType(value, 'string');
        if (testValue !== null) {
            return testValue;
        }
    }
    if ((types.includes('number') ||
        types.includes('integer'))) {
        if (value === true) {
            return 1;
        } // Convert boolean & null to number
        if (value === false || value === null || value === '') {
            return 0;
        }
    }
    if (types.includes('number')) { // Convert mixed string to number
        const testValue = parseFloat(value);
        if (!!testValue) {
            return testValue;
        }
    }
    if (types.includes('integer')) { // Convert string or number to integer
        const testValue = parseInt(value, 10);
        if (!!testValue) {
            return testValue;
        }
    }
    if (types.includes('boolean')) { // Convert anything to boolean
        return !!value;
    }
    if ((types.includes('number') ||
        types.includes('integer')) && !types.includes('null')) {
        return 0; // If null not allowed, return 0 for non-convertable values
    }
}
/**
 * 'isPromise' function
 *
 * //   object
 * // { boolean }
 */
function isPromise(object) {
    return !!object && typeof object.then === 'function';
}
/**
 * 'isObservable' function
 *
 * //   object
 * // { boolean }
 */
function isObservable(object) {
    return !!object && typeof object.subscribe === 'function';
}
/**
 * '_toPromise' function
 *
 * //  { object } object
 * // { Promise<any> }
 */
function _toPromise(object) {
    return isPromise(object) ? object : object.toPromise();
}
/**
 * 'toObservable' function
 *
 * //  { object } object
 * // { Observable<any> }
 */
function toObservable(object) {
    const observable = isPromise(object) ? from(object) : object;
    if (isObservable(observable)) {
        return observable;
    }
    console.error('toObservable error: Expected validator to return Promise or Observable.');
    return new Observable();
}
/**
 * 'inArray' function
 *
 * Searches an array for an item, or one of a list of items, and returns true
 * as soon as a match is found, or false if no match.
 *
 * If the optional third parameter allIn is set to TRUE, and the item to find
 * is an array, then the function returns true only if all elements from item
 * are found in the array list, and false if any element is not found. If the
 * item to find is not an array, setting allIn to TRUE has no effect.
 *
 * //  { any|any[] } item - the item to search for
 * //   array - the array to search
 * //  { boolean = false } allIn - if TRUE, all items must be in array
 * // { boolean } - true if item(s) in array, false otherwise
 */
function inArray(item, array, allIn = false) {
    if (!isDefined(item) || !isArray(array)) {
        return false;
    }
    return isArray(item) ?
        item[allIn ? 'every' : 'some'](subItem => array.includes(subItem)) :
        array.includes(item);
}
/**
 * 'xor' utility function - exclusive or
 *
 * Returns true if exactly one of two values is truthy.
 *
 * //   value1 - first value to check
 * //   value2 - second value to check
 * // { boolean } - true if exactly one input value is truthy, false if not
 */
function xor(value1, value2) {
    return (!!value1 && !value2) || (!value1 && !!value2);
}

const REGEXP_IMAGE_TYPE = /^image\/.+$/;
const REGEXP_VIDEO_TYPE = /^video\/.+$/;
function toBool(value, defaultValue) {
    value = toBoolean(value, true);
    return value == null ? defaultValue : value;
}
function toBoolean(value, allowUndefined = false) {
    return allowUndefined && typeof value === 'undefined' ? undefined : value != null && `${value}` !== 'false';
}
function isImageType(value) {
    return REGEXP_IMAGE_TYPE.test(value);
}
function isVideoType(value) {
    return REGEXP_VIDEO_TYPE.test(value);
}
function getFileType(fileName) {
    // 后缀获取
    let suffix = '';
    // 获取类型结果
    let result = '';
    try {
        const flieArr = fileName.split('.');
        suffix = flieArr[flieArr.length - 1];
    }
    catch (err) {
        suffix = '';
    }
    // fileName无后缀返回 false
    if (!suffix) {
        return false;
    }
    suffix = suffix.toLocaleLowerCase();
    // 图片格式
    const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
    // 进行图片匹配
    result = imglist.find(item => item === suffix);
    if (result) {
        return 'image';
    }
    // 匹配txt
    const txtlist = ['txt'];
    result = txtlist.find(item => item === suffix);
    if (result) {
        return 'txt';
    }
    // 匹配 excel
    const excelist = ['xls', 'xlsx'];
    result = excelist.find(item => item === suffix);
    if (result) {
        return 'excel';
    }
    // 匹配 word
    const wordlist = ['doc', 'docx'];
    result = wordlist.find(item => item === suffix);
    if (result) {
        return 'word';
    }
    // 匹配 pdf
    const pdflist = ['pdf'];
    result = pdflist.find(item => item === suffix);
    if (result) {
        return 'pdf';
    }
    // 匹配 ppt
    const pptlist = ['ppt', 'pptx'];
    result = pptlist.find(item => item === suffix);
    if (result) {
        return 'ppt';
    }
    // 匹配 视频
    const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
    result = videolist.find(item => item === suffix);
    if (result) {
        return 'video';
    }
    // 匹配 音频
    const radiolist = ['mp3', 'wav', 'wmv'];
    result = radiolist.find(item => item === suffix);
    if (result) {
        return 'radio';
    }
    // 其他 文件类型
    return 'other';
}
function isEqual(value, compare) {
    return value == compare;
}
function hasOwn(object, property) {
    if (!object || !['number', 'string', 'symbol'].includes(typeof property) ||
        (!isObject(object) && !isArray(object) && !isMap(object) && !isSet(object))) {
        return false;
    }
    if (isMap(object) || isSet(object)) {
        return object.has(property);
    }
    if (typeof property === 'number') {
        if (isArray(object)) {
            return object[property];
        }
        property = property + '';
    }
    return object.hasOwnProperty(property);
}

let ComponentsService = class ComponentsService {
    constructor(injector, modal) {
        this.injector = injector;
        this.modal = modal;
        this.filePreview = (file) => __awaiter(this, void 0, void 0, function* () {
            if ((isImageType(file.type) || isEqual(getFileType(file.name), 'image')) && !file.url && !file.preview) {
                file.preview = yield this.getBase64(file.originFileObj);
                // console.log(file.preview)
            }
            const _url = file.url || file.preview;
            if (isImageType(file.type) || isEqual(getFileType(file.name), 'image')) {
                this.modal.create({
                    nzContent: `<img src="${_url}" width="100%"/>`,
                    nzFooter: null,
                });
            }
            else if (isVideoType(file.type) || isEqual(getFileType(file.name), 'video')) {
                this.modal.create({
                    nzContent: `<video src="${_url}" controls="controls" width="100%">您的浏览器不支持视频播放</video>`,
                    nzFooter: null,
                });
            }
            else {
                // this.injector.get<NzModalService>(NzModalService).create({
                //   nzContent: `<p class="text-center" >暂时无法查看实时文件</p>`,
                //   nzFooter: null,
                // });
                window.open(_url);
            }
        });
    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
};
ComponentsService.ɵprov = ɵɵdefineInjectable({ factory: function ComponentsService_Factory() { return new ComponentsService(ɵɵinject(INJECTOR), ɵɵinject(NzModalService)); }, token: ComponentsService, providedIn: "root" });
ComponentsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ComponentsService);

const loaderAllType = [
    { type: 'ball-pulse', num: 3, },
    { type: 'ball-grid-pulse', num: 9, },
    { type: 'ball-clip-rotate', num: 1, },
    { type: 'ball-clip-rotate-pulse', num: 2, },
    { type: 'square-spin', num: 1, },
    { type: 'ball-clip-rotate-multiple', num: 2, },
    { type: 'ball-pulse-rise', num: 5, },
    { type: 'ball-rotate', num: 1, },
    { type: 'cube-transition', num: 2, },
    { type: 'ball-zig-zag', num: 2, },
    { type: 'ball-zig-zag-deflect', num: 2, },
    { type: 'ball-triangle-path', num: 3, },
    { type: 'ball-scale', num: 1, },
    { type: 'line-scale', num: 5, },
    { type: 'line-scale-party', num: 4, },
    { type: 'ball-scale-multiple', num: 3, },
    { type: 'ball-pulse-sync', num: 3, },
    { type: 'ball-beat', num: 3, },
    { type: 'line-scale-pulse-out', num: 5, },
    { type: 'line-scale-pulse-out-rapid', num: 5, },
    { type: 'ball-scale-ripple', num: 1, },
    { type: 'ball-scale-ripple-multiple', num: 3, },
    { type: 'ball-spin-fade-loader', num: 8, },
    { type: 'line-spin-fade-loader', num: 8, },
    { type: 'triangle-skew-spin', num: 1, },
    { type: 'pacman', num: 5, },
    { type: 'ball-grid-beat', num: 9, },
    { type: 'semi-circle-spin', num: 1, },
];
let LoadingComponent = class LoadingComponent {
    constructor() {
        this.type = 'ball-beat';
        this.loading = false;
        this.color = "#000";
        this.className = 'ball-beat';
        this.loadList = [1, 1, 1,];
        this._size = 10;
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        if (changes['type']) {
            this._getLoader(changes['type'].currentValue);
        }
        if (changes['size']) {
            this._getSize(changes['size'].currentValue);
        }
    }
    _getSize(size) {
        switch (size) {
            case 'samll':
                this._size = 5;
                break;
            case 'large':
                this._size = 15;
                break;
            default:
                this._size = 10;
                break;
        }
    }
    _getLoader(type) {
        for (const iterator of loaderAllType) {
            if (iterator.type == type) {
                this.loadList = new Array(iterator.num);
            }
        }
        this.className = type;
    }
};
__decorate([
    Input()
], LoadingComponent.prototype, "type", void 0);
__decorate([
    Input()
], LoadingComponent.prototype, "loading", void 0);
__decorate([
    Input()
], LoadingComponent.prototype, "color", void 0);
__decorate([
    Input()
], LoadingComponent.prototype, "size", void 0);
LoadingComponent = __decorate([
    Component({
        selector: 'az-loading',
        template: "\r\n\r\n<nz-spin style=\"min-width:100%;min-height:100%;\" [nzSpinning]=\"loading\" [nzDelay]=\"500\" [nzIndicator]=\"indicatorTemplate\"> \r\n  <ng-content></ng-content>\r\n</nz-spin>\r\n<ng-template #indicatorTemplate>\r\n    <div class=\"loader\" style=\"position: absolute;top: 50%;left: 50%;margin: -10px;\">\r\n        <div class=\"loader-inner {{className}}\" >\r\n          <div *ngFor=\"let item of loadList\" [ngStyle]=\"{'background': color?color:null,'width':_size+'px',height:_size+'px'}\"></div>\r\n        </div>\r\n      </div>\r\n</ng-template>",
        styles: [":host{align-items:center;background-color:hsla(0,0%,100%,.5);display:block;height:100%;justify-content:center;width:100%}"]
    })
], LoadingComponent);

// import '../../components/loading/loading.component.styl'
let LoadingService = class LoadingService {
    constructor(overlay, overlayContainer) {
        this.overlay = overlay;
        this.overlayContainer = overlayContainer;
        this.hasBackdrop = true;
    }
    create(option, container) {
        this.overlayRef = this.overlay.create({
            hasBackdrop: this.hasBackdrop,
            width: '100%',
            height: '100%',
            panelClass: ['modal', 'is-active'],
            backdropClass: 'modal-background',
            scrollStrategy: this.overlay.scrollStrategies.block(),
        });
        this.component = this.overlayRef.attach(new ComponentPortal(LoadingComponent));
        this._getComponentInstance(this.component.instance, option);
    }
    _getComponentInstance(instance, option) {
        instance.loading = true;
        if (option && option.color) {
            instance.color = option.color;
        }
        if (option && option.type) {
            instance.type = option.type;
        }
        if (option && option.size) {
            instance.size = option.size;
        }
    }
    destroy(container) {
        this.component.destroy();
        this.overlayRef.dispose();
    }
};
LoadingService.ɵprov = ɵɵdefineInjectable({ factory: function LoadingService_Factory() { return new LoadingService(ɵɵinject(Overlay), ɵɵinject(OverlayContainer)); }, token: LoadingService, providedIn: "root" });
LoadingService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], LoadingService);

let FileCheckComponent = class FileCheckComponent {
    constructor() {
        this.fileList = [];
        this.index = 0;
        this.show = true;
    }
    ngOnInit() {
    }
    getType(name) {
        return getFileType(name);
    }
    close() {
        this.show = false;
    }
    changeIndex(type) {
        switch (type) {
            case 'next':
                if (this.index + 1 >= this.fileList.length) {
                    this.index = 0;
                }
                else {
                    this.index = this.index + 1;
                }
                break;
            case 'perv':
                if (this.index - 1 < 0) {
                    this.index = this.fileList.length - 1;
                }
                else {
                    this.index = this.index - 1;
                }
                break;
        }
    }
};
__decorate([
    ViewChild('element', { read: ViewContainerRef })
], FileCheckComponent.prototype, "element", void 0);
__decorate([
    Input()
], FileCheckComponent.prototype, "fileList", void 0);
__decorate([
    Input()
], FileCheckComponent.prototype, "index", void 0);
FileCheckComponent = __decorate([
    Component({
        selector: 'az-file-view',
        template: "<div class=\"file-view-container\" *ngIf=\"show\">\n  <div class=\"file-view-container-close\">\n    <i (click)=\"close()\" nz-icon nzType=\"close\" nzTheme=\"outline\"></i>\n  </div>\n  <div class=\"file-view-container-content\">\n    <div class='file-view-container-icon'>\n      <i (click)=\"changeIndex('perv')\" nz-icon nzType=\"left\" nzTheme=\"outline\"></i>\n    </div>\n    <div class='file-view-container-content-view'>\n      <div *ngIf=\"fileList && fileList.length;else empty\">\n        <div [ngSwitch]=\"getType(fileList[index].name)\">\n          <p *ngSwitchCase=\"'image'\">\n            <img [src]=\"fileList[index].url?fileList[index].url:fileList[index].thumbUrl\" />\n          </p>\n          <p *ngSwitchCase=\"'video'\">\n            <video [src]=\"fileList[index].url?fileList[index].url:fileList[index].thumbUrl\" controls=\"controls\"\n              width=\"100%\">\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u89C6\u9891\u64AD\u653E</video>\n          </p>\n          <p *ngSwitchDefault>\n            <span>\u6682\u4E0D\u652F\u6301\u67E5\u770B</span>\n          </p>\n        </div>\n        <p>{{index+1}} / {{fileList.length}} </p>\n      </div>\n      <ng-template #empty>\n        <nz-empty nzNotFoundImage=\"simple\"></nz-empty>\n      </ng-template>\n\n    </div>\n    <div class='file-view-container-icon'><i (click)=\"changeIndex('next')\" nz-icon nzType=\"right\" nzTheme=\"outline\"></i>\n    </div>\n  </div>\n</div>\n",
        styles: [".file-view-container{-webkit-box-align:center;-webkit-overflow-scrolling:touch;background-color:rgba(12,15,19,.5);display:flex;flex-direction:column;height:100vh;left:0;overflow-y:auto;padding:24px;position:fixed;right:0;top:0;width:100%;z-index:109}.file-view-container .file-view-container-close{background:0 0;border-color:transparent;box-shadow:none;color:#fff;font-size:30px;text-align:right;width:100%}.file-view-container .file-view-container-content{display:flex;flex-flow:row;height:100%}.file-view-container .file-view-container-content .file-view-container-content-view{border-radius:6px;display:flex;flex:1;height:80%;margin:24px;padding:15px;width:calc(100vw - 160px)}.file-view-container .file-view-container-content .file-view-container-content-view>div{display:flex;flex-direction:column;justify-content:center;width:100%}.file-view-container .file-view-container-content .file-view-container-content-view img{max-height:75vh;max-width:112.49vh;min-height:300px;min-width:449.958px}.file-view-container .file-view-container-content .file-view-container-content-view p{color:#fff;text-align:center}.file-view-container .file-view-container-content .file-view-container-icon{align-items:center;color:#fff;display:flex;font-size:35px;height:70%;justify-content:center;opacity:.6}.file-view-container .file-view-container-content .file-view-container-icon:hover{opacity:1}i{cursor:pointer}"]
    })
], FileCheckComponent);

let FileViewService = class FileViewService {
    constructor(overlay, overlayContainer) {
        this.overlay = overlay;
        this.overlayContainer = overlayContainer;
        this.hasBackdrop = true;
    }
    show() {
        console.log("456");
    }
    create(options) {
        this.overlayRef = this.overlay.create();
        this.component = this.overlayRef.attach(new ComponentPortal(FileCheckComponent));
        this._getComponentInstance(this.component.instance, options);
    }
    _getComponentInstance(instance, options) {
        if (options.fileList) {
            instance.fileList = options.fileList;
        }
        if (options.index) {
            instance.index = options.index;
        }
    }
    destroy() {
        this.component.destroy();
        this.overlayRef.dispose();
    }
};
FileViewService.ɵprov = ɵɵdefineInjectable({ factory: function FileViewService_Factory() { return new FileViewService(ɵɵinject(Overlay), ɵɵinject(OverlayContainer)); }, token: FileViewService, providedIn: "root" });
FileViewService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FileViewService);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzShowUploadListInterface {
}

var zhTW = {
    abbr: 'zh-TW',
    zt: {
        emptyText: '暫無數據',
        clearText: '清空',
        total: '共 {{total}} 條',
    },
    zu: {
        uploading: '正在上傳...',
        removeFile: '刪除檔案',
        uploadError: '上傳失敗',
        previewFile: '檔案預覽',
        downloadFile: '下载文件',
        uploadStorage: '暫存檔案'
    },
    zf: {
        submit: '提交',
        cancel: '取消',
    }
};

var enUS = {
    abbr: 'en-US',
    zt: {
        emptyText: 'No data',
        clearText: 'Clear',
        total: '{{range[0]}} - {{range[1]}} of {{total}}',
    },
    zu: {
        uploading: 'Uploading...',
        removeFile: 'Remove file',
        uploadError: 'Upload error',
        previewFile: 'Preview file',
        downloadFile: 'Download file',
        uploadStorage: 'Temporary storage'
    },
    zf: {
        submit: 'Submit',
        cancel: 'Cancel',
    }
};

let CardComponent = class CardComponent {
    constructor(router) {
        this.router = router;
        this.loading = false;
        this._selectedIndex = 0;
    }
    ngOnInit() {
        console.log(this.options);
    }
    _getExtraLink(link) {
        console.log("link:" + link);
        if (link == 'back') {
            history.go(-1);
        }
        else {
            this.router.navigateByUrl(link);
        }
    }
    _selectChange(args) {
        this._selectedIndex = args[0].index;
    }
};
__decorate([
    Input()
], CardComponent.prototype, "options", void 0);
__decorate([
    Input()
], CardComponent.prototype, "loading", void 0);
CardComponent = __decorate([
    Component({
        selector: 'zc',
        template: "<nz-card [nzTitle]=\"options.title\" [nzLoading]=\"loading\" [nzExtra]=\"options.extra?extraTpl:null\" [nzBordered]=\"options.bordered\">\r\n  <ng-template #extraTpl>\r\n\r\n    <ng-container *ngIf=\"options.extra.type =='button';else extraLink\">\r\n      <button *ngFor=\"let item of options.extra.buttons\"\r\n        (click)=\"item.link?_getExtraLink(item.link):(item.click?item.click():null)\" [nzDanger]=\"item.danger\"\r\n        [disabled]=\"item.diabled\" nz-button [nzType]=\"item.type\">{{item.text}}</button>\r\n    </ng-container>\r\n\r\n    <ng-template #extraLink>\r\n      <a nz-button *ngFor=\"let item of options.extra.buttons\" nzType=\"link\" [nzDanger]=\"item.danger\"\r\n        [disabled]=\"item.diabled\"\r\n        (click)=\"item.link?_getExtraLink(item.link):(item.click?item.click():null)\">{{item.text}}</a>\r\n    </ng-template>\r\n\r\n\r\n  </ng-template>\r\n\r\n  <nz-card-tab *ngIf=\"options.tabs\">\r\n    <nz-tabset [nzSize]=\"options.tabs.size\" [nzSelectedIndex]=\"_selectedIndex\"\r\n      (nzSelectChange)=\"_selectChange([$event])\">\r\n      <nz-tab *ngFor=\"let item of options.tabs.values; let i=index\" [nzTitle]=\"item.title\" [nzDisabled]=\"item.disabled\">\r\n      </nz-tab>\r\n    </nz-tabset>\r\n\r\n  </nz-card-tab>\r\n  <ng-container *ngIf=\"options.tabs.values\">\r\n    <ng-template [ngTemplateOutlet]=\"options.tabs.values[_selectedIndex].component\"></ng-template>\r\n  </ng-container>\r\n\r\n\r\n  <ng-content></ng-content>\r\n\r\n\r\n</nz-card>\r\n",
        styles: ["[nz-button]{margin-bottom:12px;margin-right:8px}"]
    })
], CardComponent);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
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

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const isImageFileType = (type) => !!type && type.indexOf('image/') === 0;
const ɵ0$1 = isImageFileType;
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

let RenderPipe = class RenderPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value, row, columnCode, render = function (row, columnCode) { return ""; }) {
        return this.sanitizer.bypassSecurityTrustHtml(render(row, columnCode));
    }
};
RenderPipe = __decorate([
    Pipe({
        name: 'renderPipe'
    })
], RenderPipe);

// let _ = require("lodash");
let TablePipe = class TablePipe {
    transform(value, items) {
        value = value + '';
        if (items && items.length >= 0) {
            if (!_.isEmpty(value)) {
                let valueArr = value.split(',');
                let resultArr = new Array();
                for (let n = 0; n < valueArr.length; n++) {
                    for (let i = 0; i < items.length; i++) {
                        if (valueArr[n] == items[i].code + '') {
                            resultArr.push(items[i].label);
                            break;
                        }
                    }
                }
                return resultArr.join(",");
            }
            else {
                return "";
            }
        }
        else {
            return value;
        }
    }
};
TablePipe = __decorate([
    Pipe({
        name: 'tablePipe'
    })
], TablePipe);

const thirdComponents = [
    DroppableComponent,
    CardComponent,
    TableColumnsButtonsComponent,
    TableComponent,
    UploadBtnComponent,
    UploadListComponent,
    UploadComponent,
    LoadingComponent,
    FileCheckComponent
];
const thirdModule = [
    NzCardModule,
    NzIconModule,
    NzTabsModule,
    NzButtonModule,
    NzDividerModule,
    NzTableModule,
    NzSpinModule,
    NzCheckboxModule,
    NzRadioModule,
    NzProgressModule,
    NzEmptyModule
];
var pipe_lists = [
    RenderPipe,
    TablePipe,
];
registerLocaleData(en);
const icons = [AccountBookFill, AlertOutline, AlertFill];
let NgZoesModule = class NgZoesModule {
};
NgZoesModule = __decorate([
    NgModule({
        declarations: [...thirdComponents, ...pipe_lists,],
        imports: [
            CommonModule,
            NzI18nModule,
            LocaleModule,
            HttpClientModule,
            OverlayModule,
            BrowserAnimationsModule,
            FormsModule,
            NzIconModule.forRoot(icons),
            SortablejsModule.forRoot({ animation: 150 }),
            ...thirdModule,
        ],
        providers: [NzModalService$1],
        entryComponents: [LoadingComponent, FileCheckComponent],
        exports: [...thirdComponents]
    })
], NgZoesModule);

// 国际化

let TableService = class TableService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    patchHero(url, params) {
        return this.httpClient.request('GET', url, params);
    }
};
TableService.ɵprov = ɵɵdefineInjectable({ factory: function TableService_Factory() { return new TableService(ɵɵinject(HttpClient)); }, token: TableService, providedIn: "root" });
TableService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TableService);

let FilesServiceService = class FilesServiceService {
    constructor() {
        this.compress = (file, quality, convertSize) => __awaiter(this, void 0, void 0, function* () {
            if (!/image\/\w+/.test(file.type)) {
                return false;
            }
            if (file.size < convertSize) {
                return false;
            }
            // 进行图片压缩
            return new Promise((resolve, reject) => {
                new ImageCompressor().compress(file, {
                    quality: quality,
                    maxWidth: 1000,
                    maxHeight: 1000,
                    convertSize: 614400,
                    success(result) {
                        resolve(new File([result], file.name, { type: file.type }));
                    },
                    error(e) {
                        reject(e);
                    }
                });
            });
        });
    }
};
FilesServiceService.ɵprov = ɵɵdefineInjectable({ factory: function FilesServiceService_Factory() { return new FilesServiceService(); }, token: FilesServiceService, providedIn: "root" });
FilesServiceService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FilesServiceService);

/**
 * Generated bundle index. Do not edit.
 */

export { ComponentsService, DroppableComponent, FileViewService, LOCALE_SERVICE_PROVIDER, LOCALE_SERVICE_PROVIDER_FACTORY, LoadingService, LocaleModule, LocaleService, NgZoesModule, NzShowUploadListInterface, TableColumnsButtonsComponent, TableComponent, UploadComponent, ZOE_LOCALE, enUS as en_US, zhCN as zh_CN, zhTW as zh_TW, ɵ0, TableService as ɵa, CardComponent as ɵb, UploadBtnComponent as ɵc, FilesServiceService as ɵd, UploadListComponent as ɵe, LoadingComponent as ɵf, FileCheckComponent as ɵg, RenderPipe as ɵh, TablePipe as ɵi };
//# sourceMappingURL=ng-zoes.js.map
