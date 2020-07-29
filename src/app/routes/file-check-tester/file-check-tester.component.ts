import { Component, OnInit } from '@angular/core';
import { FileViewService } from 'ng-zoes';

@Component({
  selector: 'app-file-check-tester',
  templateUrl: './file-check-tester.component.html',
  styleUrls: ['./file-check-tester.component.styl']
})
export class FileCheckTesterComponent implements OnInit {

  fileList: any[] = [
    {
      uid: '-1',
      name: '2058498.jpeg',
      status: 'done',
      url: 'https://cdn.pixabay.com/photo/2020/07/15/13/41/squirrel-5407735__340.jpg'
    },
    {
      uid: '-2',
      name: '向日葵.jpeg',
      status: 'done',
      url: 'https://cdn.pixabay.com/photo/2020/06/30/22/34/dog-5357794__340.jpg'
    },
  ];

  constructor(
    private fileViewservice: FileViewService,
  ) { }

  ngOnInit(): void {
  }


  handlePreview = (e) => {
    this.fileViewservice.create({ fileList: this.fileList, index: this.fileList.indexOf(e) })
  }



  handleChange(info: any): void {
    let fileList = [...info.fileList];
    console.log(info);
    this.fileList = fileList;
  }
}
