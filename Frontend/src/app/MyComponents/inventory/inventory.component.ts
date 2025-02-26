import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/Services/BookStoreOwner/inventory.service';
import { Books } from 'src/app/models/books.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  // it will store inventory
  public inventory: Books[] = [];
  bookId: number = -1;
  bookIdx: number = 0;
  // Constructor for importing routes and services.

  constructor(private route: Router, private inventoryService: InventoryService) { }


  // It will execute when this component is initialized

  ngOnInit(): void {
    this.inventoryService.getInventory().subscribe({
      next: (response) => {
        this.inventory = response;
        console.log(this.inventory);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  handleViewBookClick(id: number, i: number) {
    this.bookId = id;
    this.bookIdx = i
  }

  handleDetailedView() {
    this.route.navigate(['/book/' + this.bookId]);
  }

  // delete the inventory item
  handleDelete(index:number){
    this.inventoryService.deleteBook(this.inventory[index].id).subscribe({
      next: (response) => {
        console.log(response);
        this.ngOnInit();
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

  // this will edit book
  handleEditBook(){

    if(this.inventory[this.bookIdx].author==="" || this.inventory[this.bookIdx].genre==="" || this.inventory[this.bookIdx].title==="" || this.inventory[this.bookIdx].date===""){
      alert("Fields should not be empty");
      return;
    }
    else if(this.inventory[this.bookIdx].price<=0 || this.inventory[this.bookIdx].price>1000){
      alert("Price should be in the range of 1 to 1000 rupees");
      return;
    }
    else if(this.inventory[this.bookIdx].quantity<=0 || this.inventory[this.bookIdx].quantity>1000){
      alert("Quantity should be in the range of 1 to 1000");
      return;
    }
    console.log(this.inventory[this.bookIdx]);
    this.inventoryService.editBook(this.inventory[this.bookIdx]).subscribe({
      next:(response)=>{
        console.log(response);
        this.route.navigate(['/inventory']);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.ngOnInit();
  }
}
