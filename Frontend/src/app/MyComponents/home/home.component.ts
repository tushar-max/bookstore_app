import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { BookServicesService } from 'src/app/Services/book-services.service';
import { Books } from 'src/app/models/books.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // to store all books
  public books: Books[] = [];
  // this is for search query
  query = "";

  bookId: number = -1;
  bookIdx: number = 0;

    // Constructor for importing routes and services.

  constructor(private bookService: BookServicesService, private route: Router) {
    this.ngOnInit();
  }
  // It will execute when this component is initialized

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response) => {
        this.books = response;
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

  // This will handle search functionality
  handleSearch() {
    this.books = this.books.filter(x => x.title.toLowerCase().includes(this.query.toLocaleLowerCase()) || x.genre.toLowerCase().includes(this.query.toLocaleLowerCase())
      || x.author.toLowerCase().includes(this.query.toLocaleLowerCase()));
  }
// This resets the search results
  handleReset() {
    this.ngOnInit();
    this.query = "";
  }
// This will set which book to display in modal
  handleBuyBookClick(id: number, i: number) {
    this.bookId = id;
    this.bookIdx = i
  }
// get date to string
  getDate(date: any) {
    return new Date(date).toLocaleDateString();
  }
// navigate to book detail page
  handleDetailedView() {
    this.route.navigate(['/book/' + this.bookId]);
  }
}
