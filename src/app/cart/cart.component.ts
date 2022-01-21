import { Component, OnInit ,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,DoCheck {

  constructor(private Router:Router) { }

  CartProducts:any[]=[];
  Quantity:number=1
  ngOnInit(): void {
  }
  ngDoCheck(): void {
    if(localStorage.getItem("cart") != null){
      this.CartProducts = JSON.parse(localStorage.getItem("cart") || '')
    }
  }

  DeleteCart(id:number){
    this.CartProducts.splice(id,1)
    this.saveCart()
  }

  saveCart(){
    localStorage.setItem("cart",JSON.stringify(this.CartProducts))
  }
  
  checkout(){
    Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Thanks For buying',
    showConfirmButton: false,
    timer: 1500
  })
  setTimeout(() => {
    localStorage.setItem("cart",'[]')
    this.Router.navigate(["home"])
  }, 1500);
  }

}
