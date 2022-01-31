import { Router } from '@angular/router';
import { Products } from './../products';
import { DataService } from './../data.service';
import { Component, OnInit ,DoCheck } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,DoCheck {

  constructor(public _DataService:DataService ,public Router:Router) { }
  searchKey:any
  Products:any;
  Cart:any[]=[];
  CartButton:boolean=true;

  ngOnInit(): void {
    this.GetProducts()
    this.search()
  }

  ngDoCheck(): void {
    if(localStorage.getItem("cart") != null){
      this.Cart = JSON.parse(localStorage.getItem("cart") || '')
    if(this._DataService.category.getValue() != null){
      this.Products = this._DataService.category.getValue()
    }
  }
}

  GetProducts(){
    this._DataService.GetProducts().subscribe((res)=>{
      this.Products = res
    })
  }

  AddToCart(product:any){
    this._DataService.AddToCart(product,this.Cart)
}

  search(){
    this._DataService.search.subscribe((res)=>{
      this.searchKey = res;
    })
  }

  saveCart(){
    this._DataService.saveCart(this.Cart)
  }

}
