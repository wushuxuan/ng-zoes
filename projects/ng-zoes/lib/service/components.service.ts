import { Injectable, Injector } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { FileCheckComponent } from '../components/file-check/file-check.component';
import { isImageType, isVideoType, getFileType, isEqual } from './../theme/utils/util'




@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(
    private injector: Injector,
    private modal: NzModalService,
  ) { }

  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  filePreview = async (file: NzUploadFile) => {
    if ((isImageType(file.type) || isEqual(getFileType(file.name), 'image')) && !file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj!);
      // console.log(file.preview)
    }
    const _url = file.url || file.preview;

    if (isImageType(file.type) || isEqual(getFileType(file.name), 'image')) {
      this.modal.create({
        nzContent: `<img src="${_url}" width="100%"/>`,
        nzFooter: null,
      });
    } else if (isVideoType(file.type) || isEqual(getFileType(file.name), 'video')) {
      this.modal.create({
        nzContent: `<video src="${_url}" controls="controls" width="100%">您的浏览器不支持视频播放</video>`,
        nzFooter: null,
      });
    } else {
      // this.injector.get<NzModalService>(NzModalService).create({
      //   nzContent: `<p class="text-center" >暂时无法查看实时文件</p>`,
      //   nzFooter: null,
      // });
      window.open(_url)
    }
  };
}
