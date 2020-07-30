import { __decorate } from "tslib";
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
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
export { TableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctem9lcy9saWIvY29tcG9uZW50cy90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQWlDNUgsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQTRDekIsWUFDVSxHQUFzQixFQUN0QixNQUFvQixFQUNwQixNQUFvQjtRQUZwQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQWM7UUEzQ3JCLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFDekIsT0FBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQjtRQUN6QixPQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUEsWUFBWTtRQUVuQixZQUFPLEdBQW1CLElBQUksQ0FBQztRQVVyQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUN6RCxJQUFJO1FBQ0ssYUFBUSxHQUFZLEtBQUssQ0FBQztRQUtuQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQix3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDNUIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFZixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBRXRCLElBQUk7UUFDSixrQkFBYSxHQUFHLElBQUksQ0FBQyxDQUFDLFNBQVM7UUFDL0IsbUJBQWMsR0FBRyxLQUFLLENBQUEsQ0FBQSxtQkFBbUI7UUFDekMsbUJBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyxhQUFhO1FBQ3JDLHVCQUFrQixHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUs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NkNBQVk7QUFDWDtJQUFSLEtBQUssRUFBRTsrQ0FBZ0M7QUFDL0I7SUFBUixLQUFLLEVBQUU7OENBQW9DO0FBR25DO0lBQVIsS0FBSyxFQUFFOzJDQUFhO0FBQ1o7SUFBUixLQUFLLEVBQUU7MkNBQVk7QUFDWDtJQUFSLEtBQUssRUFBRTs0Q0FBYztBQUViO0lBQVIsS0FBSyxFQUFFO2lEQUFnQjtBQUVkO0lBQVQsTUFBTSxFQUFFOzhDQUFnRDtBQUVoRDtJQUFSLEtBQUssRUFBRTtnREFBMkI7QUFFSTtJQUF0QyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO2dEQUFxQztBQXRCaEUsY0FBYztJQUwxQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsSUFBSTtRQUNkLDBxSUFBcUM7O0tBRXRDLENBQUM7R0FDVyxjQUFjLENBc08xQjtTQXRPWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3RvclJlZiwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge0xvY2FsZVNlcnZpY2V9IGZyb20gJy4vLi4vLi4vdGhlbWUvbG9jYWxlLnNlcnZpY2UnO1xyXG5pbXBvcnQge1xyXG4gIFNUQ2hhbmdlLFxyXG4gIFNUQ2hhbmdlVHlwZSxcclxuICBTVENvbHVtbixcclxuICBTVENvbHVtbkJ1dHRvbixcclxuICBTVENvbHVtbkZpbHRlck1lbnUsXHJcbiAgU1RDb2x1bW5TZWxlY3Rpb24sXHJcbiAgU1REYXRhLFxyXG4gIFNURXJyb3IsXHJcbiAgU1RFeHBvcnRPcHRpb25zLFxyXG4gIFNUTG9hZE9wdGlvbnMsXHJcbiAgU1RNdWx0aVNvcnQsXHJcbiAgU1RQYWdlLFxyXG4gIFNUUmVxLFxyXG4gIFNUUmVzLFxyXG4gIFNUUmVzZXRDb2x1bW5zT3B0aW9uLFxyXG4gIFNUUm93Q2xhc3NOYW1lLFxyXG4gIFNUU2luZ2xlU29ydCxcclxuICBTVFN0YXRpc3RpY2FsUmVzdWx0cyxcclxuICBTVFdpZHRoTW9kZSxcclxufSBmcm9tICcuL3RhYmxlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRhYmxlU2VydmljZSB9IGZyb20gJy4vdGFibGUuc2VydmljZSc7XHJcbmltcG9ydCB7IE56VGFibGVDb21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnenQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUuY29tcG9uZW50LnN0eWwnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAvL+mdmeaAgeaVsOaNrua6kFxyXG4gIEBJbnB1dCgpIGRhdGE6IGFueTtcclxuICBASW5wdXQoKSBjb2x1bW5zOiBTVENvbHVtbltdID0gW107XHJcbiAgQElucHV0KCkgcHMgPSAxMDsgLy/mr4/pobXlsZXnpLrlpJrlsJHmlbDmja7vvIzlj6/lj4zlkJHnu5HlrppcclxuICBASW5wdXQoKSBwaSA9IDE7Ly/lvZPliY3pobXnoIHvvIzlj6/lj4zlkJHnu5HlrppcclxuICBASW5wdXQoKSB0b3RhbDogYW55O1xyXG4gIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW4gfCBudWxsID0gbnVsbDtcclxuICBASW5wdXQoKSBzY3JvbGw6IHsgeT86IHN0cmluZzsgeD86IHN0cmluZyB9O1xyXG5cclxuICAvL+ivt+axguaOpeWPo+iOt+WPluaVsOaNrua6kFxyXG4gIEBJbnB1dCgpIHVybDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHJlcTogU1RSZXE7XHJcbiAgQElucHV0KCkgcGFnZTogU1RQYWdlO1xyXG5cclxuICBASW5wdXQoKSBvcGVyYXRvcnM6IGFueTtcclxuXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8U1RDaGFuZ2U+KCk7XHJcbiAgLy/moLflvI9cclxuICBASW5wdXQoKSBib3JkZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAVmlld0NoaWxkKCd0YWJsZScsIHsgc3RhdGljOiBmYWxzZSB9KSByZWFkb25seSBvcmdUYWJsZTogTnpUYWJsZUNvbXBvbmVudDtcclxuXHJcblxyXG4gIF9hbGxDaGVja2VkID0gZmFsc2U7XHJcbiAgX2FsbENoZWNrZWREaXNhYmxlZCA9IGZhbHNlO1xyXG4gIF9pbmRldGVybWluYXRlID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgdG90YWxUcGwgPSBgYDtcclxuXHJcbiAgLy/liIbpobVcclxuICBfaXNQYWdpbmF0aW9uID0gdHJ1ZTsgLy/mmK/lkKbmmL7npLrliIbpobXlmahcclxuICBfaXNTaXplQ2hhbmdlciA9IGZhbHNlLy/mmK/lkKblj6/ku6XmlLnlj5ggbnpQYWdlU2l6ZVxyXG4gIF9pc1F1aWNrSnVtcGVyID0gZmFsc2U7IC8v5piv5ZCm5Y+v5Lul5b+r6YCf6Lez6L2s6Iez5p+Q6aG1XHJcbiAgX2lzUGFnZVNpemVPcHRpb25zID0gWzEwLCAyMCwgMzAsIDQwLCA1MF0gICAvL+mhteaVsOmAieaLqeWZqOWPr+mAieWAvFxyXG4gIF9pc09uU2luZ2xlUGFnZSA9IGZhbHNlOyAgLy/lj6rmnInkuIDpobXml7bmmK/lkKbpmpDol4/liIbpobXlmahcclxuICBfcGFnaW5hdGlvblBvc2l0aW9uID0gJ2JvdHRvbSc7IC8v5oyH5a6a5YiG6aG15pi+56S655qE5L2N572uICAgJ3RvcCcgfCAnYm90dG9tJyB8ICdib3RoJ1xyXG4gIF9mcm9udFBhZ2luYXRpb24gPSB0cnVlIC8v5piv5ZCm5Zyo5YmN56uv5a+55pWw5o2u6L+b6KGM5YiG6aG1KGRhdGE9PnRydWUsKe+8jOWmguaenOWcqOacjeWKoeWZqOWIhumhteaVsOaNruaIluiAhemcgOimgeWcqOWJjeerr+aYvuekuuWFqOmDqOaVsOaNruaXtuS8oOWFpSBmYWxzZVxyXG5cclxuICAvL2xvY2FsXHJcbiAgbG9jYWw6YW55O1xyXG4gIF9kYXRhOmFueSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgc2VydmllOiBUYWJsZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvY2FsZTpMb2NhbGVTZXJ2aWNlLFxyXG4gICkgeyBcclxuICAgIHRoaXMubG9jYWwgPSB0aGlzLmxvY2FsZS5nZXREYXRhKCd6dCcpIFxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAvL0NhbGxlZCBiZWZvcmUgYW55IG90aGVyIGxpZmVjeWNsZSBob29rLiBVc2UgaXQgdG8gaW5qZWN0IGRlcGVuZGVuY2llcywgYnV0IGF2b2lkIGFueSBzZXJpb3VzIHdvcmsgaGVyZS5cclxuICAgIC8vQWRkICcke2ltcGxlbWVudHMgT25DaGFuZ2VzfScgdG8gdGhlIGNsYXNzLlxyXG4gICAgLy8gY29uc29sZS5sb2coY2hhbmdlcyk7XHJcbiAgICBcclxuICAgIGlmIChjaGFuZ2VzWyd1cmwnXSB8fCBjaGFuZ2VzWydyZXEnXSB8fCBjaGFuZ2VzWydwaSddIHx8IGNoYW5nZXNbJ3BzJ10pIHtcclxuICAgICAgLy8gdGhpcy5fZnJvbnRQYWdpbmF0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX2xvYWREYXRhKHRoaXMudXJsLCB0aGlzLnJlcSk7XHJcbiAgICB9ZWxzZSBpZihjaGFuZ2VzWydkYXRhJ10pe1xyXG4gICAgICB0aGlzLl9zaG93RGF0YShjaGFuZ2VzWydkYXRhJ10uY3VycmVudFZhbHVlKVxyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ2xvYWRpbmcnXSkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcImxvYWRpbmcgY2hhbmdlXCIpXHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snb3BlcmF0b3JzJ10pIHtcclxuICAgICAgdGhpcy5fY2hhbmdlT3BlcmF0b3IoY2hhbmdlc1snb3BlcmF0b3JzJ10uY3VycmVudFZhbHVlKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAoY2hhbmdlc1sncGFnZSddKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlVG90YWxUcGwoKTtcclxuICAgICAgdGhpcy5fY2hhbmdlUGFnZShjaGFuZ2VzWydwYWdlJ10uY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlZkNoZWNrKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5fZGF0YSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnBzKTtcclxuICAgIGNvbnN0IHZhbGlkRGF0YSA9IHRoaXMuX2RhdGEuZmlsdGVyKHcgPT4gIXcuZGlzYWJsZWQpO1xyXG4gICAgY29uc3QgY2hlY2tlZExpc3QgPSB2YWxpZERhdGEuZmlsdGVyKHcgPT4gdy5jaGVja2VkID09PSB0cnVlKTtcclxuICAgIGNvbnNvbGUubG9nKGNoZWNrZWRMaXN0KTtcclxuICAgIHRoaXMuX2FsbENoZWNrZWQgPSBjaGVja2VkTGlzdC5sZW5ndGggPiAwICYmIGNoZWNrZWRMaXN0Lmxlbmd0aCA9PT0gdmFsaWREYXRhLmxlbmd0aDtcclxuICAgIGNvbnN0IGFsbFVuQ2hlY2tlZCA9IHZhbGlkRGF0YS5ldmVyeSh2YWx1ZSA9PiAhdmFsdWUuY2hlY2tlZCk7XHJcbiAgICB0aGlzLl9pbmRldGVybWluYXRlID0gIXRoaXMuX2FsbENoZWNrZWQgJiYgIWFsbFVuQ2hlY2tlZDtcclxuICAgIGNvbnNvbGUubG9nKFwiX2luZGV0ZXJtaW5hdGU6XCIrdGhpcy5faW5kZXRlcm1pbmF0ZSk7XHJcbiAgICBcclxuICAgIHRoaXMuX2FsbENoZWNrZWREaXNhYmxlZCA9IHRoaXMuX2RhdGEubGVuZ3RoID09PSB0aGlzLl9kYXRhLmZpbHRlcih3ID0+IHcuZGlzYWJsZWQpLmxlbmd0aDtcclxuICAgIHJldHVybiB0aGlzLmNkKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY2QoKSB7XHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlVG90YWxUcGwoKTogdm9pZCB7XHJcbiAgICBjb25zdCB7IHRvdGFsIH0gPSB0aGlzLnBhZ2U7XHJcbiAgICBpZiAodHlwZW9mIHRvdGFsID09PSAnc3RyaW5nJyAmJiB0b3RhbC5sZW5ndGgpIHtcclxuICAgICAgdGhpcy50b3RhbFRwbCA9IHRvdGFsO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvQm9vbGVhbih0b3RhbCkpIHtcclxuICAgICAgdGhpcy50b3RhbFRwbCA9IHRoaXMubG9jYWwudG90YWw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRvdGFsVHBsID0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b0Jvb2xlYW4odmFsdWU6IGFueSwgYWxsb3dVbmRlZmluZWQ6IGJvb2xlYW4gfCBudWxsID0gZmFsc2UpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiBhbGxvd1VuZGVmaW5lZCAmJiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogdmFsdWUgIT0gbnVsbCAmJiBgJHt2YWx1ZX1gICE9PSAnZmFsc2UnO1xyXG4gIH1cclxuXHJcbiAgX2NoZWNrTm90aWZ5KCk6IHRoaXMge1xyXG4gICAgY29uc3QgcmVzID0gdGhpcy5fZGF0YS5maWx0ZXIodyA9PiAhdy5kaXNhYmxlZCAmJiB3LmNoZWNrZWQgPT09IHRydWUpO1xyXG4gICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgIFxyXG4gICAgdGhpcy5jaGFuZ2VFbWl0KCdjaGVja2JveCcsIHJlcyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIF9jaGVja0FsbChjaGVja2VkOiBib29sZWFuLCBpdGVtOiBTVERhdGEpIHtcclxuICAgIGNoZWNrZWQgPSB0eXBlb2YgY2hlY2tlZCA9PT0gJ3VuZGVmaW5lZCcgPyB0aGlzLl9hbGxDaGVja2VkIDogY2hlY2tlZDtcclxuICAgIHRoaXMuX2RhdGEuZmlsdGVyKHcgPT4gIXcuZGlzYWJsZWQpLmZvckVhY2goaSA9PiAoaS5jaGVja2VkID0gY2hlY2tlZCkpO1xyXG4gICAgcmV0dXJuIHRoaXMuX3JlZkNoZWNrKCkuX2NoZWNrTm90aWZ5KCk7XHJcbiAgfVxyXG5cclxuICAvL+WNlemAiVxyXG4gIF9jaGVja1NlbGVjdGlvbihpOiBTVERhdGEsIHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpLmNoZWNrZWQgPSB2YWx1ZTtcclxuICAgIHJldHVybiB0aGlzLl9yZWZDaGVjaygpLl9jaGVja05vdGlmeSgpO1xyXG4gIH1cclxuXHJcbiAgX3JlZlJhZGlvKGNoZWNrZWQ6IGJvb2xlYW4sIGl0ZW06IFNURGF0YSk6IHRoaXMge1xyXG4gICAgdGhpcy5fZGF0YS5maWx0ZXIodyA9PiAhdy5kaXNhYmxlZCkuZm9yRWFjaChpID0+IChpLmNoZWNrZWQgPSBmYWxzZSkpO1xyXG4gICAgaXRlbS5jaGVja2VkID0gY2hlY2tlZDtcclxuICAgIHRoaXMuY2hhbmdlRW1pdCgncmFkaW8nLCBpdGVtKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgX2NoYW5nZU9wZXJhdG9yKG9wZXJhdG9ycykge1xyXG4gICAgY29uc3QgZmlsdGVyT3BlcmF0b3JzID0gW107Ly/ov4fmu6TpmpDol4/nmoTmjInpkq5cclxuICAgIGlmIChvcGVyYXRvcnMgJiYgb3BlcmF0b3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgb3BlcmF0b3JzLmZvckVhY2goKGRhdGEpID0+IHtcclxuICAgICAgICBkYXRhWydoaWRkZW4nXSA/IG51bGwgOiBmaWx0ZXJPcGVyYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMub3BlcmF0b3JzID0gZmlsdGVyT3BlcmF0b3JzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2NoYW5nZVBhZ2UocGFnZSkge1xyXG4gICAgdGhpcy5fZnJvbnRQYWdpbmF0aW9uID0gcGFnZS5mcm9udFxyXG4gICAgdGhpcy5faXNQYWdlU2l6ZU9wdGlvbnMgPSBwYWdlLnBhZ2VTaXplcztcclxuICAgIHRoaXMuX3BhZ2luYXRpb25Qb3NpdGlvbiA9IHBhZ2UucG9zaXRpb247XHJcbiAgICB0aGlzLl9pc1BhZ2luYXRpb24gPSBwYWdlLnNob3c7XHJcbiAgICB0aGlzLl9pc1F1aWNrSnVtcGVyID0gcGFnZS5zaG93UXVpY2tKdW1wZXI7XHJcbiAgICB0aGlzLl9pc1NpemVDaGFuZ2VyID0gcGFnZS5zaG93U2l6ZTtcclxuICB9XHJcblxyXG4gIF9wYWdlSW5kZXhDaGFuZ2UocGkpIHtcclxuICAgIHRoaXMucGkgPSBwaTtcclxuICAgIHRoaXMuX2FsbENoZWNrZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuY2hhbmdlRW1pdCgncGknLCBwaSk7XHJcbiAgfVxyXG5cclxuICBfcGFnZVNpemVDaGFuZ2UocHMpIHtcclxuICAgIHRoaXMucGkgPSAxO1xyXG4gICAgdGhpcy5wcyA9IHBzO1xyXG4gICAgdGhpcy5jaGFuZ2VFbWl0KCdwcycsIHBzKTtcclxuICB9XHJcblxyXG4gIF9zaG93RGF0YShkYXRhKXtcclxuICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgdGhpcy50b3RhbCA9IHRoaXMudG90YWw/dGhpcy50b3RhbDpkYXRhLmxlbmd0aFxyXG4gIH1cclxuXHJcbiAgX2xvYWREYXRhKHVybCwgcmVxKSB7XHJcbiAgICBpZighdXJsKXtcclxuICAgICAgcmV0dXJuIDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVxWydyZU5hbWUnXSkge1xyXG4gICAgICByZXEucGFyYW1zW3JlcVsncmVOYW1lJ11bJ3BpJ11dID0gdGhpcy5waSAtIDFcclxuICAgICAgcmVxLnBhcmFtc1tyZXFbJ3JlTmFtZSddWydwcyddXSA9IHRoaXMucHNcclxuICAgIH1cclxuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICB0aGlzLnNlcnZpZS5wYXRjaEhlcm8odXJsLCByZXEpLnN1YnNjcmliZSgocmVzKSA9PiB7XHJcbiAgICAgIHRoaXMuX2RhdGEgPSByZXM7XHJcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNoYW5nZUVtaXQoJ2xvYWRlZCcsIHJlcyk7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZWZDaGVjaygpLl9jaGVja05vdGlmeSgpO1xyXG4gICAgfSwgKChlcnJvcikgPT4geyB0aGlzLmxvYWRpbmcgPSBmYWxzZTsgfSkpXHJcbiAgfVxyXG5cclxuICBfcm93Q2xpY2soZTogRXZlbnQsIGl0ZW06IFNURGF0YSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkubm9kZU5hbWUgPT09ICdJTlBVVCcpIHJldHVybjtcclxuICAgIGNvbnN0IGRhdGEgPSB7IGUsIGl0ZW0sIGluZGV4IH07XHJcbiAgICB0aGlzLmNoYW5nZUVtaXQoJ2NsaWNrJywgZGF0YSk7XHJcbiAgfVxyXG5cclxuICBzZXREYXRhKGxpc3QsdG90YWwpIHtcclxuICAgIHRoaXMuX2RhdGEgPSBsaXN0IC8v6YeN5paw6LWL5YC8XHJcbiAgICB0aGlzLnRvdGFsID0gdG90YWxcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hhbmdlRW1pdCh0eXBlOiBTVENoYW5nZVR5cGUsIGRhdGE/OiBhbnkpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgXHJcbiAgICBjb25zdCByZXM6IFNUQ2hhbmdlID0ge1xyXG4gICAgICB0eXBlLFxyXG4gICAgICBwaTogdGhpcy5waSxcclxuICAgICAgcHM6IHRoaXMucHMsXHJcbiAgICAgIHRvdGFsOiB0aGlzLnRvdGFsLFxyXG4gICAgfTtcclxuICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgcmVzW3R5cGVdID0gZGF0YTtcclxuICAgIH1cclxuICAgIHRoaXMuY2hhbmdlLmVtaXQocmVzKTtcclxuICB9XHJcblxyXG5cclxuICByZW5kZXJUb3RhbCh0b3RhbDogc3RyaW5nLCByYW5nZTogc3RyaW5nW10pIHtcclxuICAgIHJldHVybiB0aGlzLnRvdGFsVHBsXHJcbiAgICAgID8gdGhpcy50b3RhbFRwbC5yZXBsYWNlKCd7e3RvdGFsfX0nLCB0aGlzLnRvdGFsP3RoaXMudG90YWwgOiB0b3RhbCkucmVwbGFjZSgne3tyYW5nZVswXX19JywgcmFuZ2VbMF0pLnJlcGxhY2UoJ3t7cmFuZ2VbMV19fScsIHJhbmdlWzFdKVxyXG4gICAgICA6ICcnO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiJdfQ==