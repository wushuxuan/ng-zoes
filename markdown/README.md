<h1><a href="markdown/SUMMARY.md">NgZoe</a></h1>

管理后台的常用组件,依赖于[ng-zorro-antd](https://ng.ant.design/docs/getting-started/zh)基础组件.


## 快速上手

### 安装


```bash
npm i ng-zoes
```

### 引入样式

在 `styles.less` 中引入样式文件
```ts
@import "~ng-zorro-antd/ng-zorro-antd.less";
```

### 引入组件模块
将ZoeModule引入到你的 app.module.ts 文件
```ts
import { NgModule } from '@angular/core';
import { ZoeModule,LocaleService } from 'ng-zoes';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [LocaleService ],
  imports: [
    ZoeModule
  ]
})
export class AppModule { }
```