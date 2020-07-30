import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let CardComponent = class CardComponent {
    constructor(router) {
        this.router = router;
        this.loading = false;
        this._selectedIndex = 0;
    }
    ngOnInit() {
        console.log(this.options);
    }
    _getExtraLink(link) {
        console.log("link:" + link);
        if (link == 'back') {
            history.go(-1);
        }
        else {
            this.router.navigateByUrl(link);
        }
    }
    _selectChange(args) {
        this._selectedIndex = args[0].index;
    }
};
__decorate([
    Input()
], CardComponent.prototype, "options", void 0);
__decorate([
    Input()
], CardComponent.prototype, "loading", void 0);
CardComponent = __decorate([
    Component({
        selector: 'zc',
        template: "<nz-card [nzTitle]=\"options.title\" [nzLoading]=\"loading\" [nzExtra]=\"options.extra?extraTpl:null\" [nzBordered]=\"options.bordered\">\r\n  <ng-template #extraTpl>\r\n\r\n    <ng-container *ngIf=\"options.extra.type =='button';else extraLink\">\r\n      <button *ngFor=\"let item of options.extra.buttons\"\r\n        (click)=\"item.link?_getExtraLink(item.link):(item.click?item.click():null)\" [nzDanger]=\"item.danger\"\r\n        [disabled]=\"item.diabled\" nz-button [nzType]=\"item.type\">{{item.text}}</button>\r\n    </ng-container>\r\n\r\n    <ng-template #extraLink>\r\n      <a nz-button *ngFor=\"let item of options.extra.buttons\" nzType=\"link\" [nzDanger]=\"item.danger\"\r\n        [disabled]=\"item.diabled\"\r\n        (click)=\"item.link?_getExtraLink(item.link):(item.click?item.click():null)\">{{item.text}}</a>\r\n    </ng-template>\r\n\r\n\r\n  </ng-template>\r\n\r\n  <nz-card-tab *ngIf=\"options.tabs\">\r\n    <nz-tabset [nzSize]=\"options.tabs.size\" [nzSelectedIndex]=\"_selectedIndex\"\r\n      (nzSelectChange)=\"_selectChange([$event])\">\r\n      <nz-tab *ngFor=\"let item of options.tabs.values; let i=index\" [nzTitle]=\"item.title\" [nzDisabled]=\"item.disabled\">\r\n      </nz-tab>\r\n    </nz-tabset>\r\n\r\n  </nz-card-tab>\r\n  <ng-container *ngIf=\"options.tabs.values\">\r\n    <ng-template [ngTemplateOutlet]=\"options.tabs.values[_selectedIndex].component\"></ng-template>\r\n  </ng-container>\r\n\r\n\r\n  <ng-content></ng-content>\r\n\r\n\r\n</nz-card>\r\n",
        styles: ["[nz-button]{margin-bottom:12px;margin-right:8px}"]
    })
], CardComponent);
export { CardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy16b2VzL2xpYi9jb21wb25lbnRzL2NhcmQvY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQVN4RSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBS3hCLFlBQ1UsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFKZixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ2xDLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO0lBSWYsQ0FBQztJQUVMLFFBQVE7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBRUQsYUFBYSxDQUFDLElBQVk7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNmO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNoQztJQUNILENBQUM7SUFHRCxhQUFhLENBQUMsSUFBVztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7SUFDckMsQ0FBQztDQUVGLENBQUE7QUExQlU7SUFBUixLQUFLLEVBQUU7OENBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFOzhDQUEwQjtBQUZ2QixhQUFhO0lBTHpCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxJQUFJO1FBQ2QsNitDQUFvQzs7S0FFckMsQ0FBQztHQUNXLGFBQWEsQ0EyQnpCO1NBM0JZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgWkNPcHRpb25zIH0gZnJvbSAnLi9jYXJkLmludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3pjJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2FyZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY2FyZC5jb21wb25lbnQuc3R5bCddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBvcHRpb25zOiBaQ09wdGlvbnM7XHJcbiAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIF9zZWxlY3RlZEluZGV4ID0gMDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2codGhpcy5vcHRpb25zKVxyXG4gIH1cclxuXHJcbiAgX2dldEV4dHJhTGluayhsaW5rOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUubG9nKFwibGluazpcIiArIGxpbmspO1xyXG4gICAgaWYgKGxpbmsgPT0gJ2JhY2snKSB7XHJcbiAgICAgIGhpc3RvcnkuZ28oLTEpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGxpbmspXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgX3NlbGVjdENoYW5nZShhcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGFyZ3NbMF0uaW5kZXhcclxuICB9XHJcblxyXG59XHJcbiJdfQ==