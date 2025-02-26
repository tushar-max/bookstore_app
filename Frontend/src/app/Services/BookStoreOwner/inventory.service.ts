import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  baseApiUrl: string = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  getInventory(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.get<any>(this.baseApiUrl + '/inventory/' + localStorage.getItem("userEmail"), { headers });
  }

  addBook(book: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.post<any>(this.baseApiUrl + '/books', book, { headers });
  }

  editBook(book: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.put<any>(this.baseApiUrl + '/books', book, { headers });
  }

  deleteBook(bookId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.delete<any>(this.baseApiUrl + '/inventory/' + bookId, { headers });
  }
}
