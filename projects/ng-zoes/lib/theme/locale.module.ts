import { NgModule } from '@angular/core';

// import zhCN from './languages/zh_CN';
import zhCN from './languages/zh-CN';

import { LOCALE_SERVICE_PROVIDER } from './locale.service';
import { ZOE_LOCALE } from './locale.tokens';

@NgModule({
  providers: [{ provide: ZOE_LOCALE, useValue: zhCN }, LOCALE_SERVICE_PROVIDER],
})
export class LocaleModule {}
