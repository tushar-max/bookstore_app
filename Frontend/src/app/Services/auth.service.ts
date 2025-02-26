import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl: string ='http://localhost:5000';
  constructor(private http:HttpClient) { }

  login(credentials:any):Observable<any>{
    return this.http.post<any>(this.baseApiUrl+'/login',credentials);
  }
}
