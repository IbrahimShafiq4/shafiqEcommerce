import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list: Products[], term: string): Products[] {
    return list.filter((x) => x.title.toLowerCase().includes(term.toLowerCase()));
  }

}
