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
  Products:Products[]=[];
  Cart:any[]=[];

  ngOnInit(): void {
    this.GetProducts()
    this.search()
  }

  ngDoCheck(): void {
    if(localStorage.getItem("cart") != null){
      this.Cart = JSON.parse(localStorage.getItem("cart") || '')
    }
}

  GetProducts(){
    this._DataService.GetProducts().subscribe((res)=>{
      this.Products = res
    })
  }

  AddToCart(CartProduct:any){
    this.Cart.push(CartProduct)
    this.saveCart()
    this.checkout()
  }

  search(){
    this._DataService.search.subscribe((res)=>{
      this.searchKey = res;
    })
  }

  checkout(){
    Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'The Product added to your cart',
    showConfirmButton: false,
    timer: 1000
  })
  }

  saveCart(){
    localStorage.setItem("cart",JSON.stringify(this.Cart))
  }

}
