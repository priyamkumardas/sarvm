import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupByDate'
})
export class GroupByDatePipe implements PipeTransform {

  transform(array) {
    let result = array?.history?.reduce((acc, curr) => {
      let item = acc.find(item => item.date === curr.date);

      if (item) {
        item.events.push(curr);
      } else {
        acc.push({
          "date": curr.date,
          "events": [curr]
        });
      }

      return acc;
    }, []); 

    return result;
  } 
}
