import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let TableColumnsButtonsComponent = class TableColumnsButtonsComponent {
    constructor() {
        this.type = 'button'; //button or link
        this.extButtons = [];
        this.normalButtons = [];
    }
    ngOnInit() {
        var canAccessActions = [];
        for (const iterator of this.buttons) {
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
        this.normalButtons = canAccessActions;
    }
};
__decorate([
    Input()
], TableColumnsButtonsComponent.prototype, "buttons", void 0);
__decorate([
    Input()
], TableColumnsButtonsComponent.prototype, "type", void 0);
__decorate([
    Input()
], TableColumnsButtonsComponent.prototype, "row", void 0);
__decorate([
    Input()
], TableColumnsButtonsComponent.prototype, "rowIndex", void 0);
__decorate([
    Input()
], TableColumnsButtonsComponent.prototype, "extButtons", void 0);
TableColumnsButtonsComponent = __decorate([
    Component({
        selector: 'table-columns-buttons',
        template: "<ng-container>\r\n    <nz-button-group *ngIf=\"type=='button'\">\r\n      <button nz-button *ngFor=\"let action of normalButtons\" [nzType]=\"action.type\" (click)=\"action.click(row,rowIndex)\">{{action.text}}</button>\r\n    </nz-button-group>\r\n    <ng-container  *ngIf=\"type=='link'\">\r\n      <ng-container *ngFor=\"let action of normalButtons;let $index = index;\">\r\n          <a (click)=\"action.click(row,rowIndex)\">{{action.text}}</a>\r\n          <nz-divider *ngIf=\"$index!=normalButtons.length-1\" nzType=\"vertical\"></nz-divider>\r\n      </ng-container>\r\n    </ng-container>\r\n</ng-container>\r\n\r\n",
        styles: ["button{margin-right:12px}"]
    })
], TableColumnsButtonsComponent);
export { TableColumnsButtonsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29sdW1ucy1idXR0b25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXpvZXMvbGliL2NvbXBvbmVudHMvdGFibGUvdGFibGUtY29sdW1ucy1idXR0b25zL3RhYmxlLWNvbHVtbnMtYnV0dG9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3pELElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTRCO0lBV3ZDO1FBUlMsU0FBSSxHQUFPLFFBQVEsQ0FBQyxDQUFFLGdCQUFnQjtRQUd0QyxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBR3pCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO0lBRUgsQ0FBQztJQUVqQixRQUFRO1FBQ04sSUFBSSxnQkFBZ0IsR0FBUSxFQUFFLENBQUM7UUFDL0IsS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ25DLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUMxQixPQUFPO2dCQUNQLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUNuRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7aUJBQU07Z0JBQ0wsT0FBTztnQkFDUCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakM7U0FDRjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLENBQUE7SUFDdkMsQ0FBQztDQUVGLENBQUE7QUEzQlU7SUFBUixLQUFLLEVBQUU7NkRBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTswREFBcUI7QUFDcEI7SUFBUixLQUFLLEVBQUU7eURBQVU7QUFDVDtJQUFSLEtBQUssRUFBRTs4REFBa0I7QUFDakI7SUFBUixLQUFLLEVBQUU7Z0VBQWlCO0FBTmQsNEJBQTRCO0lBTHhDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsNG5CQUFxRDs7S0FFdEQsQ0FBQztHQUNXLDRCQUE0QixDQTZCeEM7U0E3QlksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3RhYmxlLWNvbHVtbnMtYnV0dG9ucycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLWNvbHVtbnMtYnV0dG9ucy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUtY29sdW1ucy1idXR0b25zLmNvbXBvbmVudC5zdHlsJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYmxlQ29sdW1uc0J1dHRvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSBidXR0b25zOiBhbnk7XHJcbiAgQElucHV0KCkgdHlwZTphbnkgPSAnYnV0dG9uJzsgIC8vYnV0dG9uIG9yIGxpbmtcclxuICBASW5wdXQoKSByb3c6IGFueTtcclxuICBASW5wdXQoKSByb3dJbmRleDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGV4dEJ1dHRvbnMgPSBbXTtcclxuXHJcblxyXG4gIG5vcm1hbEJ1dHRvbnMgPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB2YXIgY2FuQWNjZXNzQWN0aW9uczogYW55ID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIHRoaXMuYnV0dG9ucykge1xyXG4gICAgICBpZiAoaXRlcmF0b3JbJ3Blcm1pc3Npb24nXSkge1xyXG4gICAgICAgIC8v5pyJ5p2D6ZmQ6ZmQ5Yi2XHJcbiAgICAgICAgaWYgKGl0ZXJhdG9yWydwZXJtaXNzaW9uJ10odGhpcy5yb3csIHRoaXMucm93SW5kZXgpKSB7XHJcbiAgICAgICAgICBjYW5BY2Nlc3NBY3Rpb25zLnB1c2goaXRlcmF0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL+aXoOadg+mZkOmZkOWItlxyXG4gICAgICAgIGNhbkFjY2Vzc0FjdGlvbnMucHVzaChpdGVyYXRvcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubm9ybWFsQnV0dG9ucyA9IGNhbkFjY2Vzc0FjdGlvbnNcclxuICB9XHJcblxyXG59XHJcbiJdfQ==