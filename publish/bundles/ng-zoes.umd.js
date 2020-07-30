(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('ng-zorro-antd/i18n'), require('rxjs/operators'), require('ng-zorro-antd/core/util'), require('ng-zorro-antd/modal'), require('@angular/cdk/portal'), require('@angular/cdk/overlay-prebuilt.css'), require('@angular/cdk/overlay'), require('@angular/common'), require('ng-zorro-antd'), require('@angular/cdk/keycodes'), require('@angular/common/http'), require('ng-zorro-antd/core/logger'), require('@angular/animations'), require('lodash'), require('@angular/common/locales/en'), require('@angular/platform-browser/animations'), require('@angular/forms'), require('ngx-sortablejs'), require('@ant-design/icons-angular/icons'), require('image-compressor.js')) :
    typeof define === 'function' && define.amd ? define('ng-zoes', ['exports', '@angular/core', 'rxjs', 'ng-zorro-antd/i18n', 'rxjs/operators', 'ng-zorro-antd/core/util', 'ng-zorro-antd/modal', '@angular/cdk/portal', '@angular/cdk/overlay-prebuilt.css', '@angular/cdk/overlay', '@angular/common', 'ng-zorro-antd', '@angular/cdk/keycodes', '@angular/common/http', 'ng-zorro-antd/core/logger', '@angular/animations', 'lodash', '@angular/common/locales/en', '@angular/platform-browser/animations', '@angular/forms', 'ngx-sortablejs', '@ant-design/icons-angular/icons', 'image-compressor.js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ng-zoes'] = {}, global.ng.core, global.rxjs, global.i18n, global.rxjs.operators, global.util, global.i1, global.ng.cdk.portal, global.ng.cdk.overlayPrebuiltCss, global.ng.cdk.overlay, global.ng.common, global.ngZorroAntd, global.ng.cdk.keycodes, global.ng.common.http, global.logger, global.ng.animations, global._, global.ng.common.locales.en, global.ng.platformBrowser.animations, global.ng.forms, global.ngxSortablejs, global.icons$1, global.ImageCompressor));
}(this, (function (exports, i0, rxjs, i18n, operators, util, i1, portal, overlayPrebuilt_css, i1$1, common, ngZorroAntd, keycodes, i1$2, logger, animations, _, en, animations$1, forms, ngxSortablejs, icons$1, ImageCompressor) { 'use strict';

    _ = _ && Object.prototype.hasOwnProperty.call(_, 'default') ? _['default'] : _;
    en = en && Object.prototype.hasOwnProperty.call(en, 'default') ? en['default'] : en;
    ImageCompressor = ImageCompressor && Object.prototype.hasOwnProperty.call(ImageCompressor, 'default') ? ImageCompressor['default'] : ImageCompressor;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __createBinding(o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    result[k] = mod[k];
        result.default = mod;
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var zhCN = {
        abbr: 'zh-CN',
        zt: {
            emptyText: '暂无数据',
            clearText: '清空',
            total: '共 {{total}} 条',
        },
        zu: {
            uploading: '文件上传中',
            removeFile: '删除文件',
            uploadError: '上传错误',
            previewFile: '预览文件',
            downloadFile: '下载文件',
            uploadStorage: '暂存文件',
        },
        zf: {
            submit: '提交',
            cancel: '取消',
        }
    };

    var ZOE_LOCALE = new i0.InjectionToken('zoe-locale');

    var localeData = {
        "en-US": i18n.en_US,
        "zh-CN": i18n.zh_CN,
        "zh-TW": i18n.zh_TW,
    };
    exports.LocaleService = /** @class */ (function () {
        function LocaleService(i18n, locale) {
            this.i18n = i18n;
            this.change$ = new rxjs.BehaviorSubject(this._locale);
            this.setLocale(locale || zhCN);
        }
        Object.defineProperty(LocaleService.prototype, "change", {
            get: function () {
                return this.change$.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        LocaleService.prototype.setLocale = function (locale) {
            var e_1, _a;
            // console.log(locale)
            if (this._locale && this._locale.abbr === locale.abbr) {
                return;
            }
            this._locale = locale;
            try {
                for (var _b = __values(Object.entries(localeData)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                    if (locale.abbr == key) {
                        console.log(value);
                        this.i18n.setLocale(value);
                        // this.i18n.setLocale(value);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.change$.next(locale);
        };
        Object.defineProperty(LocaleService.prototype, "locale", {
            get: function () {
                return this._locale;
            },
            enumerable: true,
            configurable: true
        });
        LocaleService.prototype.getData = function (path) {
            return (this._locale[path] || {});
        };
        return LocaleService;
    }());
    exports.LocaleService = __decorate([
        i0.Injectable(),
        __param(1, i0.Inject(ZOE_LOCALE))
    ], exports.LocaleService);
    function LOCALE_SERVICE_PROVIDER_FACTORY(exist, locale) {
        return exist || new exports.LocaleService(null, locale);
    }
    var LOCALE_SERVICE_PROVIDER = {
        provide: exports.LocaleService,
        useFactory: LOCALE_SERVICE_PROVIDER_FACTORY,
        deps: [[new i0.Optional(), new i0.SkipSelf(), exports.LocaleService], ZOE_LOCALE],
    };

    var ɵ0 = zhCN;
    exports.LocaleModule = /** @class */ (function () {
        function LocaleModule() {
        }
        return LocaleModule;
    }());
    exports.LocaleModule = __decorate([
        i0.NgModule({
            providers: [{ provide: ZOE_LOCALE, useValue: ɵ0 }, LOCALE_SERVICE_PROVIDER],
        })
    ], exports.LocaleModule);

    exports.TableComponent = /** @class */ (function () {
        function TableComponent(cdr, servie, locale) {
            this.cdr = cdr;
            this.servie = servie;
            this.locale = locale;
            this.columns = [];
            this.ps = 10; //每页展示多少数据，可双向绑定
            this.pi = 1; //当前页码，可双向绑定
            this.loading = null;
            this.change = new i0.EventEmitter();
            //样式
            this.bordered = false;
            this._allChecked = false;
            this._allCheckedDisabled = false;
            this._indeterminate = false;
            this.totalTpl = "";
            //分页
            this._isPagination = true; //是否显示分页器
            this._isSizeChanger = false; //是否可以改变 nzPageSize
            this._isQuickJumper = false; //是否可以快速跳转至某页
            this._isPageSizeOptions = [10, 20, 30, 40, 50]; //页数选择器可选值
            this._isOnSinglePage = false; //只有一页时是否隐藏分页器
            this._paginationPosition = 'bottom'; //指定分页显示的位置   'top' | 'bottom' | 'both'
            this._frontPagination = true; //是否在前端对数据进行分页(data=>true,)，如果在服务器分页数据或者需要在前端显示全部数据时传入 false
            this._data = [];
            this.local = this.locale.getData('zt');
        }
        TableComponent.prototype.ngOnInit = function () {
        };
        TableComponent.prototype.ngOnChanges = function (changes) {
            //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
            //Add '${implements OnChanges}' to the class.
            // console.log(changes);
            if (changes['url'] || changes['req'] || changes['pi'] || changes['ps']) {
                // this._frontPagination = false;
                this._loadData(this.url, this.req);
            }
            else if (changes['data']) {
                this._showData(changes['data'].currentValue);
            }
            if (changes['loading']) {
                // console.log("loading change")
            }
            if (changes['operators']) {
                this._changeOperator(changes['operators'].currentValue);
            }
            if (changes['page']) {
                this.updateTotalTpl();
                this._changePage(changes['page'].currentValue);
            }
        };
        TableComponent.prototype._refCheck = function () {
            // console.log(this._data);
            // console.log(this.ps);
            var validData = this._data.filter(function (w) { return !w.disabled; });
            var checkedList = validData.filter(function (w) { return w.checked === true; });
            console.log(checkedList);
            this._allChecked = checkedList.length > 0 && checkedList.length === validData.length;
            var allUnChecked = validData.every(function (value) { return !value.checked; });
            this._indeterminate = !this._allChecked && !allUnChecked;
            console.log("_indeterminate:" + this._indeterminate);
            this._allCheckedDisabled = this._data.length === this._data.filter(function (w) { return w.disabled; }).length;
            return this.cd();
        };
        TableComponent.prototype.cd = function () {
            this.cdr.detectChanges();
            return this;
        };
        TableComponent.prototype.updateTotalTpl = function () {
            var total = this.page.total;
            if (typeof total === 'string' && total.length) {
                this.totalTpl = total;
            }
            else if (this.toBoolean(total)) {
                this.totalTpl = this.local.total;
            }
            else {
                this.totalTpl = '';
            }
        };
        TableComponent.prototype.toBoolean = function (value, allowUndefined) {
            if (allowUndefined === void 0) { allowUndefined = false; }
            return allowUndefined && typeof value === 'undefined' ? undefined : value != null && "" + value !== 'false';
        };
        TableComponent.prototype._checkNotify = function () {
            var res = this._data.filter(function (w) { return !w.disabled && w.checked === true; });
            console.log(res);
            this.changeEmit('checkbox', res);
            return this;
        };
        TableComponent.prototype._checkAll = function (checked, item) {
            checked = typeof checked === 'undefined' ? this._allChecked : checked;
            this._data.filter(function (w) { return !w.disabled; }).forEach(function (i) { return (i.checked = checked); });
            return this._refCheck()._checkNotify();
        };
        //单选
        TableComponent.prototype._checkSelection = function (i, value) {
            i.checked = value;
            return this._refCheck()._checkNotify();
        };
        TableComponent.prototype._refRadio = function (checked, item) {
            this._data.filter(function (w) { return !w.disabled; }).forEach(function (i) { return (i.checked = false); });
            item.checked = checked;
            this.changeEmit('radio', item);
            return this;
        };
        TableComponent.prototype._changeOperator = function (operators) {
            var filterOperators = []; //过滤隐藏的按钮
            if (operators && operators.length > 0) {
                operators.forEach(function (data) {
                    data['hidden'] ? null : filterOperators.push(data);
                });
                this.operators = filterOperators;
            }
        };
        TableComponent.prototype._changePage = function (page) {
            this._frontPagination = page.front;
            this._isPageSizeOptions = page.pageSizes;
            this._paginationPosition = page.position;
            this._isPagination = page.show;
            this._isQuickJumper = page.showQuickJumper;
            this._isSizeChanger = page.showSize;
        };
        TableComponent.prototype._pageIndexChange = function (pi) {
            this.pi = pi;
            this._allChecked = false;
            this.changeEmit('pi', pi);
        };
        TableComponent.prototype._pageSizeChange = function (ps) {
            this.pi = 1;
            this.ps = ps;
            this.changeEmit('ps', ps);
        };
        TableComponent.prototype._showData = function (data) {
            this._data = data;
            this.total = this.total ? this.total : data.length;
        };
        TableComponent.prototype._loadData = function (url, req) {
            var _this = this;
            if (!url) {
                return;
            }
            if (req['reName']) {
                req.params[req['reName']['pi']] = this.pi - 1;
                req.params[req['reName']['ps']] = this.ps;
            }
            this.loading = true;
            this.servie.patchHero(url, req).subscribe(function (res) {
                _this._data = res;
                _this.loading = false;
                _this.changeEmit('loaded', res);
                return _this._refCheck()._checkNotify();
            }, (function (error) { _this.loading = false; }));
        };
        TableComponent.prototype._rowClick = function (e, item, index) {
            if (e.target.nodeName === 'INPUT')
                return;
            var data = { e: e, item: item, index: index };
            this.changeEmit('click', data);
        };
        TableComponent.prototype.setData = function (list, total) {
            this._data = list; //重新赋值
            this.total = total;
        };
        TableComponent.prototype.changeEmit = function (type, data) {
            // console.log(data);
            var res = {
                type: type,
                pi: this.pi,
                ps: this.ps,
                total: this.total,
            };
            if (data != null) {
                res[type] = data;
            }
            this.change.emit(res);
        };
        TableComponent.prototype.renderTotal = function (total, range) {
            return this.totalTpl
                ? this.totalTpl.replace('{{total}}', this.total ? this.total : total).replace('{{range[0]}}', range[0]).replace('{{range[1]}}', range[1])
                : '';
        };
        return TableComponent;
    }());
    __decorate([
        i0.Input()
    ], exports.TableComponent.prototype, "data", void 0);
    __decorate([
        i0.Input()
    ], exports.TableComponent.prototype, "columns", void 0);
    __decorate([
        i0.Input()
    ], exports.TableComponent.prototype, "ps", void 0);
    __decorate([
        i0.Input()
    ], exports.TableComponent.prototype, "pi", void 0);
    __decorate([
        i0.Input()
    ], exports.TableComponent.prototype, "total", void 0);
    __decorate([
        i0.Input()
    ], exports.TableComponent.prototype, "loading", void 0);
    __decorate([
        i0.Input()
    ], exports.TableComponent.prototype, "scroll", void 0);
    __decorate([
        i0.Input()
    ], exports.TableComponent.prototype, "url", void 0);
    __decorate([
        i0.Input()
    ], exports.TableComponent.prototype, "req", void 0);
    __decorate([
        i0.Input()
    ], exports.TableComponent.prototype, "page", void 0);
    __decorate([
        i0.Input()
    ], exports.TableComponent.prototype, "operators", void 0);
    __decorate([
        i0.Output()
    ], exports.TableComponent.prototype, "change", void 0);
    __decorate([
        i0.Input()
    ], exports.TableComponent.prototype, "bordered", void 0);
    __decorate([
        i0.ViewChild('table', { static: false })
    ], exports.TableComponent.prototype, "orgTable", void 0);
    exports.TableComponent = __decorate([
        i0.Component({
            selector: 'zt',
            template: "<ng-container>\r\n  <nz-button-group>\r\n    <button *ngFor=\"let operator of operators\" nz-button [nzType]=\"operator.type\" (click)=\"operator.click()\">\r\n      {{operator.text}}\r\n    </button>\r\n  </nz-button-group>\r\n</ng-container>\r\n\r\n<nz-table #table [nzData]=\"_data\" [nzTotal]=\"total\"  [nzBordered]=\"bordered\" [nzLoading]=\"loading\"   [nzScroll]=\"scroll\"  [(nzPageIndex)]=\"pi\"\r\n  [(nzPageSize)]=\"ps\" [nzShowPagination]=\"_isPagination\" [nzShowQuickJumper]=\"_isQuickJumper\"\r\n  [nzPageSizeOptions]=\"_isPageSizeOptions\" [nzHideOnSinglePage]=\"_isOnSinglePage\"\r\n  [nzPaginationPosition]=\"_paginationPosition\" [nzFrontPagination]=\"_frontPagination\"\r\n  [nzShowSizeChanger]=\"_isSizeChanger\" (nzPageIndexChange)=\"_pageIndexChange($event)\"\r\n  (nzPageSizeChange)=\"_pageSizeChange($event)\"  [nzShowTotal]=\"totalTpl\">\r\n  <thead>\r\n    <tr>\r\n      <th *ngFor=\"let col of columns; let $index = index\" [nzAlign]=\"col.type && col.type=='checkbox'?'center':'auto'\">\r\n        <label *ngIf=\"col.type && col.type=='checkbox'\" nz-checkbox [(ngModel)]=\"_allChecked\"\r\n          [nzIndeterminate]=\"_indeterminate\" (ngModelChange)=\"_checkAll($event,col)\"></label>\r\n        <span *ngIf=\"!col.type || col.type!='checkbox'\">{{col.text}}</span>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <ng-container *ngFor=\"let dataItem of table.data;let i = index;\">\r\n      <tr (click)=\"_rowClick($event, dataItem, i)\">\r\n        <ng-container *ngFor=\"let col of columns; let ii = index\">\r\n          <!-- normal -->\r\n          <ng-container *ngIf=\"!col.pipe && !col.pipeType && !col.type && !col.render && !col.buttons\">\r\n            <td> {{dataItem[col.index]}}</td>\r\n          </ng-container>\r\n          <!-- type -->\r\n          <ng-container *ngIf=\"!col.pipe && !col.pipeType && col.type && !col.render && !col.buttons\">\r\n            <td [nzAlign]=\"col.type && (col.type=='checkbox' || col.type=='radio')?'center':'auto'\" >\r\n              <ng-container [ngSwitch]=\"col.type\">\r\n                <label *ngSwitchCase=\"'checkbox'\" nz-checkbox [nzDisabled]=\"dataItem.disabled\"\r\n                  [ngModel]=\"dataItem.checked\" (ngModelChange)=\"_checkSelection(dataItem, $event)\"></label>\r\n                <label *ngSwitchCase=\"'radio'\" nz-radio [nzDisabled]=\"dataItem.disabled\" [ngModel]=\"dataItem.checked\"\r\n                  (ngModelChange)=\"_refRadio($event, dataItem)\"></label>\r\n                <img *ngSwitchCase=\"'img'\" style=\"width: auto; height: 30px;\" [src]=\"dataItem[col.index]\" alt=\"\"\r\n                  srcset=\"\">\r\n              </ng-container>\r\n            </td>\r\n          </ng-container>\r\n          <!-- pipe -->\r\n          <ng-container *ngIf=\"col.pipe && !col.pipeType && !col.type && !col.render && !col.buttons\">\r\n            <td>{{dataItem[col.index] | tablePipe: col.pipe}}</td>\r\n          </ng-container>\r\n          <!-- pipeType -->\r\n          <ng-container *ngIf=\"!col.pipe && col.pipeType && !col.type && !col.render && !col.buttons\">\r\n            <td>\r\n              {{dataItem[col.index] | date:col.pipeType ==='timestampHms'?'yyyy-MM-dd HH:mm:ss':(col.pipeType ==='timestamp'?'yyyy-MM-dd':'yyyy-MM-dd')}}\r\n            </td>\r\n          </ng-container>\r\n          <!-- render -->\r\n          <ng-container *ngIf=\"!col.pipe && !col.pipeType && !col.type && col.render && !col.buttons\">\r\n            <td>\r\n              <div [innerHTML]=\" dataItem[col.index] | renderPipe:dataItem:col.index:col.render\">\r\n              </div>\r\n            </td>\r\n          </ng-container>\r\n          <!-- buttons -->\r\n          <ng-container *ngIf=\"!col.pipe && !col.pipeType && !col.type && !col.render && col.buttons\">\r\n            <td>\r\n              <table-columns-buttons [buttons]=\"col.buttons\" [type]=\"col.buttonType\" [row]=\"dataItem\" [rowIndex]=\"i\">\r\n              </table-columns-buttons>\r\n            </td>\r\n          </ng-container>\r\n        </ng-container>\r\n      </tr>\r\n    </ng-container>\r\n\r\n  </tbody>\r\n  <ng-template #totalTpl let-range=\"range\" let-total>{{ renderTotal(total, range) }}</ng-template>\r\n</nz-table>\r\n",
            styles: ["button{margin-bottom:12px;margin-right:12px}"]
        })
    ], exports.TableComponent);

    exports.TableColumnsButtonsComponent = /** @class */ (function () {
        function TableColumnsButtonsComponent() {
            this.type = 'button'; //button or link
            this.extButtons = [];
            this.normalButtons = [];
        }
        TableColumnsButtonsComponent.prototype.ngOnInit = function () {
            var e_1, _a;
            var canAccessActions = [];
            try {
                for (var _b = __values(this.buttons), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var iterator = _c.value;
                    if (iterator['permission']) {
                        //有权限限制
                        if (iterator['permission'](this.row, this.rowIndex)) {
                            canAccessActions.push(iterator);
                        }
                    }
                    else {
                        //无权限限制
                        canAccessActions.push(iterator);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.normalButtons = canAccessActions;
        };
        return TableColumnsButtonsComponent;
    }());
    __decorate([
        i0.Input()
    ], exports.TableColumnsButtonsComponent.prototype, "buttons", void 0);
    __decorate([
        i0.Input()
    ], exports.TableColumnsButtonsComponent.prototype, "type", void 0);
    __decorate([
        i0.Input()
    ], exports.TableColumnsButtonsComponent.prototype, "row", void 0);
    __decorate([
        i0.Input()
    ], exports.TableColumnsButtonsComponent.prototype, "rowIndex", void 0);
    __decorate([
        i0.Input()
    ], exports.TableColumnsButtonsComponent.prototype, "extButtons", void 0);
    exports.TableColumnsButtonsComponent = __decorate([
        i0.Component({
            selector: 'table-columns-buttons',
            template: "<ng-container>\r\n    <nz-button-group *ngIf=\"type=='button'\">\r\n      <button nz-button *ngFor=\"let action of normalButtons\" [nzType]=\"action.type\" (click)=\"action.click(row,rowIndex)\">{{action.text}}</button>\r\n    </nz-button-group>\r\n    <ng-container  *ngIf=\"type=='link'\">\r\n      <ng-container *ngFor=\"let action of normalButtons;let $index = index;\">\r\n          <a (click)=\"action.click(row,rowIndex)\">{{action.text}}</a>\r\n          <nz-divider *ngIf=\"$index!=normalButtons.length-1\" nzType=\"vertical\"></nz-divider>\r\n      </ng-container>\r\n    </ng-container>\r\n</ng-container>\r\n\r\n",
            styles: ["button{margin-right:12px}"]
        })
    ], exports.TableColumnsButtonsComponent);

    exports.DroppableComponent = /** @class */ (function () {
        function DroppableComponent() {
            var _this = this;
            this.disabled = false;
            this.zdSortChange = new i0.EventEmitter();
            this.options = {
                onUpdate: function (event) {
                    _this.zdSortChange.emit(_this.data);
                }
            };
        }
        DroppableComponent.prototype.ngOnInit = function () {
            this._setOption(this.disabled);
        };
        DroppableComponent.prototype.ngOnChanges = function (changes) {
            //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
            //Add '${implements OnChanges}' to the class.
            if (changes['disabled']) {
                this._disabledChange(changes['disabled'].currentValue);
            }
        };
        DroppableComponent.prototype._disabledChange = function (value) {
            this._setOption(value);
        };
        DroppableComponent.prototype._setOption = function (value) {
            this.disabled = value;
        };
        return DroppableComponent;
    }());
    __decorate([
        i0.Input()
    ], exports.DroppableComponent.prototype, "data", void 0);
    __decorate([
        i0.Input()
    ], exports.DroppableComponent.prototype, "renderItem", void 0);
    __decorate([
        i0.Input()
    ], exports.DroppableComponent.prototype, "disabled", void 0);
    __decorate([
        i0.Output()
    ], exports.DroppableComponent.prototype, "zdSortChange", void 0);
    exports.DroppableComponent = __decorate([
        i0.Component({
            selector: 'az-droppable',
            template: "<!-- <p>\u62D6\u62FD\uFF1A</p>\n<span *ngFor=\"let item of data\">{{item.name}}</span> -->\n<div *ngIf=\"disabled\">\n  <div>\n    <ng-container *ngFor=\"let item of data;let ii= index\">\n      <ng-template [ngTemplateOutlet]=\"renderItem\" [ngTemplateOutletContext]=\"{ $implicit: item, index: ii }\">\n      </ng-template>\n    </ng-container>\n  </div>\n</div>\n\n<div *ngIf=\"!disabled\">\n  <!-- <span *ngFor=\"let item of data\">{{item.name}} + \"----\"</span> -->\n  <div [sortablejs]=\"data\" [sortablejsOptions]=\"options\">\n    <ng-container *ngFor=\"let item of data;let ii= index\">\n      <ng-template [ngTemplateOutlet]=\"renderItem\" [ngTemplateOutletContext]=\"{ $implicit: item, index: ii }\">\n      </ng-template>\n    </ng-container>\n  </div>\n</div>\n\n",
            styles: [".example-list{display:block;overflow:hidden}.example-box{align-items:center;cursor:move;display:inline-flex;flex-direction:row}.cdk-drag-preview{border:1px solid red}.cdk-drop-list-dragging .cdk-drag{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-animating{transition:transform .3s cubic-bezier(0,0,.2,1)}"]
        })
    ], exports.DroppableComponent);

    function getBase64(file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () { return resolve(reader.result); };
            reader.onerror = function (error) { return reject(error); };
        });
    }
    exports.UploadComponent = /** @class */ (function () {
        // #endregion
        function UploadComponent(cdr, localeService, injector) {
            var _this = this;
            this.cdr = cdr;
            this.localeService = localeService;
            this.injector = injector;
            this.nzType = 'select';
            this.nzSort = false;
            this.nzLimit = 0;
            this.nzSize = 0;
            this.nzDirectory = false;
            this.nzOpenFileDialogOnClick = true;
            this.nzFilter = [];
            this.nzFileList = [];
            this.nzDisabled = false;
            this.nzCompress = false;
            this.nzQuality = 0.5;
            this.NZConvertSize = 5000;
            this.nzListType = 'text';
            this.nzMultiple = false;
            this.nzName = 'file';
            this._showUploadList = true;
            this.nzShowButton = true;
            this.nzWithCredentials = false;
            this.nzIconRender = null;
            this.nzFileListRender = null;
            this.nzChange = new i0.EventEmitter();
            this.nzFileListChange = new i0.EventEmitter();
            this.onStart = function (file) {
                if (!_this.nzFileList) {
                    _this.nzFileList = [];
                }
                var targetItem = _this.fileToObject(file);
                targetItem.status = 'uploading';
                _this.nzFileList = _this.nzFileList.concat(targetItem);
                _this.nzFileListChange.emit(_this.nzFileList);
                _this.nzChange.emit({ file: targetItem, fileList: _this.nzFileList, type: 'start' });
                _this.detectChangesList();
            };
            this.onProgress = function (e, file) {
                var fileList = _this.nzFileList;
                var targetItem = _this.getFileItem(file, fileList);
                targetItem.percent = e.percent;
                _this.nzChange.emit({
                    event: e,
                    file: Object.assign({}, targetItem),
                    fileList: _this.nzFileList,
                    type: 'progress'
                });
                _this.detectChangesList();
            };
            this.onSuccess = function (res, file) {
                var fileList = _this.nzFileList;
                var targetItem = _this.getFileItem(file, fileList);
                targetItem.status = 'done';
                targetItem.response = res;
                _this.nzChange.emit({
                    file: Object.assign({}, targetItem),
                    fileList: fileList,
                    type: 'success'
                });
                _this.detectChangesList();
            };
            this.onError = function (err, file) {
                var fileList = _this.nzFileList;
                var targetItem = _this.getFileItem(file, fileList);
                targetItem.error = err;
                targetItem.status = _this.nzAction ? 'error' : 'done';
                _this.nzChange.emit({
                    file: Object.assign({}, targetItem),
                    fileList: fileList,
                    type: _this.nzAction ? 'error' : 'success'
                });
                _this.detectChangesList();
            };
            this.onRemove = function (file) {
                _this.uploadComp.abort(file);
                file.status = 'removed';
                var fnRes = typeof _this.nzRemove === 'function' ? _this.nzRemove(file) : _this.nzRemove == null ? true : _this.nzRemove;
                (fnRes instanceof rxjs.Observable ? fnRes : rxjs.of(fnRes)).pipe(operators.filter(function (res) { return res; })).subscribe(function () {
                    _this.nzFileList = _this.removeFileItem(file, _this.nzFileList);
                    _this.nzChange.emit({
                        file: file,
                        fileList: _this.nzFileList,
                        type: 'removed'
                    });
                    _this.nzFileListChange.emit(_this.nzFileList);
                    _this.cdr.detectChanges();
                });
            };
            // #endregion
            // #region styles
            this.prefixCls = 'ant-upload';
            this.classList = [];
            this.locale = this.localeService.getData('zu');
            this.detectChangesList();
        }
        Object.defineProperty(UploadComponent.prototype, "nzShowUploadList", {
            get: function () {
                return this._showUploadList;
            },
            set: function (value) {
                this._showUploadList = typeof value === 'boolean' ? util.toBoolean(value) : value;
            },
            enumerable: true,
            configurable: true
        });
        UploadComponent.prototype.zipOptions = function () {
            var _this = this;
            if (typeof this.nzShowUploadList === 'boolean' && this.nzShowUploadList) {
                this.nzShowUploadList = {
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                    showDownloadIcon: true
                };
            }
            // filters
            var filters = this.nzFilter.slice();
            if (this.nzMultiple && this.nzLimit > 0 && filters.findIndex(function (w) { return w.name === 'limit'; }) === -1) {
                filters.push({
                    name: 'limit',
                    fn: function (fileList) { return fileList.slice(-_this.nzLimit); }
                });
            }
            if (this.nzSize > 0 && filters.findIndex(function (w) { return w.name === 'size'; }) === -1) {
                filters.push({
                    name: 'size',
                    fn: function (fileList) { return fileList.filter(function (w) { return w.size / 1024 <= _this.nzSize; }); }
                });
            }
            if (this.nzFileType && this.nzFileType.length > 0 && filters.findIndex(function (w) { return w.name === 'type'; }) === -1) {
                var types_1 = this.nzFileType.split(',');
                filters.push({
                    name: 'type',
                    fn: function (fileList) { return fileList.filter(function (w) { return ~types_1.indexOf(w.type); }); }
                });
            }
            this._btnOptions = {
                compress: this.nzCompress,
                quality: this.nzQuality,
                convertSize: this.NZConvertSize,
                disabled: this.nzDisabled,
                accept: this.nzAccept,
                action: this.nzAction,
                directory: this.nzDirectory,
                openFileDialogOnClick: this.nzOpenFileDialogOnClick,
                beforeUpload: this.nzBeforeUpload,
                customRequest: this.nzCustomRequest,
                data: this.nzData,
                headers: this.nzHeaders,
                name: this.nzName,
                multiple: this.nzMultiple,
                withCredentials: this.nzWithCredentials,
                filters: filters,
                transformFile: this.nzTransformFile,
                onStart: this.onStart,
                onProgress: this.onProgress,
                onSuccess: this.onSuccess,
                onError: this.onError
            };
            return this;
        };
        // #region upload
        UploadComponent.prototype.fileToObject = function (file) {
            return {
                lastModified: file.lastModified,
                lastModifiedDate: file.lastModifiedDate,
                name: file.filename || file.name,
                size: file.size,
                type: file.type,
                uid: file.uid,
                response: file.response,
                error: file.error,
                percent: 0,
                originFileObj: file
            };
        };
        UploadComponent.prototype.getFileItem = function (file, fileList) {
            return fileList.filter(function (item) { return item.uid === file.uid; })[0];
        };
        UploadComponent.prototype.removeFileItem = function (file, fileList) {
            return fileList.filter(function (item) { return item.uid !== file.uid; });
        };
        // skip safari bug
        UploadComponent.prototype.fileDrop = function (e) {
            if (e.type === this.dragState) {
                return;
            }
            this.dragState = e.type;
            this.setClassMap();
        };
        // #endregion
        // #region list
        UploadComponent.prototype.detectChangesList = function () {
            // this.cdr.detectChanges();
            // this.listComp.detectChanges();
        };
        UploadComponent.prototype.setClassMap = function () {
            var subCls = [];
            if (this.nzType === 'drag') {
                if (this.nzFileList.some(function (file) { return file.status === 'uploading'; })) {
                    subCls.push(this.prefixCls + "-drag-uploading");
                }
                if (this.dragState === 'dragover') {
                    subCls.push(this.prefixCls + "-drag-hover");
                }
            }
            else {
                subCls = [this.prefixCls + "-select-" + this.nzListType];
            }
            this.classList = __spread([
                this.prefixCls,
                this.prefixCls + "-" + this.nzType
            ], subCls, [
                (this.nzDisabled && this.prefixCls + "-disabled") || ''
            ]).filter(function (item) { return !!item; });
            this.cdr.detectChanges();
        };
        // #endregion
        UploadComponent.prototype.ngOnInit = function () {
        };
        UploadComponent.prototype.ngOnChanges = function () {
            this.zipOptions().setClassMap();
        };
        UploadComponent.prototype.listChange = function (e) {
            this.nzFileList = e;
            console.log(e);
            this.nzChange.emit({ file: e.length > 0 ? e[e.length - 1] : {}, fileList: e, type: 'sort' });
        };
        return UploadComponent;
    }());
    __decorate([
        i0.ViewChild('uploadComp', { static: false })
    ], exports.UploadComponent.prototype, "uploadComp", void 0);
    __decorate([
        i0.ViewChild('listComp', { static: false })
    ], exports.UploadComponent.prototype, "listComp", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "option", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzType", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzSort", void 0);
    __decorate([
        i0.Input(), util.InputNumber()
    ], exports.UploadComponent.prototype, "nzLimit", void 0);
    __decorate([
        i0.Input(), util.InputNumber()
    ], exports.UploadComponent.prototype, "nzSize", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzFileType", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzAccept", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzAction", void 0);
    __decorate([
        i0.Input(), util.InputBoolean()
    ], exports.UploadComponent.prototype, "nzDirectory", void 0);
    __decorate([
        i0.Input(), util.InputBoolean()
    ], exports.UploadComponent.prototype, "nzOpenFileDialogOnClick", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzBeforeUpload", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzCustomRequest", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzData", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzFilter", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzFileList", void 0);
    __decorate([
        i0.Input(), util.InputBoolean()
    ], exports.UploadComponent.prototype, "nzDisabled", void 0);
    __decorate([
        i0.Input(), util.InputBoolean()
    ], exports.UploadComponent.prototype, "nzCompress", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzQuality", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "NZConvertSize", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzHeaders", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzListType", void 0);
    __decorate([
        i0.Input(), util.InputBoolean()
    ], exports.UploadComponent.prototype, "nzMultiple", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzName", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzShowUploadList", null);
    __decorate([
        i0.Input(), util.InputBoolean()
    ], exports.UploadComponent.prototype, "nzShowButton", void 0);
    __decorate([
        i0.Input(), util.InputBoolean()
    ], exports.UploadComponent.prototype, "nzWithCredentials", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzRemove", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzPreview", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzPreviewFile", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzTransformFile", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzDownload", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzIconRender", void 0);
    __decorate([
        i0.Input()
    ], exports.UploadComponent.prototype, "nzFileListRender", void 0);
    __decorate([
        i0.Output()
    ], exports.UploadComponent.prototype, "nzChange", void 0);
    __decorate([
        i0.Output()
    ], exports.UploadComponent.prototype, "nzFileListChange", void 0);
    exports.UploadComponent = __decorate([
        i0.Component({
            selector: 'zu',
            template: "<ng-template #list>\r\n  <nz-upload-list *ngIf=\"!nzFileListRender\" #listComp [style.display]=\"nzShowUploadList ? '' : 'none'\" [locale]=\"locale\"\r\n    [listType]=\"nzListType\" [items]=\"nzFileList || []\" [icons]=\"$any(nzShowUploadList)\" [iconRender]=\"nzIconRender\"\r\n    [previewFile]=\"nzPreviewFile\" [onPreview]=\"nzPreview\" [onRemove]=\"onRemove\" [onDownload]=\"nzDownload\"\r\n    [nzAction]=\"nzAction\" [nzSort]=\"nzSort\" (listChange)=\"listChange($event)\"></nz-upload-list>\r\n  <ng-container *ngIf=\"nzFileListRender\">\r\n    <ng-container *ngTemplateOutlet=\"nzFileListRender; context: { $implicit: nzFileList }\"></ng-container>\r\n  </ng-container>\r\n</ng-template>\r\n<ng-template #con>\r\n  <ng-content></ng-content>\r\n</ng-template>\r\n<ng-template #btn>\r\n  <div [ngClass]=\"classList\" [style.display]=\"nzShowButton ? '' : 'none'\">\r\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\">\r\n      <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\r\n    </div>\r\n  </div>\r\n</ng-template>\r\n<ng-container *ngIf=\"nzType === 'drag'; else select\">\r\n  <div [ngClass]=\"classList\" (drop)=\"fileDrop($event)\" (dragover)=\"fileDrop($event)\" (dragleave)=\"fileDrop($event)\">\r\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\" class=\"ant-upload-btn\">\r\n      <div class=\"ant-upload-drag-container\">\r\n        <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\r\n</ng-container>\r\n<ng-template #select>\r\n  <ng-container *ngIf=\"nzListType === 'picture-card'; else pic\">\r\n    <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\r\n    <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\r\n  </ng-container>\r\n</ng-template>\r\n<ng-template #pic>\r\n  <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\r\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\r\n</ng-template>\r\n",
            styles: [".file_uplaod_list{border:1px solid #d9d9d9;border-radius:2px;cursor:pointer;float:left;height:104px;margin:0 8px 8px 0;padding:6px;position:relative;width:104px}.file_upload{height:90px;overflow:hidden;text-align:center;width:100%}.file_upload_icon{font-size:26px;line-height:54px;opacity:.8}.file_upload_text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file_uplaod_delete{color:red;font-size:18px;position:absolute;right:-4px;top:-4px}"]
        })
    ], exports.UploadComponent);

    /**
     * '_executeValidators' utility function
     *
     * Validates a control against an array of validators, and returns
     * an array of the same length containing a combination of error messages
     * (from invalid validators) and null values (from valid validators)
     *
     * //  { AbstractControl } control - control to validate
     * //  { IValidatorFn[] } validators - array of validators
     * //  { boolean } invert - invert?
     * // { PlainObject[] } - array of nulls and error message
     */
    function _executeValidators(control, validators, invert) {
        if (invert === void 0) { invert = false; }
        return validators.map(function (validator) { return validator(control, invert); });
    }
    /**
     * '_executeAsyncValidators' utility function
     *
     * Validates a control against an array of async validators, and returns
     * an array of observabe results of the same length containing a combination of
     * error messages (from invalid validators) and null values (from valid ones)
     *
     * //  { AbstractControl } control - control to validate
     * //  { AsyncIValidatorFn[] } validators - array of async validators
     * //  { boolean } invert - invert?
     * //  - array of observable nulls and error message
     */
    function _executeAsyncValidators(control, validators, invert) {
        if (invert === void 0) { invert = false; }
        return validators.map(function (validator) { return validator(control, invert); });
    }
    /**
     * '_mergeObjects' utility function
     *
     * Recursively Merges one or more objects into a single object with combined keys.
     * Automatically detects and ignores null and undefined inputs.
     * Also detects duplicated boolean 'not' keys and XORs their values.
     *
     * //  { PlainObject[] } objects - one or more objects to merge
     * // { PlainObject } - merged object
     */
    function _mergeObjects() {
        var e_1, _a, e_2, _b;
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        var mergedObject = {};
        try {
            for (var objects_1 = __values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
                var currentObject = objects_1_1.value;
                if (isObject(currentObject)) {
                    try {
                        for (var _c = (e_2 = void 0, __values(Object.keys(currentObject))), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var key = _d.value;
                            var currentValue = currentObject[key];
                            var mergedValue = mergedObject[key];
                            mergedObject[key] = !isDefined(mergedValue) ? currentValue :
                                key === 'not' && isBoolean(mergedValue, 'strict') &&
                                    isBoolean(currentValue, 'strict') ? xor(mergedValue, currentValue) :
                                    getType(mergedValue) === 'object' && getType(currentValue) === 'object' ?
                                        _mergeObjects(mergedValue, currentValue) :
                                        currentValue;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (objects_1_1 && !objects_1_1.done && (_a = objects_1.return)) _a.call(objects_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return mergedObject;
    }
    /**
     * '_mergeErrors' utility function
     *
     * Merges an array of objects.
     * Used for combining the validator errors returned from 'executeValidators'
     *
     * //  { PlainObject[] } arrayOfErrors - array of objects
     * // { PlainObject } - merged object, or null if no usable input objectcs
     */
    function _mergeErrors(arrayOfErrors) {
        var mergedErrors = _mergeObjects.apply(void 0, __spread(arrayOfErrors));
        return isEmpty(mergedErrors) ? null : mergedErrors;
    }
    /**
     * 'isDefined' utility function
     *
     * Checks if a variable contains a value of any type.
     * Returns true even for otherwise 'falsey' values of 0, '', and false.
     *
     * //   value - the value to check
     * // { boolean } - false if undefined or null, otherwise true
     */
    function isDefined(value) {
        return value !== undefined && value !== null;
    }
    /**
     * 'hasValue' utility function
     *
     * Checks if a variable contains a value.
     * Returs false for null, undefined, or a zero-length strng, '',
     * otherwise returns true.
     * (Stricter than 'isDefined' because it also returns false for '',
     * though it stil returns true for otherwise 'falsey' values 0 and false.)
     *
     * //   value - the value to check
     * // { boolean } - false if undefined, null, or '', otherwise true
     */
    function hasValue(value) {
        return value !== undefined && value !== null && value !== '';
    }
    /**
     * 'isEmpty' utility function
     *
     * Similar to !hasValue, but also returns true for empty arrays and objects.
     *
     * //   value - the value to check
     * // { boolean } - false if undefined, null, or '', otherwise true
     */
    function isEmpty(value) {
        if (isArray(value)) {
            return !value.length;
        }
        if (isObject(value)) {
            return !Object.keys(value).length;
        }
        return value === undefined || value === null || value === '';
    }
    /**
     * 'isString' utility function
     *
     * Checks if a value is a string.
     *
     * //   value - the value to check
     * // { boolean } - true if string, false if not
     */
    function isString(value) {
        return typeof value === 'string';
    }
    /**
     * 'isNumber' utility function
     *
     * Checks if a value is a regular number, numeric string, or JavaScript Date.
     *
     * //   value - the value to check
     * //  { any = false } strict - if truthy, also checks JavaScript tyoe
     * // { boolean } - true if number, false if not
     */
    function isNumber(value, strict) {
        if (strict === void 0) { strict = false; }
        if (strict && typeof value !== 'number') {
            return false;
        }
        return !isNaN(value) && value !== value / 0;
    }
    /**
     * 'isInteger' utility function
     *
     * Checks if a value is an integer.
     *
     * //   value - the value to check
     * //  { any = false } strict - if truthy, also checks JavaScript tyoe
     * // {boolean } - true if number, false if not
     */
    function isInteger(value, strict) {
        if (strict === void 0) { strict = false; }
        if (strict && typeof value !== 'number') {
            return false;
        }
        return !isNaN(value) && value !== value / 0 && value % 1 === 0;
    }
    /**
     * 'isBoolean' utility function
     *
     * Checks if a value is a boolean.
     *
     * //   value - the value to check
     * //  { any = null } option - if 'strict', also checks JavaScript type
     *                              if TRUE or FALSE, checks only for that value
     * // { boolean } - true if boolean, false if not
     */
    function isBoolean(value, option) {
        if (option === void 0) { option = null; }
        if (option === 'strict') {
            return value === true || value === false;
        }
        if (option === true) {
            return value === true || value === 1 || value === 'true' || value === '1';
        }
        if (option === false) {
            return value === false || value === 0 || value === 'false' || value === '0';
        }
        return value === true || value === 1 || value === 'true' || value === '1' ||
            value === false || value === 0 || value === 'false' || value === '0';
    }
    function isFunction(item) {
        return typeof item === 'function';
    }
    function isObject(item) {
        return item !== null && typeof item === 'object';
    }
    function isArray(item) {
        return Array.isArray(item);
    }
    function isDate(item) {
        return !!item && Object.prototype.toString.call(item) === '[object Date]';
    }
    function isMap(item) {
        return !!item && Object.prototype.toString.call(item) === '[object Map]';
    }
    function isSet(item) {
        return !!item && Object.prototype.toString.call(item) === '[object Set]';
    }
    function isSymbol(item) {
        return typeof item === 'symbol';
    }
    /**
     * 'getType' function
     *
     * Detects the JSON Schema Type of a value.
     * By default, detects numbers and integers even if formatted as strings.
     * (So all integers are also numbers, and any number may also be a string.)
     * However, it only detects true boolean values (to detect boolean values
     * in non-boolean formats, use isBoolean() instead).
     *
     * If passed a second optional parameter of 'strict', it will only detect
     * numbers and integers if they are formatted as JavaScript numbers.
     *
     * Examples:
     * getType('10.5') = 'number'
     * getType(10.5) = 'number'
     * getType('10') = 'integer'
     * getType(10) = 'integer'
     * getType('true') = 'string'
     * getType(true) = 'boolean'
     * getType(null) = 'null'
     * getType({ }) = 'object'
     * getType([]) = 'array'
     *
     * getType('10.5', 'strict') = 'string'
     * getType(10.5, 'strict') = 'number'
     * getType('10', 'strict') = 'string'
     * getType(10, 'strict') = 'integer'
     * getType('true', 'strict') = 'string'
     * getType(true, 'strict') = 'boolean'
     *
     * //   value - value to check
     * //  { any = false } strict - if truthy, also checks JavaScript tyoe
     * // { SchemaType }
     */
    function getType(value, strict) {
        if (strict === void 0) { strict = false; }
        if (!isDefined(value)) {
            return 'null';
        }
        if (isArray(value)) {
            return 'array';
        }
        if (isObject(value)) {
            return 'object';
        }
        if (isBoolean(value, 'strict')) {
            return 'boolean';
        }
        if (isInteger(value, strict)) {
            return 'integer';
        }
        if (isNumber(value, strict)) {
            return 'number';
        }
        if (isString(value) || (!strict && isDate(value))) {
            return 'string';
        }
        return null;
    }
    /**
     * 'isType' function
     *
     * Checks wether an input (probably string) value contains data of
     * a specified JSON Schema type
     *
     * //  { PrimitiveValue } value - value to check
     * //  { SchemaPrimitiveType } type - type to check
     * // { boolean }
     */
    function isType(value, type) {
        switch (type) {
            case 'string':
                return isString(value) || isDate(value);
            case 'number':
                return isNumber(value);
            case 'integer':
                return isInteger(value);
            case 'boolean':
                return isBoolean(value);
            case 'null':
                return !hasValue(value);
            default:
                console.error("isType error: \"" + type + "\" is not a recognized type.");
                return null;
        }
    }
    /**
     * 'isPrimitive' function
     *
     * Checks wether an input value is a JavaScript primitive type:
     * string, number, boolean, or null.
     *
     * //   value - value to check
     * // { boolean }
     */
    function isPrimitive(value) {
        return (isString(value) || isNumber(value) ||
            isBoolean(value, 'strict') || value === null);
    }
    /**
     * 'toJavaScriptType' function
     *
     * Converts an input (probably string) value to a JavaScript primitive type -
     * 'string', 'number', 'boolean', or 'null' - before storing in a JSON object.
     *
     * Does not coerce values (other than null), and only converts the types
     * of values that would otherwise be valid.
     *
     * If the optional third parameter 'strictIntegers' is TRUE, and the
     * JSON Schema type 'integer' is specified, it also verifies the input value
     * is an integer and, if it is, returns it as a JaveScript number.
     * If 'strictIntegers' is FALSE (or not set) the type 'integer' is treated
     * exactly the same as 'number', and allows decimals.
     *
     * Valid Examples:
     * toJavaScriptType('10',   'number' ) = 10   // '10'   is a number
     * toJavaScriptType('10',   'integer') = 10   // '10'   is also an integer
     * toJavaScriptType( 10,    'integer') = 10   //  10    is still an integer
     * toJavaScriptType( 10,    'string' ) = '10' //  10    can be made into a string
     * toJavaScriptType('10.5', 'number' ) = 10.5 // '10.5' is a number
     *
     * Invalid Examples:
     * toJavaScriptType('10.5', 'integer') = null // '10.5' is not an integer
     * toJavaScriptType( 10.5,  'integer') = null //  10.5  is still not an integer
     *
     * //  { PrimitiveValue } value - value to convert
     * //  { SchemaPrimitiveType | SchemaPrimitiveType[] } types - types to convert to
     * //  { boolean = false } strictIntegers - if FALSE, treat integers as numbers
     * // { PrimitiveValue }
     */
    function toJavaScriptType(value, types, strictIntegers) {
        if (strictIntegers === void 0) { strictIntegers = true; }
        if (!isDefined(value)) {
            return null;
        }
        if (isString(types)) {
            types = [types];
        }
        if (strictIntegers && inArray('integer', types)) {
            if (isInteger(value, 'strict')) {
                return value;
            }
            if (isInteger(value)) {
                return parseInt(value, 10);
            }
        }
        if (inArray('number', types) || (!strictIntegers && inArray('integer', types))) {
            if (isNumber(value, 'strict')) {
                return value;
            }
            if (isNumber(value)) {
                return parseFloat(value);
            }
        }
        if (inArray('string', types)) {
            if (isString(value)) {
                return value;
            }
            // If value is a date, and types includes 'string',
            // convert the date to a string
            if (isDate(value)) {
                return value.toISOString().slice(0, 10);
            }
            if (isNumber(value)) {
                return value.toString();
            }
        }
        // If value is a date, and types includes 'integer' or 'number',
        // but not 'string', convert the date to a number
        if (isDate(value) && (inArray('integer', types) || inArray('number', types))) {
            return value.getTime();
        }
        if (inArray('boolean', types)) {
            if (isBoolean(value, true)) {
                return true;
            }
            if (isBoolean(value, false)) {
                return false;
            }
        }
        return null;
    }
    /**
     * 'toSchemaType' function
     *
     * Converts an input (probably string) value to the "best" JavaScript
     * equivalent available from an allowed list of JSON Schema types, which may
     * contain 'string', 'number', 'integer', 'boolean', and/or 'null'.
     * If necssary, it does progressively agressive type coersion.
     * It will not return null unless null is in the list of allowed types.
     *
     * Number conversion examples:
     * toSchemaType('10', ['number','integer','string']) = 10 // integer
     * toSchemaType('10', ['number','string']) = 10 // number
     * toSchemaType('10', ['string']) = '10' // string
     * toSchemaType('10.5', ['number','integer','string']) = 10.5 // number
     * toSchemaType('10.5', ['integer','string']) = '10.5' // string
     * toSchemaType('10.5', ['integer']) = 10 // integer
     * toSchemaType(10.5, ['null','boolean','string']) = '10.5' // string
     * toSchemaType(10.5, ['null','boolean']) = true // boolean
     *
     * String conversion examples:
     * toSchemaType('1.5x', ['boolean','number','integer','string']) = '1.5x' // string
     * toSchemaType('1.5x', ['boolean','number','integer']) = '1.5' // number
     * toSchemaType('1.5x', ['boolean','integer']) = '1' // integer
     * toSchemaType('1.5x', ['boolean']) = true // boolean
     * toSchemaType('xyz', ['number','integer','boolean','null']) = true // boolean
     * toSchemaType('xyz', ['number','integer','null']) = null // null
     * toSchemaType('xyz', ['number','integer']) = 0 // number
     *
     * Boolean conversion examples:
     * toSchemaType('1', ['integer','number','string','boolean']) = 1 // integer
     * toSchemaType('1', ['number','string','boolean']) = 1 // number
     * toSchemaType('1', ['string','boolean']) = '1' // string
     * toSchemaType('1', ['boolean']) = true // boolean
     * toSchemaType('true', ['number','string','boolean']) = 'true' // string
     * toSchemaType('true', ['boolean']) = true // boolean
     * toSchemaType('true', ['number']) = 0 // number
     * toSchemaType(true, ['number','string','boolean']) = true // boolean
     * toSchemaType(true, ['number','string']) = 'true' // string
     * toSchemaType(true, ['number']) = 1 // number
     *
     * //  { PrimitiveValue } value - value to convert
     * //  { SchemaPrimitiveType | SchemaPrimitiveType[] } types - allowed types to convert to
     * // { PrimitiveValue }
     */
    function toSchemaType(value, types) {
        if (!isArray(types)) {
            types = [types];
        }
        if (types.includes('null') && !hasValue(value)) {
            return null;
        }
        if (types.includes('boolean') && !isBoolean(value, 'strict')) {
            return value;
        }
        if (types.includes('integer')) {
            var testValue = toJavaScriptType(value, 'integer');
            if (testValue !== null) {
                return +testValue;
            }
        }
        if (types.includes('number')) {
            var testValue = toJavaScriptType(value, 'number');
            if (testValue !== null) {
                return +testValue;
            }
        }
        if ((isString(value) || isNumber(value, 'strict')) &&
            types.includes('string')) { // Convert number to string
            return toJavaScriptType(value, 'string');
        }
        if (types.includes('boolean') && isBoolean(value)) {
            return toJavaScriptType(value, 'boolean');
        }
        if (types.includes('string')) { // Convert null & boolean to string
            if (value === null) {
                return '';
            }
            var testValue = toJavaScriptType(value, 'string');
            if (testValue !== null) {
                return testValue;
            }
        }
        if ((types.includes('number') ||
            types.includes('integer'))) {
            if (value === true) {
                return 1;
            } // Convert boolean & null to number
            if (value === false || value === null || value === '') {
                return 0;
            }
        }
        if (types.includes('number')) { // Convert mixed string to number
            var testValue = parseFloat(value);
            if (!!testValue) {
                return testValue;
            }
        }
        if (types.includes('integer')) { // Convert string or number to integer
            var testValue = parseInt(value, 10);
            if (!!testValue) {
                return testValue;
            }
        }
        if (types.includes('boolean')) { // Convert anything to boolean
            return !!value;
        }
        if ((types.includes('number') ||
            types.includes('integer')) && !types.includes('null')) {
            return 0; // If null not allowed, return 0 for non-convertable values
        }
    }
    /**
     * 'isPromise' function
     *
     * //   object
     * // { boolean }
     */
    function isPromise(object) {
        return !!object && typeof object.then === 'function';
    }
    /**
     * 'isObservable' function
     *
     * //   object
     * // { boolean }
     */
    function isObservable(object) {
        return !!object && typeof object.subscribe === 'function';
    }
    /**
     * '_toPromise' function
     *
     * //  { object } object
     * // { Promise<any> }
     */
    function _toPromise(object) {
        return isPromise(object) ? object : object.toPromise();
    }
    /**
     * 'toObservable' function
     *
     * //  { object } object
     * // { Observable<any> }
     */
    function toObservable(object) {
        var observable = isPromise(object) ? rxjs.from(object) : object;
        if (isObservable(observable)) {
            return observable;
        }
        console.error('toObservable error: Expected validator to return Promise or Observable.');
        return new rxjs.Observable();
    }
    /**
     * 'inArray' function
     *
     * Searches an array for an item, or one of a list of items, and returns true
     * as soon as a match is found, or false if no match.
     *
     * If the optional third parameter allIn is set to TRUE, and the item to find
     * is an array, then the function returns true only if all elements from item
     * are found in the array list, and false if any element is not found. If the
     * item to find is not an array, setting allIn to TRUE has no effect.
     *
     * //  { any|any[] } item - the item to search for
     * //   array - the array to search
     * //  { boolean = false } allIn - if TRUE, all items must be in array
     * // { boolean } - true if item(s) in array, false otherwise
     */
    function inArray(item, array, allIn) {
        if (allIn === void 0) { allIn = false; }
        if (!isDefined(item) || !isArray(array)) {
            return false;
        }
        return isArray(item) ?
            item[allIn ? 'every' : 'some'](function (subItem) { return array.includes(subItem); }) :
            array.includes(item);
    }
    /**
     * 'xor' utility function - exclusive or
     *
     * Returns true if exactly one of two values is truthy.
     *
     * //   value1 - first value to check
     * //   value2 - second value to check
     * // { boolean } - true if exactly one input value is truthy, false if not
     */
    function xor(value1, value2) {
        return (!!value1 && !value2) || (!value1 && !!value2);
    }

    var REGEXP_IMAGE_TYPE = /^image\/.+$/;
    var REGEXP_VIDEO_TYPE = /^video\/.+$/;
    function toBool(value, defaultValue) {
        value = toBoolean(value, true);
        return value == null ? defaultValue : value;
    }
    function toBoolean(value, allowUndefined) {
        if (allowUndefined === void 0) { allowUndefined = false; }
        return allowUndefined && typeof value === 'undefined' ? undefined : value != null && "" + value !== 'false';
    }
    function isImageType(value) {
        return REGEXP_IMAGE_TYPE.test(value);
    }
    function isVideoType(value) {
        return REGEXP_VIDEO_TYPE.test(value);
    }
    function getFileType(fileName) {
        // 后缀获取
        var suffix = '';
        // 获取类型结果
        var result = '';
        try {
            var flieArr = fileName.split('.');
            suffix = flieArr[flieArr.length - 1];
        }
        catch (err) {
            suffix = '';
        }
        // fileName无后缀返回 false
        if (!suffix) {
            return false;
        }
        suffix = suffix.toLocaleLowerCase();
        // 图片格式
        var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
        // 进行图片匹配
        result = imglist.find(function (item) { return item === suffix; });
        if (result) {
            return 'image';
        }
        // 匹配txt
        var txtlist = ['txt'];
        result = txtlist.find(function (item) { return item === suffix; });
        if (result) {
            return 'txt';
        }
        // 匹配 excel
        var excelist = ['xls', 'xlsx'];
        result = excelist.find(function (item) { return item === suffix; });
        if (result) {
            return 'excel';
        }
        // 匹配 word
        var wordlist = ['doc', 'docx'];
        result = wordlist.find(function (item) { return item === suffix; });
        if (result) {
            return 'word';
        }
        // 匹配 pdf
        var pdflist = ['pdf'];
        result = pdflist.find(function (item) { return item === suffix; });
        if (result) {
            return 'pdf';
        }
        // 匹配 ppt
        var pptlist = ['ppt', 'pptx'];
        result = pptlist.find(function (item) { return item === suffix; });
        if (result) {
            return 'ppt';
        }
        // 匹配 视频
        var videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
        result = videolist.find(function (item) { return item === suffix; });
        if (result) {
            return 'video';
        }
        // 匹配 音频
        var radiolist = ['mp3', 'wav', 'wmv'];
        result = radiolist.find(function (item) { return item === suffix; });
        if (result) {
            return 'radio';
        }
        // 其他 文件类型
        return 'other';
    }
    function isEqual(value, compare) {
        return value == compare;
    }
    function hasOwn(object, property) {
        if (!object || !['number', 'string', 'symbol'].includes(typeof property) ||
            (!isObject(object) && !isArray(object) && !isMap(object) && !isSet(object))) {
            return false;
        }
        if (isMap(object) || isSet(object)) {
            return object.has(property);
        }
        if (typeof property === 'number') {
            if (isArray(object)) {
                return object[property];
            }
            property = property + '';
        }
        return object.hasOwnProperty(property);
    }

    exports.ComponentsService = /** @class */ (function () {
        function ComponentsService(injector, modal) {
            var _this = this;
            this.injector = injector;
            this.modal = modal;
            this.filePreview = function (file) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _url;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((isImageType(file.type) || isEqual(getFileType(file.name), 'image')) && !file.url && !file.preview)) return [3 /*break*/, 2];
                            _a = file;
                            return [4 /*yield*/, this.getBase64(file.originFileObj)];
                        case 1:
                            _a.preview = _b.sent();
                            _b.label = 2;
                        case 2:
                            _url = file.url || file.preview;
                            if (isImageType(file.type) || isEqual(getFileType(file.name), 'image')) {
                                this.modal.create({
                                    nzContent: "<img src=\"" + _url + "\" width=\"100%\"/>",
                                    nzFooter: null,
                                });
                            }
                            else if (isVideoType(file.type) || isEqual(getFileType(file.name), 'video')) {
                                this.modal.create({
                                    nzContent: "<video src=\"" + _url + "\" controls=\"controls\" width=\"100%\">\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u89C6\u9891\u64AD\u653E</video>",
                                    nzFooter: null,
                                });
                            }
                            else {
                                // this.injector.get<NzModalService>(NzModalService).create({
                                //   nzContent: `<p class="text-center" >暂时无法查看实时文件</p>`,
                                //   nzFooter: null,
                                // });
                                window.open(_url);
                            }
                            return [2 /*return*/];
                    }
                });
            }); };
        }
        ComponentsService.prototype.getBase64 = function (file) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () { return resolve(reader.result); };
                reader.onerror = function (error) { return reject(error); };
            });
        };
        return ComponentsService;
    }());
    exports.ComponentsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ComponentsService_Factory() { return new exports.ComponentsService(i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.NzModalService)); }, token: exports.ComponentsService, providedIn: "root" });
    exports.ComponentsService = __decorate([
        i0.Injectable({
            providedIn: 'root'
        })
    ], exports.ComponentsService);

    var loaderAllType = [
        { type: 'ball-pulse', num: 3, },
        { type: 'ball-grid-pulse', num: 9, },
        { type: 'ball-clip-rotate', num: 1, },
        { type: 'ball-clip-rotate-pulse', num: 2, },
        { type: 'square-spin', num: 1, },
        { type: 'ball-clip-rotate-multiple', num: 2, },
        { type: 'ball-pulse-rise', num: 5, },
        { type: 'ball-rotate', num: 1, },
        { type: 'cube-transition', num: 2, },
        { type: 'ball-zig-zag', num: 2, },
        { type: 'ball-zig-zag-deflect', num: 2, },
        { type: 'ball-triangle-path', num: 3, },
        { type: 'ball-scale', num: 1, },
        { type: 'line-scale', num: 5, },
        { type: 'line-scale-party', num: 4, },
        { type: 'ball-scale-multiple', num: 3, },
        { type: 'ball-pulse-sync', num: 3, },
        { type: 'ball-beat', num: 3, },
        { type: 'line-scale-pulse-out', num: 5, },
        { type: 'line-scale-pulse-out-rapid', num: 5, },
        { type: 'ball-scale-ripple', num: 1, },
        { type: 'ball-scale-ripple-multiple', num: 3, },
        { type: 'ball-spin-fade-loader', num: 8, },
        { type: 'line-spin-fade-loader', num: 8, },
        { type: 'triangle-skew-spin', num: 1, },
        { type: 'pacman', num: 5, },
        { type: 'ball-grid-beat', num: 9, },
        { type: 'semi-circle-spin', num: 1, },
    ];
    exports.ɵf = /** @class */ (function () {
        function LoadingComponent() {
            this.type = 'ball-beat';
            this.loading = false;
            this.color = "#000";
            this.className = 'ball-beat';
            this.loadList = [1, 1, 1,];
            this._size = 10;
        }
        LoadingComponent.prototype.ngOnInit = function () {
        };
        LoadingComponent.prototype.ngOnChanges = function (changes) {
            //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
            //Add '${implements OnChanges}' to the class.
            if (changes['type']) {
                this._getLoader(changes['type'].currentValue);
            }
            if (changes['size']) {
                this._getSize(changes['size'].currentValue);
            }
        };
        LoadingComponent.prototype._getSize = function (size) {
            switch (size) {
                case 'samll':
                    this._size = 5;
                    break;
                case 'large':
                    this._size = 15;
                    break;
                default:
                    this._size = 10;
                    break;
            }
        };
        LoadingComponent.prototype._getLoader = function (type) {
            var e_1, _a;
            try {
                for (var loaderAllType_1 = __values(loaderAllType), loaderAllType_1_1 = loaderAllType_1.next(); !loaderAllType_1_1.done; loaderAllType_1_1 = loaderAllType_1.next()) {
                    var iterator = loaderAllType_1_1.value;
                    if (iterator.type == type) {
                        this.loadList = new Array(iterator.num);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (loaderAllType_1_1 && !loaderAllType_1_1.done && (_a = loaderAllType_1.return)) _a.call(loaderAllType_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.className = type;
        };
        return LoadingComponent;
    }());
    __decorate([
        i0.Input()
    ], exports.ɵf.prototype, "type", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵf.prototype, "loading", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵf.prototype, "color", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵf.prototype, "size", void 0);
    exports.ɵf = __decorate([
        i0.Component({
            selector: 'az-loading',
            template: "\r\n\r\n<nz-spin style=\"min-width:100%;min-height:100%;\" [nzSpinning]=\"loading\" [nzDelay]=\"500\" [nzIndicator]=\"indicatorTemplate\"> \r\n  <ng-content></ng-content>\r\n</nz-spin>\r\n<ng-template #indicatorTemplate>\r\n    <div class=\"loader\" style=\"position: absolute;top: 50%;left: 50%;margin: -10px;\">\r\n        <div class=\"loader-inner {{className}}\" >\r\n          <div *ngFor=\"let item of loadList\" [ngStyle]=\"{'background': color?color:null,'width':_size+'px',height:_size+'px'}\"></div>\r\n        </div>\r\n      </div>\r\n</ng-template>",
            styles: [":host{align-items:center;background-color:hsla(0,0%,100%,.5);display:block;height:100%;justify-content:center;width:100%}"]
        })
    ], exports.ɵf);

    // import '../../components/loading/loading.component.styl'
    exports.LoadingService = /** @class */ (function () {
        function LoadingService(overlay, overlayContainer) {
            this.overlay = overlay;
            this.overlayContainer = overlayContainer;
            this.hasBackdrop = true;
        }
        LoadingService.prototype.create = function (option, container) {
            this.overlayRef = this.overlay.create({
                hasBackdrop: this.hasBackdrop,
                width: '100%',
                height: '100%',
                panelClass: ['modal', 'is-active'],
                backdropClass: 'modal-background',
                scrollStrategy: this.overlay.scrollStrategies.block(),
            });
            this.component = this.overlayRef.attach(new portal.ComponentPortal(exports.ɵf));
            this._getComponentInstance(this.component.instance, option);
        };
        LoadingService.prototype._getComponentInstance = function (instance, option) {
            instance.loading = true;
            if (option && option.color) {
                instance.color = option.color;
            }
            if (option && option.type) {
                instance.type = option.type;
            }
            if (option && option.size) {
                instance.size = option.size;
            }
        };
        LoadingService.prototype.destroy = function (container) {
            this.component.destroy();
            this.overlayRef.dispose();
        };
        return LoadingService;
    }());
    exports.LoadingService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LoadingService_Factory() { return new exports.LoadingService(i0.ɵɵinject(i1$1.Overlay), i0.ɵɵinject(i1$1.OverlayContainer)); }, token: exports.LoadingService, providedIn: "root" });
    exports.LoadingService = __decorate([
        i0.Injectable({
            providedIn: 'root',
        })
    ], exports.LoadingService);

    exports.ɵg = /** @class */ (function () {
        function FileCheckComponent() {
            this.fileList = [];
            this.index = 0;
            this.show = true;
        }
        FileCheckComponent.prototype.ngOnInit = function () {
        };
        FileCheckComponent.prototype.getType = function (name) {
            return getFileType(name);
        };
        FileCheckComponent.prototype.close = function () {
            this.show = false;
        };
        FileCheckComponent.prototype.changeIndex = function (type) {
            switch (type) {
                case 'next':
                    if (this.index + 1 >= this.fileList.length) {
                        this.index = 0;
                    }
                    else {
                        this.index = this.index + 1;
                    }
                    break;
                case 'perv':
                    if (this.index - 1 < 0) {
                        this.index = this.fileList.length - 1;
                    }
                    else {
                        this.index = this.index - 1;
                    }
                    break;
            }
        };
        return FileCheckComponent;
    }());
    __decorate([
        i0.ViewChild('element', { read: i0.ViewContainerRef })
    ], exports.ɵg.prototype, "element", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵg.prototype, "fileList", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵg.prototype, "index", void 0);
    exports.ɵg = __decorate([
        i0.Component({
            selector: 'az-file-view',
            template: "<div class=\"file-view-container\" *ngIf=\"show\">\n  <div class=\"file-view-container-close\">\n    <i (click)=\"close()\" nz-icon nzType=\"close\" nzTheme=\"outline\"></i>\n  </div>\n  <div class=\"file-view-container-content\">\n    <div class='file-view-container-icon'>\n      <i (click)=\"changeIndex('perv')\" nz-icon nzType=\"left\" nzTheme=\"outline\"></i>\n    </div>\n    <div class='file-view-container-content-view'>\n      <div *ngIf=\"fileList && fileList.length;else empty\">\n        <div [ngSwitch]=\"getType(fileList[index].name)\">\n          <p *ngSwitchCase=\"'image'\">\n            <img [src]=\"fileList[index].url?fileList[index].url:fileList[index].thumbUrl\" />\n          </p>\n          <p *ngSwitchCase=\"'video'\">\n            <video [src]=\"fileList[index].url?fileList[index].url:fileList[index].thumbUrl\" controls=\"controls\"\n              width=\"100%\">\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u89C6\u9891\u64AD\u653E</video>\n          </p>\n          <p *ngSwitchDefault>\n            <span>\u6682\u4E0D\u652F\u6301\u67E5\u770B</span>\n          </p>\n        </div>\n        <p>{{index+1}} / {{fileList.length}} </p>\n      </div>\n      <ng-template #empty>\n        <nz-empty nzNotFoundImage=\"simple\"></nz-empty>\n      </ng-template>\n\n    </div>\n    <div class='file-view-container-icon'><i (click)=\"changeIndex('next')\" nz-icon nzType=\"right\" nzTheme=\"outline\"></i>\n    </div>\n  </div>\n</div>\n",
            styles: [".file-view-container{-webkit-box-align:center;-webkit-overflow-scrolling:touch;background-color:rgba(12,15,19,.5);display:flex;flex-direction:column;height:100vh;left:0;overflow-y:auto;padding:24px;position:fixed;right:0;top:0;width:100%;z-index:109}.file-view-container .file-view-container-close{background:0 0;border-color:transparent;box-shadow:none;color:#fff;font-size:30px;text-align:right;width:100%}.file-view-container .file-view-container-content{display:flex;flex-flow:row;height:100%}.file-view-container .file-view-container-content .file-view-container-content-view{border-radius:6px;display:flex;flex:1;height:80%;margin:24px;padding:15px;width:calc(100vw - 160px)}.file-view-container .file-view-container-content .file-view-container-content-view>div{display:flex;flex-direction:column;justify-content:center;width:100%}.file-view-container .file-view-container-content .file-view-container-content-view img{max-height:75vh;max-width:112.49vh;min-height:300px;min-width:449.958px}.file-view-container .file-view-container-content .file-view-container-content-view p{color:#fff;text-align:center}.file-view-container .file-view-container-content .file-view-container-icon{align-items:center;color:#fff;display:flex;font-size:35px;height:70%;justify-content:center;opacity:.6}.file-view-container .file-view-container-content .file-view-container-icon:hover{opacity:1}i{cursor:pointer}"]
        })
    ], exports.ɵg);

    exports.FileViewService = /** @class */ (function () {
        function FileViewService(overlay, overlayContainer) {
            this.overlay = overlay;
            this.overlayContainer = overlayContainer;
            this.hasBackdrop = true;
        }
        FileViewService.prototype.show = function () {
            console.log("456");
        };
        FileViewService.prototype.create = function (options) {
            this.overlayRef = this.overlay.create();
            this.component = this.overlayRef.attach(new portal.ComponentPortal(exports.ɵg));
            this._getComponentInstance(this.component.instance, options);
        };
        FileViewService.prototype._getComponentInstance = function (instance, options) {
            if (options.fileList) {
                instance.fileList = options.fileList;
            }
            if (options.index) {
                instance.index = options.index;
            }
        };
        FileViewService.prototype.destroy = function () {
            this.component.destroy();
            this.overlayRef.dispose();
        };
        return FileViewService;
    }());
    exports.FileViewService.ɵprov = i0.ɵɵdefineInjectable({ factory: function FileViewService_Factory() { return new exports.FileViewService(i0.ɵɵinject(i1$1.Overlay), i0.ɵɵinject(i1$1.OverlayContainer)); }, token: exports.FileViewService, providedIn: "root" });
    exports.FileViewService = __decorate([
        i0.Injectable({
            providedIn: 'root'
        })
    ], exports.FileViewService);

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzShowUploadListInterface = /** @class */ (function () {
        function NzShowUploadListInterface() {
        }
        return NzShowUploadListInterface;
    }());

    var zhTW = {
        abbr: 'zh-TW',
        zt: {
            emptyText: '暫無數據',
            clearText: '清空',
            total: '共 {{total}} 條',
        },
        zu: {
            uploading: '正在上傳...',
            removeFile: '刪除檔案',
            uploadError: '上傳失敗',
            previewFile: '檔案預覽',
            downloadFile: '下载文件',
            uploadStorage: '暫存檔案'
        },
        zf: {
            submit: '提交',
            cancel: '取消',
        }
    };

    var enUS = {
        abbr: 'en-US',
        zt: {
            emptyText: 'No data',
            clearText: 'Clear',
            total: '{{range[0]}} - {{range[1]}} of {{total}}',
        },
        zu: {
            uploading: 'Uploading...',
            removeFile: 'Remove file',
            uploadError: 'Upload error',
            previewFile: 'Preview file',
            downloadFile: 'Download file',
            uploadStorage: 'Temporary storage'
        },
        zf: {
            submit: 'Submit',
            cancel: 'Cancel',
        }
    };

    exports.ɵb = /** @class */ (function () {
        function CardComponent(router) {
            this.router = router;
            this.loading = false;
            this._selectedIndex = 0;
        }
        CardComponent.prototype.ngOnInit = function () {
            console.log(this.options);
        };
        CardComponent.prototype._getExtraLink = function (link) {
            console.log("link:" + link);
            if (link == 'back') {
                history.go(-1);
            }
            else {
                this.router.navigateByUrl(link);
            }
        };
        CardComponent.prototype._selectChange = function (args) {
            this._selectedIndex = args[0].index;
        };
        return CardComponent;
    }());
    __decorate([
        i0.Input()
    ], exports.ɵb.prototype, "options", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵb.prototype, "loading", void 0);
    exports.ɵb = __decorate([
        i0.Component({
            selector: 'zc',
            template: "<nz-card [nzTitle]=\"options.title\" [nzLoading]=\"loading\" [nzExtra]=\"options.extra?extraTpl:null\" [nzBordered]=\"options.bordered\">\r\n  <ng-template #extraTpl>\r\n\r\n    <ng-container *ngIf=\"options.extra.type =='button';else extraLink\">\r\n      <button *ngFor=\"let item of options.extra.buttons\"\r\n        (click)=\"item.link?_getExtraLink(item.link):(item.click?item.click():null)\" [nzDanger]=\"item.danger\"\r\n        [disabled]=\"item.diabled\" nz-button [nzType]=\"item.type\">{{item.text}}</button>\r\n    </ng-container>\r\n\r\n    <ng-template #extraLink>\r\n      <a nz-button *ngFor=\"let item of options.extra.buttons\" nzType=\"link\" [nzDanger]=\"item.danger\"\r\n        [disabled]=\"item.diabled\"\r\n        (click)=\"item.link?_getExtraLink(item.link):(item.click?item.click():null)\">{{item.text}}</a>\r\n    </ng-template>\r\n\r\n\r\n  </ng-template>\r\n\r\n  <nz-card-tab *ngIf=\"options.tabs\">\r\n    <nz-tabset [nzSize]=\"options.tabs.size\" [nzSelectedIndex]=\"_selectedIndex\"\r\n      (nzSelectChange)=\"_selectChange([$event])\">\r\n      <nz-tab *ngFor=\"let item of options.tabs.values; let i=index\" [nzTitle]=\"item.title\" [nzDisabled]=\"item.disabled\">\r\n      </nz-tab>\r\n    </nz-tabset>\r\n\r\n  </nz-card-tab>\r\n  <ng-container *ngIf=\"options.tabs.values\">\r\n    <ng-template [ngTemplateOutlet]=\"options.tabs.values[_selectedIndex].component\"></ng-template>\r\n  </ng-container>\r\n\r\n\r\n  <ng-content></ng-content>\r\n\r\n\r\n</nz-card>\r\n",
            styles: ["[nz-button]{margin-bottom:12px;margin-right:8px}"]
        })
    ], exports.ɵb);

    exports.ɵc = /** @class */ (function () {
        function UploadBtnComponent(http, fileService, comService) {
            this.http = http;
            this.fileService = fileService;
            this.comService = comService;
            this.reqs = {};
            this.destroy = false;
            if (!http) {
                throw new Error("Not found 'HttpClient', You can import 'HttpClientModule' in your root module.");
            }
        }
        UploadBtnComponent.prototype.onClick = function () {
            if (this.options.disabled || !this.options.openFileDialogOnClick) {
                return;
            }
            this.file.nativeElement.click();
        };
        UploadBtnComponent.prototype.onKeyDown = function (e) {
            if (this.options.disabled) {
                return;
            }
            if (e.key === 'Enter' || e.keyCode === keycodes.ENTER) {
                this.onClick();
            }
        };
        // skip safari bug
        UploadBtnComponent.prototype.onFileDrop = function (e) {
            var _this = this;
            if (this.options.disabled || e.type === 'dragover') {
                e.preventDefault();
                return;
            }
            if (this.options.directory) {
                this.traverseFileTree(e.dataTransfer.items);
            }
            else {
                var files = Array.prototype.slice
                    .call(e.dataTransfer.files)
                    .filter(function (file) { return _this.attrAccept(file, _this.options.accept); });
                if (files.length) {
                    this.uploadFiles(files);
                }
            }
            e.preventDefault();
        };
        UploadBtnComponent.prototype.onChange = function (e) {
            if (this.options.disabled) {
                return;
            }
            var hie = e.target;
            this.uploadFiles(hie.files);
            hie.value = '';
        };
        UploadBtnComponent.prototype.traverseFileTree = function (files) {
            var e_1, _a;
            var _this = this;
            var _traverseFileTree = function (item, path) {
                if (item.isFile) {
                    item.file(function (file) {
                        if (_this.attrAccept(file, _this.options.accept)) {
                            _this.uploadFiles([file]);
                        }
                    });
                }
                else if (item.isDirectory) {
                    var dirReader = item.createReader();
                    dirReader.readEntries(function (entries) {
                        var e_2, _a;
                        try {
                            for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                                var entrieItem = entries_1_1.value;
                                _traverseFileTree(entrieItem, "" + path + item.name + "/");
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    });
                }
            };
            try {
                for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                    var file = files_1_1.value;
                    _traverseFileTree(file.webkitGetAsEntry(), '');
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        UploadBtnComponent.prototype.attrAccept = function (file, acceptedFiles) {
            if (file && acceptedFiles) {
                var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
                var fileName_1 = '' + file.name;
                var mimeType_1 = '' + file.type;
                var baseMimeType_1 = mimeType_1.replace(/\/.*$/, '');
                return acceptedFilesArray.some(function (type) {
                    var validType = type.trim();
                    if (validType.charAt(0) === '.') {
                        return (fileName_1.toLowerCase().indexOf(validType.toLowerCase(), fileName_1.toLowerCase().length - validType.toLowerCase().length) !== -1);
                    }
                    else if (/\/\*$/.test(validType)) {
                        // This is something like a image/* mime type
                        return baseMimeType_1 === validType.replace(/\/.*$/, '');
                    }
                    return mimeType_1 === validType;
                });
            }
            return true;
        };
        UploadBtnComponent.prototype.attachUid = function (file) {
            if (!file.uid) {
                file.uid = Math.random().toString(36).substring(2);
            }
            return file;
        };
        UploadBtnComponent.prototype.uploadFiles = function (fileList) {
            var _this = this;
            var filters$ = rxjs.of(Array.prototype.slice.call(fileList));
            if (this.options.filters) {
                this.options.filters.forEach(function (f) {
                    filters$ = filters$.pipe(operators.switchMap(function (list) {
                        var fnRes = f.fn(list);
                        return fnRes instanceof rxjs.Observable ? fnRes : rxjs.of(fnRes);
                    }));
                });
            }
            filters$.subscribe(function (list) {
                list.forEach(function (file) {
                    _this.attachUid(file);
                    _this.upload(file, list);
                });
            }, function (e) {
                logger.warn("Unhandled upload filter error", e);
            });
        };
        UploadBtnComponent.prototype.upload = function (file, fileList) {
            return __awaiter(this, void 0, void 0, function () {
                var res, before;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.options.compress && fileList && fileList.length == 1)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.fileService.compress(fileList[0], this.options.quality, this.options.convertSize)];
                        case 1:
                            res = _a.sent();
                            res.uid = file.uid;
                            file = res;
                            fileList[0] = res;
                            _a.label = 2;
                        case 2:
                            if (!this.options.beforeUpload) {
                                return [2 /*return*/, this.post(file)];
                            }
                            before = this.options.beforeUpload(file, fileList);
                            if (before instanceof rxjs.Observable) {
                                before.subscribe(function (processedFile) {
                                    var processedFileType = Object.prototype.toString.call(processedFile);
                                    if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
                                        _this.attachUid(processedFile);
                                        _this.post(processedFile);
                                    }
                                    else if (typeof processedFile === 'boolean' && processedFile !== false) {
                                        _this.post(file);
                                    }
                                }, function (e) {
                                    logger.warn("Unhandled upload beforeUpload error", e);
                                });
                            }
                            else if (before !== false) {
                                return [2 /*return*/, this.post(file)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        UploadBtnComponent.prototype.post = function (file) {
            var _this = this;
            if (this.destroy) {
                return;
            }
            var process$ = rxjs.of(file);
            var opt = this.options;
            var uid = file.uid;
            var action = opt.action, data = opt.data, headers = opt.headers, transformFile = opt.transformFile;
            var args = {
                action: typeof action === 'string' ? action : '',
                name: opt.name,
                headers: headers,
                file: file,
                postFile: file,
                data: data,
                withCredentials: opt.withCredentials,
                onProgress: opt.onProgress
                    ? function (e) {
                        opt.onProgress(e, file);
                    }
                    : undefined,
                onSuccess: function (ret, xhr) {
                    _this.clean(uid);
                    opt.onSuccess(ret, file, xhr);
                },
                onError: function (xhr) {
                    _this.clean(uid);
                    opt.onError(xhr, file);
                }
            };
            if (typeof action === 'function') {
                var actionResult_1 = action(file);
                if (actionResult_1 instanceof rxjs.Observable) {
                    process$ = process$.pipe(operators.switchMap(function () { return actionResult_1; }), operators.map(function (res) {
                        args.action = res;
                        return file;
                    }));
                }
                else {
                    args.action = actionResult_1;
                }
            }
            if (typeof transformFile === 'function') {
                var transformResult_1 = transformFile(file);
                process$ = process$.pipe(operators.switchMap(function () { return (transformResult_1 instanceof rxjs.Observable ? transformResult_1 : rxjs.of(transformResult_1)); }));
            }
            if (typeof data === 'function') {
                var dataResult_1 = data(file);
                if (dataResult_1 instanceof rxjs.Observable) {
                    process$ = process$.pipe(operators.switchMap(function () { return dataResult_1; }), operators.map(function (res) {
                        args.data = res;
                        return file;
                    }));
                }
                else {
                    args.data = dataResult_1;
                }
            }
            if (typeof headers === 'function') {
                var headersResult_1 = headers(file);
                if (headersResult_1 instanceof rxjs.Observable) {
                    process$ = process$.pipe(operators.switchMap(function () { return headersResult_1; }), operators.map(function (res) {
                        args.headers = res;
                        return file;
                    }));
                }
                else {
                    args.headers = headersResult_1;
                }
            }
            process$.subscribe(function (newFile) {
                args.postFile = newFile;
                var req$ = (opt.customRequest || _this.xhr).call(_this, args);
                if (!(req$ instanceof rxjs.Subscription)) {
                    logger.warn("Must return Subscription type in '[nzCustomRequest]' property");
                }
                _this.reqs[uid] = req$;
                opt.onStart(file);
            });
        };
        UploadBtnComponent.prototype.xhr = function (args) {
            var _this = this;
            var formData = new FormData();
            if (args.data) {
                Object.keys(args.data).map(function (key) {
                    formData.append(key, args.data[key]);
                });
            }
            formData.append(args.name, args.postFile);
            if (!args.headers) {
                args.headers = {};
            }
            if (args.headers['X-Requested-With'] !== null) {
                args.headers['X-Requested-With'] = "XMLHttpRequest";
            }
            else {
                delete args.headers['X-Requested-With'];
            }
            var req = new i1$2.HttpRequest('POST', args.action, formData, {
                reportProgress: true,
                withCredentials: args.withCredentials,
                headers: new i1$2.HttpHeaders(args.headers)
            });
            return this.http.request(req).subscribe(function (event) {
                if (event.type === i1$2.HttpEventType.UploadProgress) {
                    if (event.total > 0) {
                        event.percent = (event.loaded / event.total) * 100;
                    }
                    args.onProgress(event, args.file);
                }
                else if (event instanceof i1$2.HttpResponse) {
                    args.onSuccess(event.body, args.file, event);
                }
            }, function (err) {
                _this.abort(args.file);
                args.onError(err, args.file);
            });
        };
        UploadBtnComponent.prototype.clean = function (uid) {
            var req$ = this.reqs[uid];
            if (req$ instanceof rxjs.Subscription) {
                req$.unsubscribe();
            }
            delete this.reqs[uid];
        };
        UploadBtnComponent.prototype.abort = function (file) {
            var _this = this;
            if (file) {
                this.clean(file && file.uid);
            }
            else {
                Object.keys(this.reqs).forEach(function (uid) { return _this.clean(uid); });
            }
        };
        UploadBtnComponent.prototype.ngOnDestroy = function () {
            this.destroy = true;
            this.abort();
        };
        return UploadBtnComponent;
    }());
    __decorate([
        i0.ViewChild('file', { static: false })
    ], exports.ɵc.prototype, "file", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵc.prototype, "options", void 0);
    exports.ɵc = __decorate([
        i0.Component({
            selector: '[nz-upload-btn]',
            exportAs: 'nzUploadBtn',
            template: "<input\r\n  type=\"file\"\r\n  #file\r\n  (change)=\"onChange($event)\"\r\n  [attr.accept]=\"options.accept\"\r\n  [attr.directory]=\"options.directory ? 'directory' : null\"\r\n  [attr.webkitdirectory]=\"options.directory ? 'webkitdirectory' : null\"\r\n  [multiple]=\"options.multiple\"\r\n  style=\"display: none;\"\r\n/>\r\n<ng-content></ng-content>\r\n",
            host: {
                '[attr.tabindex]': '"0"',
                '[attr.role]': '"button"',
                '[class.ant-upload]': 'true',
                '[class.ant-upload-disabled]': 'options.disabled',
                '(click)': 'onClick()',
                '(keydown)': 'onKeyDown($event)',
                '(drop)': 'onFileDrop($event)',
                '(dragover)': 'onFileDrop($event)'
            },
            preserveWhitespaces: false,
            encapsulation: i0.ViewEncapsulation.None
        }),
        __param(0, i0.Optional())
    ], exports.ɵc);

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var isImageFileType = function (type) { return !!type && type.indexOf('image/') === 0; };
    var ɵ0$1 = isImageFileType;
    var MEASURE_SIZE = 200;
    exports.ɵe = /** @class */ (function () {
        // #endregion
        function UploadListComponent(cdr, doc, ngZone, platform) {
            this.cdr = cdr;
            this.doc = doc;
            this.ngZone = ngZone;
            this.platform = platform;
            this.list = [];
            this.locale = {};
            this.nzSort = false;
            this.iconRender = null;
            this.listChange = new i0.EventEmitter();
        }
        Object.defineProperty(UploadListComponent.prototype, "showPic", {
            get: function () {
                return this.listType === 'picture' || this.listType === 'picture-card';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UploadListComponent.prototype, "items", {
            set: function (list) {
                this.list = list;
            },
            enumerable: true,
            configurable: true
        });
        UploadListComponent.prototype.genErr = function (file) {
            if (file.response && typeof file.response === 'string') {
                return file.response;
            }
            return (file.error && file.error.statusText) || (this.locale ? (this.nzAction ? this.locale.uploadError : this.locale.uploadStorage) : 'loading...');
        };
        UploadListComponent.prototype.extname = function (url) {
            var temp = url.split('/');
            var filename = temp[temp.length - 1];
            var filenameWithoutSuffix = filename.split(/#|\?/)[0];
            return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
        };
        UploadListComponent.prototype.isImageUrl = function (file) {
            if (isImageFileType(file.type)) {
                return true;
            }
            var url = (file.thumbUrl || file.url || '');
            if (!url) {
                return false;
            }
            var extension = this.extname(url);
            if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg)$/i.test(extension)) {
                return true;
            }
            else if (/^data:/.test(url)) {
                // other file types of base64
                return false;
            }
            else if (extension) {
                // other file types which have extension
                return false;
            }
            return true;
        };
        UploadListComponent.prototype.getIconType = function (file) {
            if (!this.showPic) {
                return '';
            }
            if (file.isUploading || (!file.thumbUrl && !file.url)) {
                return 'uploading';
            }
            else {
                return 'thumbnail';
            }
        };
        UploadListComponent.prototype.previewImage = function (file) {
            var _this = this;
            return new Promise(function (resolve) {
                if (!isImageFileType(file.type)) {
                    resolve('');
                    return;
                }
                _this.ngZone.runOutsideAngular(function () {
                    var canvas = _this.doc.createElement('canvas');
                    canvas.width = MEASURE_SIZE;
                    canvas.height = MEASURE_SIZE;
                    canvas.style.cssText = "position: fixed; left: 0; top: 0; width: " + MEASURE_SIZE + "px; height: " + MEASURE_SIZE + "px; z-index: 9999; display: none;";
                    _this.doc.body.appendChild(canvas);
                    var ctx = canvas.getContext('2d');
                    var img = new Image();
                    img.onload = function () {
                        var width = img.width, height = img.height;
                        var drawWidth = MEASURE_SIZE;
                        var drawHeight = MEASURE_SIZE;
                        var offsetX = 0;
                        var offsetY = 0;
                        if (width < height) {
                            drawHeight = height * (MEASURE_SIZE / width);
                            offsetY = -(drawHeight - drawWidth) / 2;
                        }
                        else {
                            drawWidth = width * (MEASURE_SIZE / height);
                            offsetX = -(drawWidth - drawHeight) / 2;
                        }
                        try {
                            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                        }
                        catch (_a) { }
                        var dataURL = canvas.toDataURL();
                        _this.doc.body.removeChild(canvas);
                        resolve(dataURL);
                    };
                    img.src = window.URL.createObjectURL(file);
                });
            });
        };
        UploadListComponent.prototype.genThumb = function () {
            var _this = this;
            if (!this.platform.isBrowser) {
                return;
            }
            var win = window;
            if (!this.showPic || typeof document === 'undefined' || typeof win === 'undefined' || !win.FileReader || !win.File) {
                return;
            }
            this.list
                .filter(function (file) { return file.originFileObj instanceof File && file.thumbUrl === undefined; })
                .forEach(function (file) {
                file.thumbUrl = '';
                (_this.previewFile ? _this.previewFile(file).toPromise() : _this.previewImage(file.originFileObj)).then(function (dataUrl) {
                    file.thumbUrl = dataUrl;
                    _this.detectChanges();
                });
            });
        };
        UploadListComponent.prototype.listItemNameCls = function (file) {
            var _b;
            var count = [this.showDownload(file), this.icons.showRemoveIcon].filter(function (x) { return x; }).length;
            return _b = {},
                _b["ant-upload-list-item-name"] = true,
                _b["ant-upload-list-item-name-icon-count-" + count] = true,
                _b;
        };
        UploadListComponent.prototype.showDownload = function (file) {
            return !!(this.icons.showDownloadIcon && file.status === 'done');
        };
        UploadListComponent.prototype.fixData = function () {
            var _this = this;
            this.list.forEach(function (file) {
                file.isUploading = file.status === 'uploading';
                file.message = _this.genErr(file);
                file.linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
                file.isImageUrl = _this.isImageUrl(file);
                file.iconType = _this.getIconType(file);
                file.listItemNameCls = _this.listItemNameCls(file);
                file.showDownload = _this.showDownload(file);
            });
        };
        UploadListComponent.prototype.handlePreview = function (file, e) {
            if (!this.onPreview) {
                return;
            }
            e.preventDefault();
            return this.onPreview(file);
        };
        UploadListComponent.prototype.handleRemove = function (file, e) {
            e.preventDefault();
            if (this.onRemove) {
                this.onRemove(file);
            }
            return;
        };
        UploadListComponent.prototype.handleDownload = function (file) {
            if (typeof this.onDownload === 'function') {
                this.onDownload(file);
            }
            else if (file.url) {
                window.open(file.url);
            }
        };
        UploadListComponent.prototype.detectChanges = function () {
            this.fixData();
            this.cdr.detectChanges();
        };
        UploadListComponent.prototype.ngOnChanges = function () {
            this.fixData();
            this.genThumb();
        };
        UploadListComponent.prototype.sortChange = function (e) {
            this.list = e;
            this.listChange.emit(e);
        };
        return UploadListComponent;
    }());
    __decorate([
        i0.Input()
    ], exports.ɵe.prototype, "locale", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵe.prototype, "nzSort", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵe.prototype, "listType", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵe.prototype, "nzAction", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵe.prototype, "items", null);
    __decorate([
        i0.Input()
    ], exports.ɵe.prototype, "icons", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵe.prototype, "onPreview", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵe.prototype, "onRemove", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵe.prototype, "onDownload", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵe.prototype, "previewFile", void 0);
    __decorate([
        i0.Input()
    ], exports.ɵe.prototype, "iconRender", void 0);
    __decorate([
        i0.Output()
    ], exports.ɵe.prototype, "listChange", void 0);
    exports.ɵe = __decorate([
        i0.Component({
            selector: 'nz-upload-list',
            exportAs: 'nzUploadList',
            template: "<!-- <div *ngFor=\"let item of list\">{{item.name}}</div> -->\r\n<az-droppable *ngIf=\"list\" [data]=\"list\" [disabled]=\"!nzSort\" [renderItem]=\"renderItems\" (zdSortChange)=\"sortChange($event)\"></az-droppable>\r\n<ng-template #renderItems let-file>\r\n  <div class=\"ant-upload-list-item ant-upload-list-item-{{\r\n    file.status\r\n  }} ant-upload-list-item-list-type-{{ listType }}\">\r\n  <ng-template #icon>\r\n    <ng-container [ngSwitch]=\"file.iconType\">\r\n      <div *ngSwitchCase=\"'uploading'\" class=\"ant-upload-list-item-thumbnail\"\r\n        [class.ant-upload-list-item-file]=\"!file.isUploading\">\r\n        <ng-template [ngTemplateOutlet]=\"iconNode\" [ngTemplateOutletContext]=\"{ $implicit: file }\"></ng-template>\r\n      </div>\r\n      <a *ngSwitchCase=\"'thumbnail'\" class=\"ant-upload-list-item-thumbnail\"\r\n        [class.ant-upload-list-item-file]=\"!file.isImageUrl\" target=\"_blank\" rel=\"noopener noreferrer\"\r\n        [href]=\"file.url || file.thumbUrl\" (click)=\"handlePreview(file, $event)\">\r\n        <img *ngIf=\"file.isImageUrl; else noImageThumbTpl\" class=\"ant-upload-list-item-image\"\r\n          [src]=\"file.thumbUrl || file.url\" [attr.alt]=\"file.name\" />\r\n      </a>\r\n      <span *ngSwitchDefault class=\"ant-upload-text-icon\">\r\n        <ng-template [ngTemplateOutlet]=\"iconNode\" [ngTemplateOutletContext]=\"{ $implicit: file }\"></ng-template>\r\n      </span>\r\n    </ng-container>\r\n    <ng-template #noImageThumbTpl>\r\n      <ng-template [ngTemplateOutlet]=\"iconNode\" [ngTemplateOutletContext]=\"{ $implicit: file }\"></ng-template>\r\n    </ng-template>\r\n  </ng-template>\r\n  <ng-template #iconNode let-file>\r\n    <ng-container *ngIf=\"!iconRender; else iconRender\">\r\n      <ng-container [ngSwitch]=\"listType\">\r\n        <ng-container *ngSwitchCase=\"'picture'\">\r\n          <ng-container *ngIf=\"file.isUploading; else iconNodeFileIcon\">\r\n            <i nz-icon nzType=\"loading\"></i>\r\n          </ng-container>\r\n        </ng-container>\r\n        <ng-container *ngSwitchCase=\"'picture-card'\">\r\n          <ng-container *ngIf=\"file.isUploading; else iconNodeFileIcon\">{{\r\n            locale.uploading\r\n          }}</ng-container>\r\n        </ng-container>\r\n        <i *ngSwitchDefault nz-icon [nzType]=\"file.isUploading ? 'loading' : 'paper-clip'\"></i>\r\n      </ng-container>\r\n    </ng-container>\r\n    <ng-template #iconNodeFileIcon>\r\n      <i nz-icon [nzType]=\"file.isImageUrl ? 'picture' : 'file'\" nzTheme=\"twotone\"></i>\r\n    </ng-template>\r\n  </ng-template>\r\n  <ng-template #downloadOrDelete>\r\n    <span *ngIf=\"listType !== 'picture-card'\"\r\n      class=\"ant-upload-list-item-card-actions {{ listType === 'picture' ? 'picture' : '' }}\">\r\n      <a *ngIf=\"file.showDownload\" title=\"{{ locale.downloadFile }}\">\r\n        <ng-template [ngTemplateOutlet]=\"downloadIcon\"></ng-template>\r\n      </a>\r\n      <a *ngIf=\"icons.showRemoveIcon\" title=\"{{ locale.removeFile }}\">\r\n        <ng-template [ngTemplateOutlet]=\"removeIcon\"></ng-template>\r\n      </a>\r\n    </span>\r\n  </ng-template>\r\n  <ng-template #preview>\r\n    <a *ngIf=\"file.url\" target=\"_blank\" rel=\"noopener noreferrer\" [ngClass]=\"file.listItemNameCls!\"\r\n      [attr.title]=\"file.name\" [href]=\"file.url\" [attr.download]=\"file.linkProps && file.linkProps.download\"\r\n      (click)=\"handlePreview(file, $event)\">{{ file.name }}</a>\r\n    <span *ngIf=\"!file.url\" [ngClass]=\"file.listItemNameCls!\" [attr.title]=\"file.name\"\r\n      (click)=\"handlePreview(file, $event)\">{{ file.name }}</span>\r\n    <ng-template [ngTemplateOutlet]=\"downloadOrDelete\"></ng-template>\r\n  </ng-template>\r\n  <ng-template #removeIcon>\r\n    <i *ngIf=\"icons.showRemoveIcon\" (click)=\"handleRemove(file, $event)\" nz-icon nzType=\"delete\"\r\n      title=\"{{ locale.removeFile }}\"></i>\r\n  </ng-template>\r\n  <ng-template #downloadIcon>\r\n    <i *ngIf=\"file.showDownload\" (click)=\"handleDownload(file)\" nz-icon nzType=\"download\"\r\n      title=\"{{ locale.downloadFile }}\"></i>\r\n  </ng-template>\r\n  <div class=\"ant-upload-list-item-info\">\r\n    <span>\r\n      <ng-template [ngTemplateOutlet]=\"icon\"></ng-template>\r\n      <ng-template [ngTemplateOutlet]=\"preview\"></ng-template>\r\n    </span>\r\n  </div>\r\n  <span *ngIf=\"listType === 'picture-card' && !file.isUploading\" class=\"ant-upload-list-item-actions\">\r\n    <a *ngIf=\"icons.showPreviewIcon\" [href]=\"file.url || file.thumbUrl\" target=\"_blank\" rel=\"noopener noreferrer\"\r\n      title=\"{{ locale.previewFile }}\"\r\n      [ngStyle]=\"!(file.url || file.thumbUrl) ? { opacity: 0.5, 'pointer-events': 'none' } : null\"\r\n      (click)=\"handlePreview(file, $event)\">\r\n      <i nz-icon nzType=\"eye\"></i>\r\n    </a>\r\n    <ng-template [ngTemplateOutlet]=\"downloadIcon\"></ng-template>\r\n    <ng-template [ngTemplateOutlet]=\"removeIcon\"></ng-template>\r\n  </span>\r\n  <div *ngIf=\"file.isUploading\" class=\"ant-upload-list-item-progress\">\r\n    <nz-progress [nzPercent]=\"file.percent!\" nzType=\"line\" [nzShowInfo]=\"false\" [nzStrokeWidth]=\"2\"></nz-progress>\r\n  </div>\r\n</div>\r\n</ng-template>\r\n",
            animations: [
                animations.trigger('itemState', [
                    animations.transition(':enter', [animations.style({ height: '0', width: '0', opacity: 0 }), animations.animate(150, animations.style({ height: '*', width: '*', opacity: 1 }))]),
                    animations.transition(':leave', [animations.animate(150, animations.style({ height: '0', width: '0', opacity: 0 }))])
                ])
            ],
            host: {
                '[class.ant-upload-list]': "true",
                '[class.ant-upload-list-text]': "listType === 'text'",
                '[class.ant-upload-list-picture]': "listType === 'picture'",
                '[class.ant-upload-list-picture-card]': "listType === 'picture-card'"
            },
            preserveWhitespaces: false,
            encapsulation: i0.ViewEncapsulation.None,
            changeDetection: i0.ChangeDetectionStrategy.OnPush
        }),
        __param(1, i0.Inject(common.DOCUMENT))
    ], exports.ɵe);

    exports.ɵh = /** @class */ (function () {
        function RenderPipe(sanitizer) {
            this.sanitizer = sanitizer;
        }
        RenderPipe.prototype.transform = function (value, row, columnCode, render) {
            if (render === void 0) { render = function (row, columnCode) { return ""; }; }
            return this.sanitizer.bypassSecurityTrustHtml(render(row, columnCode));
        };
        return RenderPipe;
    }());
    exports.ɵh = __decorate([
        i0.Pipe({
            name: 'renderPipe'
        })
    ], exports.ɵh);

    // let _ = require("lodash");
    exports.ɵi = /** @class */ (function () {
        function TablePipe() {
        }
        TablePipe.prototype.transform = function (value, items) {
            value = value + '';
            if (items && items.length >= 0) {
                if (!_.isEmpty(value)) {
                    var valueArr = value.split(',');
                    var resultArr = new Array();
                    for (var n = 0; n < valueArr.length; n++) {
                        for (var i = 0; i < items.length; i++) {
                            if (valueArr[n] == items[i].code + '') {
                                resultArr.push(items[i].label);
                                break;
                            }
                        }
                    }
                    return resultArr.join(",");
                }
                else {
                    return "";
                }
            }
            else {
                return value;
            }
        };
        return TablePipe;
    }());
    exports.ɵi = __decorate([
        i0.Pipe({
            name: 'tablePipe'
        })
    ], exports.ɵi);

    var thirdComponents = [
        exports.DroppableComponent,
        exports.ɵb,
        exports.TableColumnsButtonsComponent,
        exports.TableComponent,
        exports.ɵc,
        exports.ɵe,
        exports.UploadComponent,
        exports.ɵf,
        exports.ɵg
    ];
    var thirdModule = [
        ngZorroAntd.NzCardModule,
        ngZorroAntd.NzIconModule,
        ngZorroAntd.NzTabsModule,
        ngZorroAntd.NzButtonModule,
        ngZorroAntd.NzDividerModule,
        ngZorroAntd.NzTableModule,
        ngZorroAntd.NzSpinModule,
        ngZorroAntd.NzCheckboxModule,
        ngZorroAntd.NzRadioModule,
        ngZorroAntd.NzProgressModule,
        ngZorroAntd.NzEmptyModule
    ];
    var pipe_lists = [
        exports.ɵh,
        exports.ɵi,
    ];
    common.registerLocaleData(en);
    var icons = [icons$1.AccountBookFill, icons$1.AlertOutline, icons$1.AlertFill];
    exports.NgZoesModule = /** @class */ (function () {
        function NgZoesModule() {
        }
        return NgZoesModule;
    }());
    exports.NgZoesModule = __decorate([
        i0.NgModule({
            declarations: __spread(thirdComponents, pipe_lists),
            imports: __spread([
                common.CommonModule,
                i18n.NzI18nModule,
                exports.LocaleModule,
                i1$2.HttpClientModule,
                i1$1.OverlayModule,
                animations$1.BrowserAnimationsModule,
                forms.FormsModule,
                ngZorroAntd.NzIconModule.forRoot(icons),
                ngxSortablejs.SortablejsModule.forRoot({ animation: 150 })
            ], thirdModule),
            providers: [ngZorroAntd.NzModalService],
            entryComponents: [exports.ɵf, exports.ɵg],
            exports: __spread(thirdComponents)
        })
    ], exports.NgZoesModule);

    // 国际化

    exports.ɵa = /** @class */ (function () {
        function TableService(httpClient) {
            this.httpClient = httpClient;
        }
        TableService.prototype.patchHero = function (url, params) {
            return this.httpClient.request('GET', url, params);
        };
        return TableService;
    }());
    exports.ɵa.ɵprov = i0.ɵɵdefineInjectable({ factory: function TableService_Factory() { return new exports.ɵa(i0.ɵɵinject(i1$2.HttpClient)); }, token: exports.ɵa, providedIn: "root" });
    exports.ɵa = __decorate([
        i0.Injectable({
            providedIn: 'root'
        })
    ], exports.ɵa);

    exports.ɵd = /** @class */ (function () {
        function FilesServiceService() {
            var _this = this;
            this.compress = function (file, quality, convertSize) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!/image\/\w+/.test(file.type)) {
                        return [2 /*return*/, false];
                    }
                    if (file.size < convertSize) {
                        return [2 /*return*/, false];
                    }
                    // 进行图片压缩
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            new ImageCompressor().compress(file, {
                                quality: quality,
                                maxWidth: 1000,
                                maxHeight: 1000,
                                convertSize: 614400,
                                success: function (result) {
                                    resolve(new File([result], file.name, { type: file.type }));
                                },
                                error: function (e) {
                                    reject(e);
                                }
                            });
                        })];
                });
            }); };
        }
        return FilesServiceService;
    }());
    exports.ɵd.ɵprov = i0.ɵɵdefineInjectable({ factory: function FilesServiceService_Factory() { return new exports.ɵd(); }, token: exports.ɵd, providedIn: "root" });
    exports.ɵd = __decorate([
        i0.Injectable({
            providedIn: 'root'
        })
    ], exports.ɵd);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.LOCALE_SERVICE_PROVIDER = LOCALE_SERVICE_PROVIDER;
    exports.LOCALE_SERVICE_PROVIDER_FACTORY = LOCALE_SERVICE_PROVIDER_FACTORY;
    exports.NzShowUploadListInterface = NzShowUploadListInterface;
    exports.ZOE_LOCALE = ZOE_LOCALE;
    exports.en_US = enUS;
    exports.zh_CN = zhCN;
    exports.zh_TW = zhTW;
    exports.ɵ0 = ɵ0;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zoes.umd.js.map
