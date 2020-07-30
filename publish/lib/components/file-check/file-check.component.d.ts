import { OnInit, ViewContainerRef } from '@angular/core';
import { NzUploadFile } from '../upload/interface';
export declare class FileCheckComponent implements OnInit {
    element: ViewContainerRef;
    fileList: NzUploadFile[];
    index: number;
    show: boolean;
    constructor();
    ngOnInit(): void;
    getType(name: any): false | "video" | "image" | "radio" | "txt" | "excel" | "word" | "pdf" | "ppt" | "other";
    close(): void;
    changeIndex(type: any): void;
}
