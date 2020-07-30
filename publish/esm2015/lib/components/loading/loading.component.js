import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
const loaderAllType = [
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
let LoadingComponent = class LoadingComponent {
    constructor() {
        this.type = 'ball-beat';
        this.loading = false;
        this.color = "#000";
        this.className = 'ball-beat';
        this.loadList = [1, 1, 1,];
        this._size = 10;
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        if (changes['type']) {
            this._getLoader(changes['type'].currentValue);
        }
        if (changes['size']) {
            this._getSize(changes['size'].currentValue);
        }
    }
    _getSize(size) {
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
    }
    _getLoader(type) {
        for (const iterator of loaderAllType) {
            if (iterator.type == type) {
                this.loadList = new Array(iterator.num);
            }
        }
        this.className = type;
    }
};
__decorate([
    Input()
], LoadingComponent.prototype, "type", void 0);
__decorate([
    Input()
], LoadingComponent.prototype, "loading", void 0);
__decorate([
    Input()
], LoadingComponent.prototype, "color", void 0);
__decorate([
    Input()
], LoadingComponent.prototype, "size", void 0);
LoadingComponent = __decorate([
    Component({
        selector: 'az-loading',
        template: "\r\n\r\n<nz-spin style=\"min-width:100%;min-height:100%;\" [nzSpinning]=\"loading\" [nzDelay]=\"500\" [nzIndicator]=\"indicatorTemplate\"> \r\n  <ng-content></ng-content>\r\n</nz-spin>\r\n<ng-template #indicatorTemplate>\r\n    <div class=\"loader\" style=\"position: absolute;top: 50%;left: 50%;margin: -10px;\">\r\n        <div class=\"loader-inner {{className}}\" >\r\n          <div *ngFor=\"let item of loadList\" [ngStyle]=\"{'background': color?color:null,'width':_size+'px',height:_size+'px'}\"></div>\r\n        </div>\r\n      </div>\r\n</ng-template>",
        styles: [":host{align-items:center;background-color:hsla(0,0%,100%,.5);display:block;height:100%;justify-content:center;width:100%}"]
    })
], LoadingComponent);
export { LoadingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy16b2VzL2xpYi9jb21wb25lbnRzL2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUl4RSxNQUFNLGFBQWEsR0FBUTtJQUN6QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztJQUMvQixFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHO0lBQ3BDLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUc7SUFDckMsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztJQUMzQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztJQUNoQyxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHO0lBQzlDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUc7SUFDcEMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUc7SUFDaEMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztJQUNwQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztJQUNqQyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHO0lBQ3pDLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUc7SUFDdkMsRUFBRSxJQUFJLEVBQUUsWUFBWSxF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QixDQUFDO0NBQ0YsQ0FBQTtBQTVDVTtJQUFSLEtBQUssRUFBRTs4Q0FBa0M7QUFDakM7SUFBUixLQUFLLEVBQUU7aURBQTJCO0FBQzFCO0lBQVIsS0FBSyxFQUFFOytDQUF5QjtBQUN4QjtJQUFSLEtBQUssRUFBRTs4Q0FBc0I7QUFMbkIsZ0JBQWdCO0lBTDVCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxZQUFZO1FBQ3RCLDZqQkFBdUM7O0tBRXhDLENBQUM7R0FDVyxnQkFBZ0IsQ0E4QzVCO1NBOUNZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBWkxvYWRpbmdUeXBlLCBBWkxvYWRpbmdTaXplIH0gZnJvbSAnLi9sb2FkaW5nLmludGVyZmFjZSc7XHJcblxyXG5cclxuY29uc3QgbG9hZGVyQWxsVHlwZTogYW55ID0gW1xyXG4gIHsgdHlwZTogJ2JhbGwtcHVsc2UnLCBudW06IDMsIH0sXHJcbiAgeyB0eXBlOiAnYmFsbC1ncmlkLXB1bHNlJywgbnVtOiA5LCB9LFxyXG4gIHsgdHlwZTogJ2JhbGwtY2xpcC1yb3RhdGUnLCBudW06IDEsIH0sXHJcbiAgeyB0eXBlOiAnYmFsbC1jbGlwLXJvdGF0ZS1wdWxzZScsIG51bTogMiwgfSxcclxuICB7IHR5cGU6ICdzcXVhcmUtc3BpbicsIG51bTogMSwgfSxcclxuICB7IHR5cGU6ICdiYWxsLWNsaXAtcm90YXRlLW11bHRpcGxlJywgbnVtOiAyLCB9LFxyXG4gIHsgdHlwZTogJ2JhbGwtcHVsc2UtcmlzZScsIG51bTogNSwgfSxcclxuICB7IHR5cGU6ICdiYWxsLXJvdGF0ZScsIG51bTogMSwgfSxcclxuICB7IHR5cGU6ICdjdWJlLXRyYW5zaXRpb24nLCBudW06IDIsIH0sXHJcbiAgeyB0eXBlOiAnYmFsbC16aWctemFnJywgbnVtOiAyLCB9LFxyXG4gIHsgdHlwZTogJ2JhbGwtemlnLXphZy1kZWZsZWN0JywgbnVtOiAyLCB9LFxyXG4gIHsgdHlwZTogJ2JhbGwtdHJpYW5nbGUtcGF0aCcsIG51bTogMywgfSxcclxuICB7IHR5cGU6ICdiYWxsLXNjYWxlJywgbnVtOiAxLCB9LFxyXG4gIHsgdHlwZTogJ2xpbmUtc2NhbGUnLCBudW06IDUsIH0sXHJcbiAgeyB0eXBlOiAnbGluZS1zY2FsZS1wYXJ0eScsIG51bTogNCwgfSxcclxuICB7IHR5cGU6ICdiYWxsLXNjYWxlLW11bHRpcGxlJywgbnVtOiAzLCB9LFxyXG4gIHsgdHlwZTogJ2JhbGwtcHVsc2Utc3luYycsIG51bTogMywgfSxcclxuICB7IHR5cGU6ICdiYWxsLWJlYXQnLCBudW06IDMsIH0sXHJcbiAgeyB0eXBlOiAnbGluZS1zY2FsZS1wdWxzZS1vdXQnLCBudW06IDUsIH0sXHJcbiAgeyB0eXBlOiAnbGluZS1zY2FsZS1wdWxzZS1vdXQtcmFwaWQnLCBudW06IDUsIH0sXHJcbiAgeyB0eXBlOiAnYmFsbC1zY2FsZS1yaXBwbGUnLCBudW06IDEsIH0sXHJcbiAgeyB0eXBlOiAnYmFsbC1zY2FsZS1yaXBwbGUtbXVsdGlwbGUnLCBudW06IDMsIH0sXHJcbiAgeyB0eXBlOiAnYmFsbC1zcGluLWZhZGUtbG9hZGVyJywgbnVtOiA4LCB9LFxyXG4gIHsgdHlwZTogJ2xpbmUtc3Bpbi1mYWRlLWxvYWRlcicsIG51bTogOCwgfSxcclxuICB7IHR5cGU6ICd0cmlhbmdsZS1za2V3LXNwaW4nLCBudW06IDEsIH0sXHJcbiAgeyB0eXBlOiAncGFjbWFuJywgbnVtOiA1LCB9LFxyXG4gIHsgdHlwZTogJ2JhbGwtZ3JpZC1iZWF0JywgbnVtOiA5LCB9LFxyXG4gIHsgdHlwZTogJ3NlbWktY2lyY2xlLXNwaW4nLCBudW06IDEsIH0sXHJcbl1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXotbG9hZGluZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xvYWRpbmcuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xvYWRpbmcuY29tcG9uZW50LnN0eWwnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9hZGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIEBJbnB1dCgpIHR5cGU/OiBBWkxvYWRpbmdUeXBlPSdiYWxsLWJlYXQnO1xyXG4gIEBJbnB1dCgpIGxvYWRpbmc/OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgY29sb3I/OiBzdHJpbmcgPSBcIiMwMDBcIjtcclxuICBASW5wdXQoKSBzaXplPzogQVpMb2FkaW5nU2l6ZTtcclxuXHJcbiAgY2xhc3NOYW1lOiBBWkxvYWRpbmdUeXBlID0gJ2JhbGwtYmVhdCc7XHJcbiAgbG9hZExpc3Q6IGFueSA9IFsxLDEsMSxdO1xyXG4gIF9zaXplOiBudW1iZXIgPSAxMDtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIC8vQ2FsbGVkIGJlZm9yZSBhbnkgb3RoZXIgbGlmZWN5Y2xlIGhvb2suIFVzZSBpdCB0byBpbmplY3QgZGVwZW5kZW5jaWVzLCBidXQgYXZvaWQgYW55IHNlcmlvdXMgd29yayBoZXJlLlxyXG4gICAgLy9BZGQgJyR7aW1wbGVtZW50cyBPbkNoYW5nZXN9JyB0byB0aGUgY2xhc3MuXHJcbiAgICBpZiAoY2hhbmdlc1sndHlwZSddKSB7XHJcbiAgICAgIHRoaXMuX2dldExvYWRlcihjaGFuZ2VzWyd0eXBlJ10uY3VycmVudFZhbHVlKVxyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ3NpemUnXSkge1xyXG4gICAgICB0aGlzLl9nZXRTaXplKGNoYW5nZXNbJ3NpemUnXS5jdXJyZW50VmFsdWUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfZ2V0U2l6ZShzaXplKSB7XHJcbiAgICBzd2l0Y2ggKHNpemUpIHtcclxuICAgICAgY2FzZSAnc2FtbGwnOlxyXG4gICAgICAgIHRoaXMuX3NpemUgPSA1XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xhcmdlJzpcclxuICAgICAgICB0aGlzLl9zaXplID0gMTVcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDogdGhpcy5fc2l6ZSA9IDEwXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIF9nZXRMb2FkZXIodHlwZSkge1xyXG4gICAgZm9yIChjb25zdCBpdGVyYXRvciBvZiBsb2FkZXJBbGxUeXBlKSB7XHJcbiAgICAgIGlmIChpdGVyYXRvci50eXBlID09IHR5cGUpIHtcclxuICAgICAgICB0aGlzLmxvYWRMaXN0ID0gbmV3IEFycmF5KGl0ZXJhdG9yLm51bSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuY2xhc3NOYW1lID0gdHlwZVxyXG4gIH1cclxufVxyXG5cclxuXHJcbiJdfQ==