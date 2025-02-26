import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageOrderService {
  baseApiUrl: string = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.get<any>(this.baseApiUrl + '/manageOrders/' + localStorage.getItem("userEmail"), { headers });
  }

  updateOrder(order:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.put<any>(this.baseApiUrl + '/manageOrders/' + localStorage.getItem("userEmail"),order, { headers });
  }
}

