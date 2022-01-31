import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public _HttpClient:HttpClient) {}

  search = new BehaviorSubject('');
  category = new BehaviorSubject(null);
  baseUrl:string = `https://fakestoreapi.com/`;

  GetProducts():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/products`);
  }

  GetProductDetails(id:number):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/products/${id}`);
  }

  GetCategory(type:any):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/products/category/${type}`);
  }

  checkout(time:any,title:any,icon:any){
    Swal.fire({
    position: 'top-end',
    icon: icon,
    title: title,
    width:'350px',
    showConfirmButton: false,
    timer: time
  })
  }
  saveCart(product:any){
    localStorage.setItem("cart",JSON.stringify(product))
  }

  AddToCart(product:any,CartProduct:any){
    product.Quantity= 1
    product.total=0
    for(let i=0; i<CartProduct.length; i++){
      if(CartProduct[i].id == product.id){
        CartProduct[i].Quantity++
      }
    }
    CartProduct.push(product)
      this.saveCart(CartProduct)
      this.checkout(1500,'Added To Your Cart','success')
  }

}
