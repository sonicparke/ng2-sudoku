import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDot'
})
export class RemoveDotPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === '.') {
      return '';
    } else {
      return value;
    }
  }

}
