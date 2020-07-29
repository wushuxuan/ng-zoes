import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ZCOptions } from './card.interface';

@Component({
  selector: 'zc',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl']
})
export class CardComponent implements OnInit {
  @Input() options: ZCOptions;
  @Input() loading: boolean = false;
  _selectedIndex = 0;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.options)
  }

  _getExtraLink(link: string) {
    console.log("link:" + link);
    if (link == 'back') {
      history.go(-1)
    } else {
      this.router.navigateByUrl(link)
    }
  }


  _selectChange(args: any[]): void {
    this._selectedIndex = args[0].index
  }

}
