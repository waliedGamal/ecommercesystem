import { DataService } from './../data.service';
import { Component, OnInit ,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,DoCheck {

  CartProducts:any[]=[];
  Quantity:number=1;
  total:any

  constructor(private Router:Router,private DataService:DataService) { }
  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if(localStorage.getItem("cart") != null){
      this.CartProducts = JSON.parse(localStorage.getItem("cart") || '')
      this.getTotal()
      this.remove()
    }
  }

  DeleteCart(id:number){
    this.CartProducts.splice(id,1)
    this.DataService.saveCart(this.CartProducts)
    this.DataService.checkout(1200,'Deleted Form Cart','error')
  }

  checkout(){
    this.DataService.checkout(2500,'Thanks For buying','success')
  setTimeout(() => {
    localStorage.setItem("cart",'[]')
    this.Router.navigate(["home"])
  }, 2500);
  }

  getTotal(){
    for(let i=0; i < this.CartProducts.length; i++){
      this.Quantity = this.CartProducts[i].Quantity
      this.CartProducts[i].total = this.CartProducts[i].Quantity * this.CartProducts[i].price
      this.total = this.CartProducts[i].total
    }
  }

  count(id:number,event:any){
    for(let i=0; i < this.CartProducts.length; i++){
      if(id == this.CartProducts[i].id){
        this.CartProducts[i].Quantity = event;
      }
    }
    this.DataService.saveCart(this.CartProducts)
  }

  remove(){
    let set = new Set()
    this.CartProducts = this.CartProducts.reduce((value,index)=>{
      if(!set.has(index.id)){
        set.add(index.id)
        value.push(index)
      }
      return value;
    },[])
  }

}
