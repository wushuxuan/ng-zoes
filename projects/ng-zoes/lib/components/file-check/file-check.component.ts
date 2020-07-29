import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NzUploadFile } from '../upload/interface';
import { isImageType, isVideoType, getFileType, isEqual } from './../../theme/utils/util'

@Component({
  selector: 'az-file-view',
  templateUrl: './file-check.component.html',
  styleUrls: ['./file-check.component.styl']
})
export class FileCheckComponent implements OnInit {
  @ViewChild('element', { read: ViewContainerRef }) public element: ViewContainerRef;

  @Input() fileList: NzUploadFile[] = [];
  @Input() index: number = 0;

  show:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  getType(name) {
    return getFileType(name)
  }

  close(){
    this.show = false
  }


  changeIndex(type) {
    switch (type) {
      case 'next':
        if (this.index + 1 >= this.fileList.length) {
          this.index = 0
        } else {
          this.index = this.index + 1
        }
        break;

      case 'perv':
        if (this.index - 1 < 0) {
          this.index = this.fileList.length - 1
        } else {
          this.index = this.index - 1
        }
        break;
    }
  }
}
