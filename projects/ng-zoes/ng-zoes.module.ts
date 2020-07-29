import { NgModule, } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NzIconModule, NzCardModule, NzTabsModule, NzButtonModule, NzDividerModule, NzTableModule, NzSpinModule, NzCheckboxModule, NzRadioModule, NzProgressModule, NzModalService, NzEmptyModule } from 'ng-zorro-antd'

import { DroppableComponent } from './lib/components/droppable/droppable.component';
import { CardComponent } from './lib/components/card/card.component';
import { TableColumnsButtonsComponent } from './lib/components/table/table-columns-buttons/table-columns-buttons.component';
import { TableComponent } from './lib/components/table/table.component';
import { UploadBtnComponent } from './lib/components/upload/upload-btn.component'
import { UploadListComponent } from './lib/components/upload/upload-list.component'
import { UploadComponent } from './lib/components/upload/upload.component'
import { LoadingComponent } from './lib/components/loading/loading.component'
import { FileCheckComponent } from './lib/components/file-check/file-check.component';


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
]

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
]

import { RenderPipe } from './lib/pipe/table/render.pipe';
import { TablePipe } from './lib/pipe/table/table.pipe';

var pipe_lists = [
  RenderPipe,
  TablePipe,
]


import { OverlayModule, OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

/** 配置 ng-zorro-antd 国际化 **/
import { NzI18nModule } from 'ng-zorro-antd/i18n';

import { LocaleModule } from './lib/theme/locale.module';

//拖拽
import { SortablejsModule } from 'ngx-sortablejs'

//icon图标
import { IconDefinition } from '@ant-design/icons-angular';

import * as AllIcons from '@ant-design/icons-angular/icons';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
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
  providers: [NzModalService],
  entryComponents: [LoadingComponent,FileCheckComponent],
  exports: [...thirdComponents]
})
export class NgZoesModule { }
