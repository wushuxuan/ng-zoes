import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {LocaleService} from './../../theme/locale.service';
import {
  STChange,
  STChangeType,
  STColumn,
  STColumnButton,
  STColumnFilterMenu,
  STColumnSelection,
  STData,
  STError,
  STExportOptions,
  STLoadOptions,
  STMultiSort,
  STPage,
  STReq,
  STRes,
  STResetColumnsOption,
  STRowClassName,
  STSingleSort,
  STStatisticalResults,
  STWidthMode,
} from './table.interface';
import { TableService } from './table.service';
import { NzTableComponent } from 'ng-zorro-antd';

@Component({
  selector: 'zt',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.styl']
})
export class TableComponent implements OnInit {

  //静态数据源
  @Input() data: any;
  @Input() columns: STColumn[] = [];
  @Input() ps = 10; //每页展示多少数据，可双向绑定
  @Input() pi = 1;//当前页码，可双向绑定
  @Input() total: any;
  @Input() loading: boolean | null = null;
  @Input() scroll: { y?: string; x?: string };

  //请求接口获取数据源
  @Input() url: string;
  @Input() req: STReq;
  @Input() page: STPage;

  @Input() operators: any;

  @Output() readonly change = new EventEmitter<STChange>();
  //样式
  @Input() bordered: boolean = false;

  @ViewChild('table', { static: false }) readonly orgTable: NzTableComponent;


  _allChecked = false;
  _allCheckedDisabled = false;
  _indeterminate = false;

  private totalTpl = ``;

  //分页
  _isPagination = true; //是否显示分页器
  _isSizeChanger = false//是否可以改变 nzPageSize
  _isQuickJumper = false; //是否可以快速跳转至某页
  _isPageSizeOptions = [10, 20, 30, 40, 50]   //页数选择器可选值
  _isOnSinglePage = false;  //只有一页时是否隐藏分页器
  _paginationPosition = 'bottom'; //指定分页显示的位置   'top' | 'bottom' | 'both'
  _frontPagination = true //是否在前端对数据进行分页(data=>true,)，如果在服务器分页数据或者需要在前端显示全部数据时传入 false

  //local
  local:any;
  _data:any = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private servie: TableService,
    private locale:LocaleService,
  ) { 
    this.local = this.locale.getData('zt') 
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log(changes);
    
    if (changes['url'] || changes['req'] || changes['pi'] || changes['ps']) {
      // this._frontPagination = false;
      this._loadData(this.url, this.req);
    }else if(changes['data']){
      this._showData(changes['data'].currentValue)
    }
    if (changes['loading']) {
      // console.log("loading change")
    }
    if (changes['operators']) {
      this._changeOperator(changes['operators'].currentValue)
    }
    
    if (changes['page']) {
      this.updateTotalTpl();
      this._changePage(changes['page'].currentValue);
    }
  }

  private _refCheck() {
    // console.log(this._data);
    // console.log(this.ps);
    const validData = this._data.filter(w => !w.disabled);
    const checkedList = validData.filter(w => w.checked === true);
    console.log(checkedList);
    this._allChecked = checkedList.length > 0 && checkedList.length === validData.length;
    const allUnChecked = validData.every(value => !value.checked);
    this._indeterminate = !this._allChecked && !allUnChecked;
    console.log("_indeterminate:"+this._indeterminate);
    
    this._allCheckedDisabled = this._data.length === this._data.filter(w => w.disabled).length;
    return this.cd();
  }


  cd() {
    this.cdr.detectChanges();
    return this;
  }

  private updateTotalTpl(): void {
    const { total } = this.page;
    if (typeof total === 'string' && total.length) {
      this.totalTpl = total;
    } else if (this.toBoolean(total)) {
      this.totalTpl = this.local.total;
    } else {
      this.totalTpl = '';
    }
  }

  toBoolean(value: any, allowUndefined: boolean | null = false): boolean | undefined {
    return allowUndefined && typeof value === 'undefined' ? undefined : value != null && `${value}` !== 'false';
  }

  _checkNotify(): this {
    const res = this._data.filter(w => !w.disabled && w.checked === true);
    console.log(res);
    
    this.changeEmit('checkbox', res);
    return this;
  }

  _checkAll(checked: boolean, item: STData) {
    checked = typeof checked === 'undefined' ? this._allChecked : checked;
    this._data.filter(w => !w.disabled).forEach(i => (i.checked = checked));
    return this._refCheck()._checkNotify();
  }

  //单选
  _checkSelection(i: STData, value: boolean) {
    i.checked = value;
    return this._refCheck()._checkNotify();
  }

  _refRadio(checked: boolean, item: STData): this {
    this._data.filter(w => !w.disabled).forEach(i => (i.checked = false));
    item.checked = checked;
    this.changeEmit('radio', item);
    return this;
  }

  _changeOperator(operators) {
    const filterOperators = [];//过滤隐藏的按钮
    if (operators && operators.length > 0) {
      operators.forEach((data) => {
        data['hidden'] ? null : filterOperators.push(data);
      });
      this.operators = filterOperators;
    }
  }

  _changePage(page) {
    this._frontPagination = page.front
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

  _showData(data){
    this._data = data;
    this.total = this.total?this.total:data.length
  }

  _loadData(url, req) {
    if(!url){
      return ;
    }

    if (req['reName']) {
      req.params[req['reName']['pi']] = this.pi - 1
      req.params[req['reName']['ps']] = this.ps
    }
    this.loading = true;
    this.servie.patchHero(url, req).subscribe((res) => {
      this._data = res;
      this.loading = false;
      this.changeEmit('loaded', res);
      return this._refCheck()._checkNotify();
    }, ((error) => { this.loading = false; }))
  }

  _rowClick(e: Event, item: STData, index: number) {
    if ((e.target as HTMLElement).nodeName === 'INPUT') return;
    const data = { e, item, index };
    this.changeEmit('click', data);
  }

  setData(list,total) {
    this._data = list //重新赋值
    this.total = total
  }

  private changeEmit(type: STChangeType, data?: any) {
    // console.log(data);
    
    const res: STChange = {
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


  renderTotal(total: string, range: string[]) {
    return this.totalTpl
      ? this.totalTpl.replace('{{total}}', this.total?this.total : total).replace('{{range[0]}}', range[0]).replace('{{range[1]}}', range[1])
      : '';
  }


}
