import { Component } from '@angular/core';
import { OrderService } from 'src/app/Services/Orders/order.service';
import { Order } from 'src/app/models/Orders/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  public orders:Order[]=[];
  public tempReview = {
    "rating":5,
    "review":""
  }
  public idx=-1;

      // Constructor for importing routes and services.

  constructor(private orderService:OrderService){}

    // It will execute when this component is initialized

  ngOnInit():void{
    this.orderService.getOrders().subscribe({
      next:(response)=>{
        this.orders=response;
        console.log(this.orders);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
    // isLoggedIn function will return true if user is loggedin otherwise false

  isLoggedIn(){
    return !(localStorage.getItem("isLoggedIn")=== null || localStorage.getItem("isLoggedIn")==='0');
  }

      // isAdmin function will return true if storeowner is loggedin otherwise false

  isAdmin(){
    return !(localStorage.getItem("isAdmin")=== null || localStorage.getItem("isAdmin")==='0');
  }

  // Submit a review of a book
  handleSubmitReview(){
    if(this.idx==-1){
      alert("Error");
      return;
    }
    if(this.tempReview.review===""){
      alert("Review cannot be empty");
      return;
    }
    const review = {
      "email":localStorage.getItem("userEmail"),
      "bookid":this.orders[this.idx].bookid,
      "rating":this.tempReview.rating,
      "review":this.tempReview.review
    }
    this.orderService.submitReview(review).subscribe({
      next:(response)=>{
        this.orders=response;
        console.log(this.orders);
      },
      error:(err)=>{
        console.log(err);
      }
    });
    this.tempReview.rating=5;
    this.tempReview.review="";
  }
  handleSetIdx(idx:number){
    this.idx = idx;
  }
}
