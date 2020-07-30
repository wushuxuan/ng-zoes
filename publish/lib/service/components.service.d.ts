import { Injector } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
export declare class ComponentsService {
    private injector;
    private modal;
    constructor(injector: Injector, modal: NzModalService);
    getBase64(file: File): Promise<string | ArrayBuffer | null>;
    filePreview: (file: NzUploadFile) => Promise<void>;
}
