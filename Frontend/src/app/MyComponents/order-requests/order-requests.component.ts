import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageOrderService } from 'src/app/Services/BookStoreOwner/manage-order.service';
import { Order } from 'src/app/models/Orders/order.model';

@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.component.html',
  styleUrls: ['./order-requests.component.css']
})
export class OrderRequestsComponent {
  public orders: Order[] = []
      // Constructor for importing routes and services.

  constructor(private route: Router, private manageOrderService: ManageOrderService) { }

  private orderStatus = ['Placed', 'Preparing', 'Shipped', 'Delivered'];

    // It will execute when this component is initialized

  ngOnInit(): void {
    this.manageOrderService.getOrders().subscribe({
      next: (response) => {
        this.orders = response;
        console.log(this.orders);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

      // isLoggedIn function will return true if user is loggedin otherwise false

  isLoggedIn() {
    return !(localStorage.getItem("isLoggedIn") === null || localStorage.getItem("isLoggedIn") === '0');
  }
      // isAdmin function will return true if storeowner is loggedin otherwise false

  isAdmin() {
    return !(localStorage.getItem("isAdmin") === null || localStorage.getItem("isAdmin") === '0');
  }


  // Update orders shipments
  handleUpdate(idx:number){
    console.log(idx);
    let temp = 0;
    for (let index = 0; index < this.orderStatus.length; index++) {
      if (this.orderStatus[index]===this.orders[idx].orderstatus) {
        temp =index;
        break;
      }
    }
    if(temp==3){
      return;
    }
    this.orders[idx].orderstatus=this.orderStatus[temp+1];
    console.log(this.orders[idx]);

    this.manageOrderService.updateOrder(this.orders[idx]).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.ngOnInit();
  }
}
