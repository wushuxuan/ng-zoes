<h1>zc 卡片</h1>

### 如何使用


```ts
<zc [options]="options">
    <ng-template #content1>内容1</ng-template>
    <ng-template #content2>内容2</ng-template>
    <ng-template #content3>内容3</ng-template>
   
    <p>固定内容</p>
</zc>
```

### Api
| 参数        | 说明           | 类型  |默认值  |
| ------------- |:-------------:| -----:|-----:|
| `[options]`     | 配置 | `ZCOptions` | - |
| `[loading]`     | loading | `boolean` | false |


#### ZCOptions
| 参数        | 说明           | 类型  |默认值  |
| ------------- |:-------------:| -----:|-----:|
|`bordered`|是否边框，默认：`false`|`boolean` | false |  
|`title`|卡片title|`string` | - |  
|`extra`|卡片extra|`ZCExtra` | - |  
|`tabs`|卡片tabs|`ZCTabOptions` | - |


#### ZCExtra
| 参数        | 说明           | 类型  |默认值  |
| ------------- |:-------------:| -----:|-----:|
|`buttons`| buttons配置 |`ZCButtonOptions` | - |  
|`type`| extra类型 |`'button' / 'text'` | 'text' |  

#### ZCButtonOptions
| 参数        | 说明           | 类型  |默认值  |
| ------------- |:-------------:| -----:|-----:|
|`text`| button text |`string` | - |  
|`link`| button link |`string` | - |  
|`danger`| button danger |`boolean` | - |  
|`diabled`| button diabled |`boolean` | - |  
|`type`| button 类型 |`'primary' / 'default'` | 'default' |  
|`click`| button click |`()=>func` | - |  


### 代码演示
```ts
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ZCOptions } from 'ng-zoes'

@Component({
  selector: 'app-root',
  template: `
    <zc [options]="options">
        <ng-template #content1>内容1</ng-template>
        <ng-template #content2>内容2</ng-template>
        <ng-template #content3>内容3</ng-template>
    
        <p>固定内容</p>
    </zc>
    `,
  styleUrls: ['./app.component.less']
})
export class AppComponent {
    @ViewChild('content1', { static: true,read: TemplateRef }) content1: TemplateRef<any>
    @ViewChild('content2', { static: true,read: TemplateRef }) content2: TemplateRef<any>
    @ViewChild('content3', { static: true,read: TemplateRef }) content3: TemplateRef<any>
    options: ZCOptions = {
        bordered: true,
        title:'卡片名称',
        extra:{
        buttons:[
            {text:'新增',type:'primary',click:()=>this.delete('新增')},
            {text:'链接',type:'default',link:'upload'},
            {text:'返回',type:'default',link:'back'},
            {text:'删除',danger:true,link:'drop',click:()=>this.delete('删除')},
            {text:'删除',danger:true,diabled:true,link:'drop',},
        ],
        type:'button'
        }
    }

    ngOnInit(): void {
        this.options.tabs= {
        size: 'large',
        values: [
            { title: '分类1', component: this.content1 },
            { title: '分类2', component: this.content2 },
            { title: '分类3', component: this.content3 },
        ]
        }

    }

    delete(item) {
        console.log(item + "按钮");
    }
}
```