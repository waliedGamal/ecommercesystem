import { DataService } from './../data.service';
import { Component, OnInit,DoCheck } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit ,DoCheck {

  constructor(public DataService:DataService) { }
  cartCount:any
  name:any;
  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if(localStorage.getItem("cart") != null){
      this.cartCount = JSON.parse(localStorage.getItem("cart") || '')
    }
  }

  search(event:any){
    this.name  = event.target.value
    this.DataService.search.next(this.name);
  }
}
