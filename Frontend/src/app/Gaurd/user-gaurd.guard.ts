import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGaurdGuard implements CanActivate {
  constructor(private route:Router){}
  isLoggedIn() {
    return !(localStorage.getItem("isLoggedIn") === null || localStorage.getItem("isLoggedIn") === '0');
  }
  isAdmin() {
    return !(localStorage.getItem("isAdmin") === null || localStorage.getItem("isAdmin") === '0');
  }
  // isAdmin function will return true if storeowner is loggedin otherwise false
  // canactivate will return true if user is loggedin otherwise false

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!(this.isLoggedIn() && !this.isAdmin())) {
        this.route.navigate(['/']);
        return false;
      }
      return true;
  }
  
}
