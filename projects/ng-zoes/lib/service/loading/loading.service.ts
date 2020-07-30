import { Injectable, ChangeDetectorRef, EventEmitter, Injector, OnDestroy, OnInit, ComponentRef, ViewRef, } from '@angular/core';
import { ComponentPortal, } from '@angular/cdk/portal';
import { ComponentType, Overlay, OverlayConfig, OverlayRef, ConnectedPositionStrategy,OverlayContainer,CdkOverlayOrigin } from '@angular/cdk/overlay';
import { LoadingComponent } from '../../components/loading/loading.component';
import '@angular/cdk/overlay-prebuilt.css';
// import '../../components/loading/loading.component.styl'

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private component: ComponentRef<LoadingComponent>;
  private overlayRef: OverlayRef;
  private hasBackdrop:boolean = true;

  constructor(
    readonly overlay: Overlay,
    readonly overlayContainer: OverlayContainer
  ) { }

  create( option?: any,container?: any) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: this.hasBackdrop,
      width:'100%',
      height:'100%',
      panelClass: ['modal', 'is-active'],
      backdropClass: 'modal-background',
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    this.component = this.overlayRef.attach(new ComponentPortal(LoadingComponent),);
    this._getComponentInstance(this.component.instance, option)
  }

  _getComponentInstance(instance, option?: any) {
    instance.loading = true;
    if (option && option.color) {
      instance.color = option.color
    }
    if (option && option.type) {
      instance.type = option.type
    }
    if (option && option.size) {
      instance.size = option.size
    }
  }


  destroy(container?: any) {
    this.component.destroy()
    this.overlayRef.dispose();
  }
}
