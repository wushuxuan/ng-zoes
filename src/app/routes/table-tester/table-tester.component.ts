import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from 'ng-zoes';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { LocaleService,zh_TW } from 'ng-zoes';

@Component({
  selector: 'app-table-tester',
  templateUrl: './table-tester.component.html',
  styleUrls: ['./table-tester.component.less']
})
export class TableTesterComponent implements OnInit {
  @ViewChild('zt', { static: false }) zt: TableComponent;

  // loading:boolean = false;
  url: any = "/api/seventeen/note/list"
  total: any;
  ps = 10; //(limit)
  pi = 1;//(offset)
  req: any = {
    params: {
      //除去分页之外的参数
      // pageSize:20,
      // pageNo:0,
    },
    reName:{ pi: 'pageNo', ps: 'pageSize' }
  }
  page: any = {
    /**
     * 前端分页，当 `data` 为`any[]` 或 `Observable<any[]>` 有效，默认：`true`
     * - `true` 由 `st` 根据 `data` 长度受控分页，包括：排序、过滤等
     * - `false` 由用户通过 `total` 和 `data` 参数受控分页，并维护 `(change)` 当分页变更时重新加载数据
     */
    front: false,
    zeroIndexed: false,//后端分页是否采用`0`基索引，只在`data`类型为`string`时有效，默认：`false`
    position: 'bottom',//指定分页显示的位置，默认：`bottom`
    placement: 'right',//'left' | 'center' | 'right';  指定分页分页方向
    show: true,  //是否显示分页器，默认：`true`
    showSize: true, //是否显示分页器中改变页数，默认：`false`
    pageSizes: [10, 20, 30, 40, 50], //分页器中每页显示条目数下拉框值，默认：`[10, 20, 30, 40, 50]`
    showQuickJumper: true, //是否显示分页器中快速跳转，默认：`false`
    /**
     * 是否显示总数据量
     * - `boolean` 类型显示与否，默认模板：`共 {{total}} 条`
     * - `string` 自定义模板，模板变量：
     *  - `{{total}}` 表示数据总量
     *  - `{{range[0]}}` 表示当前页开始数量值
     *  - `{{range[1]}}` 表示当前页结束数量值
     */
    total: true,
    // toTop: true,  //切换分页时返回顶部，默认：`true`
    // toTopOffset: 100,  //返回顶部偏移值，默认：`100`
  }
  // scroll:any ={y:'600px'}
  //数据
  dataSet: any = [];

  PICKTYPES = [
    { "code": 1, "label": "进行中" },
    { "code": 0, "label": "已完成" }
  ];


  //列表展示列
  columns: any = [
    {
      text: '编号',
      index: 'code',
      type: 'checkbox'   //'radio','checkbox','img'
    },
    {
      text: '标题',
      index: 'note_title',
      click: (item, i) => console.log(item)
    },
    {
      text: '内容',  //特定宽度超出  文字省略(ellipsis),跨行显示(workspace)
      width: 200,
      index: 'note_content',
    },
    {
      text: 'format自定义内容',
      index: 'flag',
      render: (item, i) => {
        return item['flag'] ? "<span style='color:green'>是</span>" : "<span style='color:red'>否</span>";
      }
    },
    {
      text: '操作',
      width: 90,
      buttonType: 'link', //button  or  link
      buttons: [
        {
          text: '查看',
          type: 'primary',
          permission: (item: any, i: string) => {
            if (item.status == 1) {
              return false;
            } else {
              return true;
            }
          },
          click: (item: any, i: string) => console.log("查看" + item)
        },
        {
          text: '编辑',
          type: 'primary',
          click: (item: any, i: string) => console.log("编辑" + item)
        },
        {
          text: '删除',
          type: 'danger',
          permission: (item: any, i: string) => {
            if (item.status == 1) {
              return true;
            } else {
              return false;
            }
          },
          click: (item: any, i: string) => console.log("删除" + item)
        },

      ]
    },
  ];
  checkBox: any = [];

  //表格按鈕数组
  operators = [
    {
      type: 'primary',
      text: '新增',
      // hidden: this.checkBox.length,
      click: () => console.log("新增按钮")
    },
    {
      type: 'danger',
      text: '删除',
      hidden: !this.checkBox.length,   //hidden不赋值相当于  hidden:false,
      click: () => console.log("删除按钮")
    },
    {
      type: 'default',
      text: '编辑',
      hidden: !this.checkBox.length,
      click: () => console.log("编辑按钮")
    },
  ];

  constructor() { 
  }

  ngOnInit(): void {
    
  }

  change(e: any) {
    console.log("反馈：")
    console.log(e)
    if (e['type'] == "loaded") {
      if (e.loaded) {
        this.zt.setData(e.loaded.data.res,e.loaded.data.total)
        this.total = e.loaded.data.total;
      }
    }
    if (e['type'] == "checkbox" || e['type'] == 'radio') {
      this.checkBox = e[e['type']]
      this.operators = [
        {
          type: 'primary',
          text: '新增',
          // hidden: this.checkBox.length,
          click: () => console.log("新增按钮")
        },
        {
          type: 'danger',
          text: '删除',
          hidden: !this.checkBox.length,   //hidden不赋值相当于  hidden:false,
          click: () => {
            console.log("删除按钮")
            console.log(this.checkBox)
          }
        },
        {
          type: 'default',
          text: '编辑',
          hidden: !this.checkBox.length,
          click: () => console.log("编辑按钮")
        },
      ];
    }
    if (e['type'] == "pi" || e['type'] == "ps") {
      this.req = {
        params: {
          pageNo: (e['pi']-1)*e['ps'],
          pageSize: e['ps']
        }
      }
    }
  }

}
