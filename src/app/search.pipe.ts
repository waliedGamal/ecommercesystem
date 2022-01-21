import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchWord:string ,filter:string): any[] {

    let result:any = [];
    if(!products ||searchWord == null || filter == null ){
      return products;
    }
    products.forEach((i:any)=>{
    if(i[filter].trim().toLowerCase().includes(searchWord.toLowerCase())){
      result.push(i);
    }
    })
    return result;
  }

}

