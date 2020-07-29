import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'renderPipe'
})
export class RenderPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  
  transform(value: any, row: object, columnCode: String, render = function (row: object, columnCode: String) { return "" }): any {
    return this.sanitizer.bypassSecurityTrustHtml(render(row, columnCode));
  }

}
