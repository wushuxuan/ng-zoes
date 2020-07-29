import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'table-columns-buttons',
  templateUrl: './table-columns-buttons.component.html',
  styleUrls: ['./table-columns-buttons.component.styl']
})
export class TableColumnsButtonsComponent implements OnInit {

  @Input() buttons: any;
  @Input() type:any = 'button';  //button or link
  @Input() row: any;
  @Input() rowIndex: number;
  @Input() extButtons = [];


  normalButtons = [];

  constructor() { }

  ngOnInit(): void {
    var canAccessActions: any = [];
    for (const iterator of this.buttons) {
      if (iterator['permission']) {
        //有权限限制
        if (iterator['permission'](this.row, this.rowIndex)) {
          canAccessActions.push(iterator);
        }
      } else {
        //无权限限制
        canAccessActions.push(iterator);
      }
    }
    this.normalButtons = canAccessActions
  }

}
