import { DataService } from './../data.service';
import { Component, OnInit,DoCheck } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit ,DoCheck {

  constructor(public DataService:DataService) { }
  cartCount:any[]=[]
  name:any;
  category:any
  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if(localStorage.getItem("cart") != null){
      this.cartCount = JSON.parse(localStorage.getItem("cart") || '')
      this.remove()
    }
  }

  categories(type:any){
    this.category = type.target.attributes[1].nodeValue
    if(this.category == "products"){
      this.DataService.GetProducts().subscribe((res)=>{
        this.DataService.category.next(res);
      })
    }else{
      this.DataService.GetCategory(this.category).subscribe((res)=>{
        this.DataService.category.next(res);
      })
    }
  }

  search(event:any){
    this.name  = event.target.value
    this.DataService.search.next(this.name);
    this.category = event.target.attributes[1].nodeValue
  }

  remove(){
    let set = new Set()
    this.cartCount = this.cartCount.reduce((value,index)=>{
      if(!set.has(index.id)){
        set.add(index.id)
        value.push(index)
      }
      return value;
    },[])
  }
}
