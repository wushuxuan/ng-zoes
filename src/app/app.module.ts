import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

/** 配置 angular i18n **/
import { CommonModule, registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzCardModule,NzSwitchModule, NzButtonModule, } from 'ng-zorro-antd'

import { NgZoesModule,LocaleService,ZOE_LOCALE,zh_CN } from 'ng-zoes';


import { TableTesterComponent } from './routes/table-tester/table-tester.component';
import { UploadTesterComponent } from './routes/upload-tester/upload-tester.component';
import { DroppableTesterComponent } from './routes/droppable-tester/droppable-tester.component';
import { CardTesterComponent } from './routes/card-tester/card-tester.component';
import { LoadingTesterComponent } from './routes/loading-tester/loading-tester.component';
import { FileCheckTesterComponent } from './routes/file-check-tester/file-check-tester.component';
import { CropperTesterComponent } from './routes/cropper-tester/cropper-tester.component';



@NgModule({
  declarations: [
    AppComponent,
    DroppableTesterComponent,
    TableTesterComponent,
    UploadTesterComponent,
    LoadingTesterComponent,
    CardTesterComponent,
    FileCheckTesterComponent,
    CropperTesterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NgZoesModule,
    NzCardModule,
    NzSwitchModule,
    NzButtonModule
  ],
  providers: [LocaleService, { provide: ZOE_LOCALE, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
