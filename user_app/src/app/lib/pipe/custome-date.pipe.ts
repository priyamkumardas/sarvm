import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customeDate'
})
export class CustomeDatePipe extends DatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]) {
    // console.log(value)
    if (value) {
      if(new Date(new Date(value).getTime() + 19800000).toJSON().split('T')[0] == new Date(new Date().getTime() + 19800000).toJSON().split('T')[0]){
        return 'Today'
      }else if(new Date(new Date(value).getTime() + 19800000).toJSON().split('T')[0] == new Date(new Date().getTime() + 19800000 + 86400000).toJSON().split('T')[0]){
        return 'Tomorrow'
      }else{
        return super.transform(value,'dd MMM YYYY')
      }
    } else {
      return value;
    }
  }

}
