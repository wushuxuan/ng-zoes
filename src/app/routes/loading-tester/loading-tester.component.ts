import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-tester',
  templateUrl: './loading-tester.component.html',
  styleUrls: ['./loading-tester.component.less']
})
export class LoadingTesterComponent implements OnInit {

  type:string = 'ball-beat'
  color:any='orange';
  size:any;
  loading:boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 2000);
  }

}
