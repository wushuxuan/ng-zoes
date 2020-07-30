import { __decorate } from "tslib";
import { Injectable, } from '@angular/core';
import { ComponentPortal, } from '@angular/cdk/portal';
import { LoadingComponent } from '../../components/loading/loading.component';
import '@angular/cdk/overlay-prebuilt.css';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
// import '../../components/loading/loading.component.styl'
let LoadingService = class LoadingService {
    constructor(overlay, overlayContainer) {
        this.overlay = overlay;
        this.overlayContainer = overlayContainer;
        this.hasBackdrop = true;
    }
    create(option, container) {
        this.overlayRef = this.overlay.create({
            hasBackdrop: this.hasBackdrop,
            width: '100%',
            height: '100%',
            panelClass: ['modal', 'is-active'],
            backdropClass: 'modal-background',
            scrollStrategy: this.overlay.scrollStrategies.block(),
        });
        this.component = this.overlayRef.attach(new ComponentPortal(LoadingComponent));
        this._getComponentInstance(this.component.instance, option);
    }
    _getComponentInstance(instance, option) {
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
    }
    destroy(container) {
        this.component.destroy();
        this.overlayRef.dispose();
    }
};
LoadingService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LoadingService_Factory() { return new LoadingService(i0.ɵɵinject(i1.Overlay), i0.ɵɵinject(i1.OverlayContainer)); }, token: LoadingService, providedIn: "root" });
LoadingService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], LoadingService);
export { LoadingService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctem9lcy9saWIvc2VydmljZS9sb2FkaW5nL2xvYWRpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsR0FBd0YsTUFBTSxlQUFlLENBQUM7QUFDakksT0FBTyxFQUFFLGVBQWUsR0FBRyxNQUFNLHFCQUFxQixDQUFDO0FBRXZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzlFLE9BQU8sbUNBQW1DLENBQUM7OztBQUMzQywyREFBMkQ7QUFLM0QsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUt6QixZQUNXLE9BQWdCLEVBQ2hCLGdCQUFrQztRQURsQyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFKckMsZ0JBQVcsR0FBVyxJQUFJLENBQUM7SUFLL0IsQ0FBQztJQUVMLE1BQU0sQ0FBRSxNQUFZLEVBQUMsU0FBZTtRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3BDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixLQUFLLEVBQUMsTUFBTTtZQUNaLE1BQU0sRUFBQyxNQUFNO1lBQ2IsVUFBVSxFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztZQUNsQyxhQUFhLEVBQUUsa0JBQWtCO1lBQ2pDLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRTtTQUN0RCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUUsQ0FBQztRQUNoRixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELHFCQUFxQixDQUFDLFFBQVEsRUFBRSxNQUFZO1FBQzFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDMUIsUUFBUSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO1NBQzlCO1FBQ0QsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUN6QixRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUE7U0FDNUI7UUFDRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3pCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQTtTQUM1QjtJQUNILENBQUM7SUFHRCxPQUFPLENBQUMsU0FBZTtRQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsQ0FBQztDQUNGLENBQUE7O0FBekNZLGNBQWM7SUFIMUIsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLGNBQWMsQ0F5QzFCO1NBekNZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBDaGFuZ2VEZXRlY3RvclJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3RvciwgT25EZXN0cm95LCBPbkluaXQsIENvbXBvbmVudFJlZiwgVmlld1JlZiwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRUeXBlLCBPdmVybGF5LCBPdmVybGF5Q29uZmlnLCBPdmVybGF5UmVmLCBDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LE92ZXJsYXlDb250YWluZXIsQ2RrT3ZlcmxheU9yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHsgTG9hZGluZ0NvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudCc7XHJcbmltcG9ydCAnQGFuZ3VsYXIvY2RrL292ZXJsYXktcHJlYnVpbHQuY3NzJztcclxuLy8gaW1wb3J0ICcuLi8uLi9jb21wb25lbnRzL2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQuc3R5bCdcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2FkaW5nU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxMb2FkaW5nQ29tcG9uZW50PjtcclxuICBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XHJcbiAgcHJpdmF0ZSBoYXNCYWNrZHJvcDpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICByZWFkb25seSBvdmVybGF5OiBPdmVybGF5LFxyXG4gICAgcmVhZG9ubHkgb3ZlcmxheUNvbnRhaW5lcjogT3ZlcmxheUNvbnRhaW5lclxyXG4gICkgeyB9XHJcblxyXG4gIGNyZWF0ZSggb3B0aW9uPzogYW55LGNvbnRhaW5lcj86IGFueSkge1xyXG4gICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XHJcbiAgICAgIGhhc0JhY2tkcm9wOiB0aGlzLmhhc0JhY2tkcm9wLFxyXG4gICAgICB3aWR0aDonMTAwJScsXHJcbiAgICAgIGhlaWdodDonMTAwJScsXHJcbiAgICAgIHBhbmVsQ2xhc3M6IFsnbW9kYWwnLCAnaXMtYWN0aXZlJ10sXHJcbiAgICAgIGJhY2tkcm9wQ2xhc3M6ICdtb2RhbC1iYWNrZ3JvdW5kJyxcclxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKCksXHJcbiAgICB9KTtcclxuICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5vdmVybGF5UmVmLmF0dGFjaChuZXcgQ29tcG9uZW50UG9ydGFsKExvYWRpbmdDb21wb25lbnQpLCk7XHJcbiAgICB0aGlzLl9nZXRDb21wb25lbnRJbnN0YW5jZSh0aGlzLmNvbXBvbmVudC5pbnN0YW5jZSwgb3B0aW9uKVxyXG4gIH1cclxuXHJcbiAgX2dldENvbXBvbmVudEluc3RhbmNlKGluc3RhbmNlLCBvcHRpb24/OiBhbnkpIHtcclxuICAgIGluc3RhbmNlLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgaWYgKG9wdGlvbiAmJiBvcHRpb24uY29sb3IpIHtcclxuICAgICAgaW5zdGFuY2UuY29sb3IgPSBvcHRpb24uY29sb3JcclxuICAgIH1cclxuICAgIGlmIChvcHRpb24gJiYgb3B0aW9uLnR5cGUpIHtcclxuICAgICAgaW5zdGFuY2UudHlwZSA9IG9wdGlvbi50eXBlXHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9uICYmIG9wdGlvbi5zaXplKSB7XHJcbiAgICAgIGluc3RhbmNlLnNpemUgPSBvcHRpb24uc2l6ZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGRlc3Ryb3koY29udGFpbmVyPzogYW55KSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudC5kZXN0cm95KClcclxuICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==