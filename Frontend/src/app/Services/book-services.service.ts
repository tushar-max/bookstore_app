import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from '../models/books.model';

@Injectable({
  providedIn: 'root'
})
export class BookServicesService {
  baseApiUrl: string = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/books');
  }

  getBookById(id: number): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/books/' + id);
  }

  getBookReviews(bookId: number): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/reviews/' + bookId);
  }

  placeOrder(order: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.post<any>(`${this.baseApiUrl}/buybook`, order,{headers});
  }
}
