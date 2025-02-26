import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseApiUrl: string = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.get<any>(this.baseApiUrl + '/orders/' + localStorage.getItem("userEmail"), { headers });
  }

  getCart(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.get<any>(this.baseApiUrl + '/cart/' + localStorage.getItem("userEmail"), { headers });
  }

  addToCart(cartItem: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.post<any>(this.baseApiUrl + '/cart/' + localStorage.getItem("userEmail"), cartItem, { headers: headers });
  }

  removeFromCart(cartItem: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.put<any>(this.baseApiUrl + '/cart/' + localStorage.getItem("userEmail"), cartItem, { headers: headers });
  }

  submitReview(review: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.post<any>(this.baseApiUrl + '/reviews/' + review.bookid, review, { headers: headers });
  }
}
