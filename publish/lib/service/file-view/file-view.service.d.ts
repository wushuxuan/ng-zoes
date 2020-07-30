import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import '@angular/cdk/overlay-prebuilt.css';
import { FileCheck } from '../../components/file-check/file-check';
export declare class FileViewService {
    readonly overlay: Overlay;
    readonly overlayContainer: OverlayContainer;
    private component;
    private overlayRef;
    private hasBackdrop;
    constructor(overlay: Overlay, overlayContainer: OverlayContainer);
    show(): void;
    create(options?: FileCheck): void;
    _getComponentInstance(instance: any, options?: FileCheck): void;
    destroy(): void;
}
