import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-droppable-tester',
  templateUrl: './droppable-tester.component.html',
  styleUrls: ['./droppable-tester.component.styl']
})
export class DroppableTesterComponent implements OnInit {

  data:any = [];

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 15; index++) {
      this.data.push({title:`title-${index}`,content:`content-${index}`})
    }
  }


  sortChange(e){
    console.log("排序后：")
    console.log(e)
  }

}
