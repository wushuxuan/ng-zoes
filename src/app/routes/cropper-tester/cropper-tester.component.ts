import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cropper-tester',
  templateUrl: './cropper-tester.component.html',
  styleUrls: ['./cropper-tester.component.styl']
})
export class CropperTesterComponent implements OnInit {

  disabled:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
