import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(products: any[], category:string): any[] {

    let result:any = [];
    if(!products ||category == null){
      return products;
    }
    return result;
  }
  }
