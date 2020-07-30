import { Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { FullLocaleData, LocaleData } from './locale.types';
export declare class LocaleService {
    private i18n;
    private _locale;
    private change$;
    constructor(i18n: NzI18nService, locale: FullLocaleData | null);
    readonly change: Observable<FullLocaleData>;
    setLocale(locale: FullLocaleData): void;
    readonly locale: FullLocaleData;
    getData(path: keyof FullLocaleData): LocaleData;
}
export declare function LOCALE_SERVICE_PROVIDER_FACTORY(exist: LocaleService, locale: FullLocaleData): LocaleService;
export declare const LOCALE_SERVICE_PROVIDER: Provider;
