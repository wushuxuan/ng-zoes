import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ZCOptions,LoadingService } from 'ng-zoes'

@Component({
  selector: 'app-card-tester',
  templateUrl: './card-tester.component.html',
  styleUrls: ['./card-tester.component.less']
})
export class CardTesterComponent implements OnInit {

  @ViewChild('content1', { static: true,read: TemplateRef }) content1: TemplateRef<any>
  @ViewChild('content2', { static: true,read: TemplateRef }) content2: TemplateRef<any>
  @ViewChild('content3', { static: true,read: TemplateRef }) content3: TemplateRef<any>
  @ViewChild('zc', { static: true,read: TemplateRef }) zc: TemplateRef<any>

  loading:boolean = false;
  options: any = {
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

  constructor(
    private loadingService:LoadingService,
  ) {
    // console.log(this.content2);
   }

  ngOnInit(): void {
    console.log(this);
    console.log(this.loadingService.create());
    this.options.tabs= {
      size: 'large',
      values: [
        { title: '分类1', component: this.content1 },
        { title: '分类2', component: this.content2 },
        { title: '分类3', component: this.content3 },
      ]
    }

    setTimeout(() => {
      this.loadingService.destroy(null)
    }, 3000);
  }

  onClick(){
    console.log("loading开始");
    
    this.loadingService.create(null)
    setTimeout(() => {
      console.log("loading结束");
      
      this.loadingService.destroy(null)
    }, 3000);
  }

  delete(item) {
    console.log(item + "按钮");

  }
}
