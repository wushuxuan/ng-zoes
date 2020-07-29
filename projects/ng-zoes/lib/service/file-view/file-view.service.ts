import { Injectable, ChangeDetectorRef, EventEmitter, Injector, OnDestroy, OnInit, ComponentRef, ViewRef, } from '@angular/core';
import { ComponentPortal, } from '@angular/cdk/portal';
import { ComponentType, Overlay, OverlayConfig, OverlayRef, ConnectedPositionStrategy, OverlayContainer, CdkOverlayOrigin } from '@angular/cdk/overlay';
import '@angular/cdk/overlay-prebuilt.css';
import { FileCheckComponent } from './../../components/file-check/file-check.component';
import { NzUploadFile } from '../../components/upload/interface';
import { FileCheck } from '../../components/file-check/file-check'

@Injectable({
  providedIn: 'root'
})
export class FileViewService {
  private component: ComponentRef<FileCheckComponent>;
  private overlayRef: OverlayRef;
  private hasBackdrop: boolean = true;

  constructor(
    readonly overlay: Overlay,
    readonly overlayContainer: OverlayContainer
  ) { }



  show() {
    console.log("456")
  }

  create(options?: FileCheck, ) {
    this.overlayRef = this.overlay.create();
    this.component = this.overlayRef.attach(new ComponentPortal(FileCheckComponent));
    this._getComponentInstance(this.component.instance, options)
  }

  _getComponentInstance(instance, options?: FileCheck,) {
    if (options.fileList) {
      instance.fileList = options.fileList
    }
    if (options.index) {
      instance.index = options.index
    }
  }


  destroy() {
    this.component.destroy()
    this.overlayRef.dispose();
  }
}
