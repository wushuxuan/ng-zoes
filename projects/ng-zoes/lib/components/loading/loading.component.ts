import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AZLoadingType, AZLoadingSize } from './loading.interface';


const loaderAllType: any = [
  { type: 'ball-pulse', num: 3, },
  { type: 'ball-grid-pulse', num: 9, },
  { type: 'ball-clip-rotate', num: 1, },
  { type: 'ball-clip-rotate-pulse', num: 2, },
  { type: 'square-spin', num: 1, },
  { type: 'ball-clip-rotate-multiple', num: 2, },
  { type: 'ball-pulse-rise', num: 5, },
  { type: 'ball-rotate', num: 1, },
  { type: 'cube-transition', num: 2, },
  { type: 'ball-zig-zag', num: 2, },
  { type: 'ball-zig-zag-deflect', num: 2, },
  { type: 'ball-triangle-path', num: 3, },
  { type: 'ball-scale', num: 1, },
  { type: 'line-scale', num: 5, },
  { type: 'line-scale-party', num: 4, },
  { type: 'ball-scale-multiple', num: 3, },
  { type: 'ball-pulse-sync', num: 3, },
  { type: 'ball-beat', num: 3, },
  { type: 'line-scale-pulse-out', num: 5, },
  { type: 'line-scale-pulse-out-rapid', num: 5, },
  { type: 'ball-scale-ripple', num: 1, },
  { type: 'ball-scale-ripple-multiple', num: 3, },
  { type: 'ball-spin-fade-loader', num: 8, },
  { type: 'line-spin-fade-loader', num: 8, },
  { type: 'triangle-skew-spin', num: 1, },
  { type: 'pacman', num: 5, },
  { type: 'ball-grid-beat', num: 9, },
  { type: 'semi-circle-spin', num: 1, },
]

@Component({
  selector: 'az-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.styl']
})
export class LoadingComponent implements OnInit {

  @Input() type?: AZLoadingType='ball-beat';
  @Input() loading?: boolean = false;
  @Input() color?: string = "#000";
  @Input() size?: AZLoadingSize;

  className: AZLoadingType = 'ball-beat';
  loadList: any = [1,1,1,];
  _size: number = 10;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['type']) {
      this._getLoader(changes['type'].currentValue)
    }
    if (changes['size']) {
      this._getSize(changes['size'].currentValue)
    }
  }

  _getSize(size) {
    switch (size) {
      case 'samll':
        this._size = 5
        break;
      case 'large':
        this._size = 15
        break;
      default: this._size = 10
        break;
    }
  }
  _getLoader(type) {
    for (const iterator of loaderAllType) {
      if (iterator.type == type) {
        this.loadList = new Array(iterator.num);
      }
    }
    this.className = type
  }
}


