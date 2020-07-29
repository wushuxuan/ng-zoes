import { Inject, Injectable, Optional, Provider, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NzI18nService, zh_CN, zh_TW, en_US, } from 'ng-zorro-antd/i18n';

import zhCN from './languages/zh-CN';
import { ZOE_LOCALE } from './locale.tokens';
import { FullLocaleData, LocaleData } from './locale.types';

const localeData = {
  "en-US": en_US,
  "zh-CN": zh_CN,
  "zh-TW": zh_TW,
}

@Injectable()
export class LocaleService {
  private _locale: FullLocaleData;
  private change$ = new BehaviorSubject<FullLocaleData>(this._locale);

  constructor(
    private i18n: NzI18nService,
    @Inject(ZOE_LOCALE) locale: FullLocaleData | null
  ) {
    this.setLocale(locale || zhCN);
  }

  get change(): Observable<FullLocaleData> {
    return this.change$.asObservable();
  }

  setLocale(locale: FullLocaleData): void {
    // console.log(locale)
    if (this._locale && this._locale.abbr === locale.abbr) {
      return;
    }
    this._locale = locale;
    for (const [key, value] of Object.entries(localeData)) {
      if(locale.abbr == key){
        console.log(value)
        this.i18n.setLocale(value);
        // this.i18n.setLocale(value);
      }
    }
    this.change$.next(locale);
  }

  get locale(): FullLocaleData {
    return this._locale;
  }

  getData(path: keyof FullLocaleData): LocaleData {
    return (this._locale[path] || {}) as LocaleData;
  }
}

export function LOCALE_SERVICE_PROVIDER_FACTORY(exist: LocaleService, locale: FullLocaleData): LocaleService {
  return exist || new LocaleService(null, locale);
}

export const LOCALE_SERVICE_PROVIDER: Provider = {
  provide: LocaleService,
  useFactory: LOCALE_SERVICE_PROVIDER_FACTORY,
  deps: [[new Optional(), new SkipSelf(), LocaleService], ZOE_LOCALE],
};
