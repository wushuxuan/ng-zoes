import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import '@angular/cdk/overlay-prebuilt.css';
export declare class LoadingService {
    readonly overlay: Overlay;
    readonly overlayContainer: OverlayContainer;
    private component;
    private overlayRef;
    private hasBackdrop;
    constructor(overlay: Overlay, overlayContainer: OverlayContainer);
    create(option?: any, container?: any): void;
    _getComponentInstance(instance: any, option?: any): void;
    destroy(container?: any): void;
}
