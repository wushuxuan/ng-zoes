/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { HttpClient } from '@angular/common/http';
import { ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilesServiceService } from './files-service.service';
import { ComponentsService } from './../../service/components.service';
import { NzUploadFile, ZipButtonOptions } from './interface';
export declare class UploadBtnComponent implements OnDestroy {
    private http;
    private fileService;
    private comService;
    reqs: {
        [key: string]: Subscription;
    };
    private destroy;
    file: ElementRef;
    options: ZipButtonOptions;
    onClick(): void;
    onKeyDown(e: KeyboardEvent): void;
    onFileDrop(e: DragEvent): void;
    onChange(e: Event): void;
    private traverseFileTree;
    private attrAccept;
    private attachUid;
    uploadFiles(fileList: FileList | File[]): void;
    upload(file: NzUploadFile, fileList: NzUploadFile[]): Promise<void>;
    private post;
    private xhr;
    private clean;
    abort(file?: NzUploadFile): void;
    constructor(http: HttpClient, fileService: FilesServiceService, comService: ComponentsService);
    ngOnDestroy(): void;
}
