import { DataService } from './../data.service';
import { Component, OnInit ,DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.scss']
})
export class ProductinfoComponent implements OnInit,DoCheck {

  constructor(private _ActivatedRoute:ActivatedRoute , private _DataService:DataService) { }
  id:number=0;
  Product:any
  CartProducts:any[]=[];

  ngOnInit(): void {
    this.productInfo()
  }

  ngDoCheck(): void {
    if(localStorage.getItem("cart") != null){
      this.CartProducts = JSON.parse(localStorage.getItem("cart") || '')
    }
}

  productInfo(){
    this.id = this._ActivatedRoute.snapshot.params['id']
    this._DataService.GetProductDetails(this.id).subscribe((res)=>{
      this.Product = res
    })
  }

  AddToCart(product:any){
    
    this._DataService.AddToCart(product,this.CartProducts)

      // product.Quantity= 1
    // product.total=0
    // for(let i=0; i<this.CartProducts.length; i++){
    //   if(this.CartProducts[i].id == product.id){
    //     this.CartProducts[i].Quantity++
    //   }
    // }
    // this.CartProducts.push(product)
    //   this.saveCart()
    //   this.checkout()
  }
  saveCart(){
    this._DataService.saveCart(this.CartProducts)
    }
}
