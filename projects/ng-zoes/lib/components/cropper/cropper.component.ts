import { Component, OnInit,Input } from '@angular/core';
import {LocaleService} from './../../theme/locale.service';
import Cropper from 'cropperjs';

@Component({
  selector: 'az-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.styl']
})
export class CropperComponent implements OnInit {

  @Input() type:any = 'square';
  @Input() url:string = '';

  _disabled:boolean = true;
  _cropperUrl:any ;
  _local:any;
  _ratio:any;
  _croppers: Cropper;
  image:any;

  @Input()
  set ratio(value){
    this._ratio = value?value:16/9
  }
  get ratio(){
   return this._ratio;
  }

  @Input()
  set disabled(value){
    console.log("disabled:"+value)
    this._disabled = value;
    console.log("this._disabled:"+this._disabled)
    setTimeout(() => {
      this.image = document.getElementById('image')
      this._croppers = new Cropper(this.image, {
        aspectRatio: this._ratio,
        dragMode: 'move',
        crop(event) {

          // console.log(event)
        },
      });
    }, 100)
  }

  get disabled(){
    return this._disabled
  }


  constructor(
    private locale:LocaleService,
  ) {
    this._local = this.locale.getData('cropper') 
   }

  ngOnInit(): void {

  }


}
