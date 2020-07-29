import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'az-droppable',
  templateUrl: './droppable.component.html',
  styleUrls: ['./droppable.component.styl']
})
export class DroppableComponent implements OnInit {
  @Input() data: any[];
  @Input() renderItem: TemplateRef<void>;
  @Input() disabled: boolean = false;
  @Output() private zdSortChange = new EventEmitter<any>();

  public options: any;

  constructor() {
    this.options = {
      onUpdate: (event: any) => {
        this.zdSortChange.emit(this.data);
      }
    };
   }

  ngOnInit() {
    this._setOption(this.disabled)
  }


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['disabled']) {
      this._disabledChange(changes['disabled'].currentValue)
    }
  }

  _disabledChange(value) {
    this._setOption(value)
  }

  _setOption(value) {
    this.disabled= value;
  }

}

