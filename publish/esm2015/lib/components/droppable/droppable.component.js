import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let DroppableComponent = class DroppableComponent {
    constructor() {
        this.disabled = false;
        this.zdSortChange = new EventEmitter();
        this.options = {
            onUpdate: (event) => {
                this.zdSortChange.emit(this.data);
            }
        };
    }
    ngOnInit() {
        this._setOption(this.disabled);
    }
    ngOnChanges(changes) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        if (changes['disabled']) {
            this._disabledChange(changes['disabled'].currentValue);
        }
    }
    _disabledChange(value) {
        this._setOption(value);
    }
    _setOption(value) {
        this.disabled = value;
    }
};
__decorate([
    Input()
], DroppableComponent.prototype, "data", void 0);
__decorate([
    Input()
], DroppableComponent.prototype, "renderItem", void 0);
__decorate([
    Input()
], DroppableComponent.prototype, "disabled", void 0);
__decorate([
    Output()
], DroppableComponent.prototype, "zdSortChange", void 0);
DroppableComponent = __decorate([
    Component({
        selector: 'az-droppable',
        template: "<!-- <p>\u62D6\u62FD\uFF1A</p>\n<span *ngFor=\"let item of data\">{{item.name}}</span> -->\n<div *ngIf=\"disabled\">\n  <div>\n    <ng-container *ngFor=\"let item of data;let ii= index\">\n      <ng-template [ngTemplateOutlet]=\"renderItem\" [ngTemplateOutletContext]=\"{ $implicit: item, index: ii }\">\n      </ng-template>\n    </ng-container>\n  </div>\n</div>\n\n<div *ngIf=\"!disabled\">\n  <!-- <span *ngFor=\"let item of data\">{{item.name}} + \"----\"</span> -->\n  <div [sortablejs]=\"data\" [sortablejsOptions]=\"options\">\n    <ng-container *ngFor=\"let item of data;let ii= index\">\n      <ng-template [ngTemplateOutlet]=\"renderItem\" [ngTemplateOutletContext]=\"{ $implicit: item, index: ii }\">\n      </ng-template>\n    </ng-container>\n  </div>\n</div>\n\n",
        styles: [".example-list{display:block;overflow:hidden}.example-box{align-items:center;cursor:move;display:inline-flex;flex-direction:row}.cdk-drag-preview{border:1px solid red}.cdk-drop-list-dragging .cdk-drag{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-animating{transition:transform .3s cubic-bezier(0,0,.2,1)}"]
    })
], DroppableComponent);
export { DroppableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcHBhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXpvZXMvbGliL2NvbXBvbmVudHMvZHJvcHBhYmxlL2Ryb3BwYWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFlLE1BQU0sRUFBRSxZQUFZLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBTzNHLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBUTdCO1FBTFMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUNqQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFLdkQsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLFFBQVEsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO2dCQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQztTQUNGLENBQUM7SUFDSCxDQUFDO0lBRUYsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFHRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMseUdBQXlHO1FBQ3pHLDZDQUE2QztRQUM3QyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtTQUN2RDtJQUNILENBQUM7SUFFRCxlQUFlLENBQUMsS0FBSztRQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSztRQUNkLElBQUksQ0FBQyxRQUFRLEdBQUUsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Q0FFRixDQUFBO0FBcENVO0lBQVIsS0FBSyxFQUFFO2dEQUFhO0FBQ1o7SUFBUixLQUFLLEVBQUU7c0RBQStCO0FBQzlCO0lBQVIsS0FBSyxFQUFFO29EQUEyQjtBQUN6QjtJQUFULE1BQU0sRUFBRTt3REFBZ0Q7QUFKOUMsa0JBQWtCO0lBTDlCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxjQUFjO1FBQ3hCLHF4QkFBeUM7O0tBRTFDLENBQUM7R0FDVyxrQkFBa0IsQ0FxQzlCO1NBckNZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVGVtcGxhdGVSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F6LWRyb3BwYWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9kcm9wcGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kcm9wcGFibGUuY29tcG9uZW50LnN0eWwnXVxufSlcbmV4cG9ydCBjbGFzcyBEcm9wcGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhOiBhbnlbXTtcbiAgQElucHV0KCkgcmVuZGVySXRlbTogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBwcml2YXRlIHpkU29ydENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHB1YmxpYyBvcHRpb25zOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgb25VcGRhdGU6IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuemRTb3J0Q2hhbmdlLmVtaXQodGhpcy5kYXRhKTtcbiAgICAgIH1cbiAgICB9O1xuICAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3NldE9wdGlvbih0aGlzLmRpc2FibGVkKVxuICB9XG5cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgLy9DYWxsZWQgYmVmb3JlIGFueSBvdGhlciBsaWZlY3ljbGUgaG9vay4gVXNlIGl0IHRvIGluamVjdCBkZXBlbmRlbmNpZXMsIGJ1dCBhdm9pZCBhbnkgc2VyaW91cyB3b3JrIGhlcmUuXG4gICAgLy9BZGQgJyR7aW1wbGVtZW50cyBPbkNoYW5nZXN9JyB0byB0aGUgY2xhc3MuXG4gICAgaWYgKGNoYW5nZXNbJ2Rpc2FibGVkJ10pIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVkQ2hhbmdlKGNoYW5nZXNbJ2Rpc2FibGVkJ10uY3VycmVudFZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIF9kaXNhYmxlZENoYW5nZSh2YWx1ZSkge1xuICAgIHRoaXMuX3NldE9wdGlvbih2YWx1ZSlcbiAgfVxuXG4gIF9zZXRPcHRpb24odmFsdWUpIHtcbiAgICB0aGlzLmRpc2FibGVkPSB2YWx1ZTtcbiAgfVxuXG59XG5cbiJdfQ==