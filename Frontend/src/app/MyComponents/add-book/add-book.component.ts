import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { InventoryService } from 'src/app/Services/BookStoreOwner/inventory.service';
import { Books } from 'src/app/models/books.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  // book object
  public book = {
    "title":'',
    "author":'',
    "genre":'',
    "price":0,
    "date":'',
    "quantity":1,
    "bookstoreid":localStorage.getItem("userEmail")
  }
  // Constructor for importing routes and inventory service.
  constructor(private router:Router, private inventoryService:InventoryService){}

  // This method is responsible for adding book to database
  handleAddBook(){
    if(this.book.author==="" || this.book.genre==="" || this.book.title==="" || this.book.date===""){
      alert("Fields should not be empty");
      return;
    }
    else if(this.book.price<=0 || this.book.price>1000){
      alert("Price should be in the range of 1 to 1000 rupees");
      return;
    }
    else if(this.book.quantity<=0 || this.book.quantity>1000){
      alert("Quantity should be in the range of 1 to 1000");
      return;
    }
    // console.log(this.book);
    // calling service to add book
    this.inventoryService.addBook(this.book).subscribe({
      next:(response)=>{
        console.log(response);
        this.book = {
          "title":'',
          "author":'',
          "genre":'',
          "price":0,
          "date":'',
          "quantity":1,
          "bookstoreid":localStorage.getItem("userEmail")
        }
        this.router.navigate(['/inventory']);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  // isAdmin function will return true if storeowner is loggedin otherwise false

  isAdmin() {
    return !(localStorage.getItem("isAdmin") === null || localStorage.getItem("isAdmin") === '0');
  }
}
