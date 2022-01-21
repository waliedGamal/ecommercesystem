import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public _HttpClient:HttpClient) { }

  search = new BehaviorSubject('');
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

  GetElectronics():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/products/category/electronics`);
  }

  Getjewelery():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/products/category/jewelery`);
  }

  GetFashions():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/products/category/electronics`);
  }



}
