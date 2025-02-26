import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Services/Orders/order.service';
import { BookServicesService } from 'src/app/Services/book-services.service';
import { Cart } from 'src/app/models/Cart/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  // This will store all cart items
  public cartItems:Cart[]=[];

  // Constructor for importing routes and services.

  constructor(private orderService:OrderService,private route:Router,private bookService:BookServicesService){}

  // It will execute when this component is initialized
  ngOnInit():void{
    // calling service to get cart items
    this.orderService.getCart().subscribe({
      next:(response)=>{
        this.cartItems=response;
        console.log(this.cartItems);
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
  // It will help navigating to book detail page
  handleViewBook(idx:number){
    this.route.navigate(['/book/'+String(this.cartItems[idx].bookid)]);
  }
  // It will place an order
  handleBuy(idx:number){
    const now = new Date();
      let order = {
        "customerid":localStorage.getItem("userEmail"),
        "bookid":this.cartItems[idx].bookid,
        "booktitle":this.cartItems[idx].booktitle,
        "orderdate":now.toLocaleDateString(),
        "orderstatus":"Order Placed"
      };
      this.bookService.placeOrder(order).subscribe({
        next:(response)=>{
          console.log(response);
          this.removeFromCart(idx);
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }
// This will remove book from cart
  removeFromCart(idx:number){
    const cart = {
      "cartid":this.cartItems[idx].id
    };
    this.orderService.removeFromCart(cart).subscribe({
      next:(response)=>{
        console.log(response);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.ngOnInit();
  }
}
