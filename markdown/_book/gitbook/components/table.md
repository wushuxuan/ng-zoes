<h1>zt 表格</h1>

### 关于数据源
data 支持俩种不同获取数据源的方式，整体分为：URL和静态数据两类.

### 如何使用


```ts
<zt [data]="dataSet" [columns]="columns" [operators]="operators" [bordered]=true (change)="change($event)"></zt>
```

### Api
| 参数        | 说明           | 类型  |默认值  |
| ------------- |:-------------:| -----:|-----:|
| `[data]`     | 数据数组 | `any[]` | - |
| `[pi]` | 当前页码 | `number` | `1` |
| `[ps]` | 每页数量，当设置为 `0` 表示不分页，默认：`10` | `number` | `10` |
| `[page]` | 分页器配置 | `STPage` | - |
| `[total]` | 当前总数据，在服务器渲染时需要传入，默认：`0` | `number` | `0` |
| `[columns]`      | 列描述      |   `any[]` |  - |
| `[operators]` | table顶部操作按钮组     |    `any[]` | - |
| `[bordered]`     | 是否显示边框 | `boolean` | false |
| `(change)`     | 变化时回调，包括：pi、ps、checkbox、radio、sort、filter、click、dblClick、expand 变动 | `EventEmitter<STChange>` | - |
| `[loading]`	| 页面是否加载中，当指定 null 由 zt 受控	| `boolean or null` |	`null` |
| `[scroll]`	| 横向或纵向支持滚动，也可用于指定滚动区域的宽高度：`{ x: "300px", y: "300px" }` | `{ y?: string; x?: string }` | - |

#### STPage
| 参数        | 说明           | 类型  |默认值  |
| ------------- |:-------------:| -----:|-----:|
|`front`|前端分页， `true` 由 `st` 根据 `data` 长度受控分页，包括：排序、过滤等；`false` 由用户通过 `url` 参数受控分页，并维护 `(change)` 当分页变更时重新加载数据|`boolean` | false |
|`show`|是否显示分页器，默认：`true`|`boolean` | true |  
|`showSize`|是否显示分页器中改变页数，默认：`false`|`boolean` | false |  
|`pageSizes`|分页器中每页显示条目数下拉框值，默认：`[10, 20, 30, 40, 50]`|`any[]` |  [10, 20, 30, 40, 50] |  
|`showQuickJumper`|是否显示分页器中快速跳转，默认：`false`|`boolean` | false |  
|`total`|是否显示总数据量,默认模板：`共 {{total}} 条`|`boolean` | false |  
<!-- |`zeroIndexed`|后端分页是否采用`0`基索引，只在`data`类型为`string`时有效，默认：`false`|`boolean` | false | -->


### 代码演示

#### 纯前端页面展示(前端静态数据分页)
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <zt #zt
      [data]="dataSet" 
      [columns]="columns" 
      [total]="dataSet.length"
      [page] ="page"
      (change)="change($event)"
    ></zt>
    `,
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  dataSet:any = [];
  page: any = {
    front: true,
    zeroIndexed: false,
    position: 'bottom',
    placement: 'right',
    show: true,  
    showSize: true,
    pageSizes: [10, 20, 30, 40, 50], 
    showQuickJumper: true, 
    total: true,
  }
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
    ]

  ngOnInit(): void {
    for (let index = 0; index < 25; index++) {
      this.dataSet.push({
        id:index+"XXX",
        note_title: 'Joe Black - '+(index+1),
        code: '003',
        flag: true,
        note_content: 'Sidney No. 1 Lake Park'
      })
    }

  }

  change(e: any) {
    console.log("反馈：")
    console.log(e)
  }
}
```

#### 纯前端页面展示(前端控制分页数据显示)
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <zt #zt
      [data]="dataSet" 
      [columns]="columns" 
      [total]="total"
      [page] ="page"
      (change)="change($event)"
    ></zt>
    `,
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  dataSet:any = [];
  total:number = 50;
  page: any = {
    front: false,
    zeroIndexed: false,
    position: 'bottom',
    placement: 'right',
    show: true,  
    showSize: true,
    pageSizes: [10, 20, 30, 40, 50], 
    showQuickJumper: true, 
    total: true,
  }
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
    ]

  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      this.dataSet.push({
        id:index+"XXX",
        note_title: 'Joe Black - '+(index+1),
        code: '003',
        flag: true,
        note_content: 'Sidney No. 1 Lake Park'
      })
    }

  }

  change(e: any) {
    console.log("反馈：")
    console.log(e)
  }
}
```
#### url获取数据源页面展示(api控制分页数据显示)
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <zt #zt 
      [url]="url" 
      [columns]="columns" 
      [req]="req" 
      [pi]="pi" 
      [ps]="ps"
      [operators]="operators" 
      [page]="page"
      (change)="change($event)"
    ></zt>
    `,
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  checkBox: any = [];
  url: any = "/api/seventeen/note/list"
  ps = 10; //(limit)
  pi = 1;//(offset)
  req: any = {
    params: {
      //除去分页之外的参数
    },
    reName:{ pi: 'pageNo', ps: 'pageSize' }
  }
  page: any = {
    front: false,
    zeroIndexed: false,//后端分页是否采用`0`基索引，只在`data`类型为`string`时有效，默认：`false`
    position: 'bottom',//指定分页显示的位置，默认：`bottom`
    placement: 'right',//'left' | 'center' | 'right';  指定分页分页方向
    show: true,  //是否显示分页器，默认：`true`
    showSize: true, //是否显示分页器中改变页数，默认：`false`
    pageSizes: [10, 20, 30, 40, 50], //分页器中每页显示条目数下拉框值，默认：`[10, 20, 30, 40, 50]`
    showQuickJumper: true, 
    total: true,
  }
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

  ngOnInit(): void {}

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
          click: () => console.log("删除按钮")
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
      // this.req = {
      //   params: {
      //     pageNo: (e['pi']-1)*e['ps'],
      //     pageSize: e['ps']
      //   }
      // }
    }
  }
}

```