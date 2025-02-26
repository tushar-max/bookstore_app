import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  constructor(private route:Router){}

  // isAdmin function will return true if storeowner is loggedin otherwise false
  isAdmin() {
    return !(localStorage.getItem("isAdmin") === null || localStorage.getItem("isAdmin") === '0');
  }
  // canactivate will return true if storeowner is loggedin otherwise false

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAdmin()) {
      return true;
    } else {
      this.route.navigate(['/']);
      return false;
    }
  }
  
}
