import { Component, OnInit } from '@angular/core';
import { ComponentsService,NzUploadFile,NzUploadChangeParam } from 'ng-zoes'

@Component({
  selector: 'app-upload-tester',
  templateUrl: './upload-tester.component.html',
  styleUrls: ['./upload-tester.component.less']
})
export class UploadTesterComponent implements OnInit {
  fileList: NzUploadFile[] = [
  ];
  sort:boolean = false;
  compress:boolean =true

  constructor(
    private comService: ComponentsService
  ) { }

  ngOnInit(): void {
  }

  switchChange(target) {
    this.sort = target
  }

  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // // 1. Limit the number of uploaded files
    // // Only to show two recent uploaded files, and old ones will be replaced by the new
    // fileList = fileList.slice(-2);

    // // 2. Read from response and show file link
    // fileList = fileList.map(file => {
    //   if (file.response) {
    //     // Component will show file.url as link
    //     file.url = file.response.url;
    //   }
    //   return file;
    // });
    console.log(info);
    this.fileList = fileList;
  }

  handlePreview = (file: NzUploadFile) => {
    this.comService.filePreview(file)
  };
}
