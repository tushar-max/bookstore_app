import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './MyComponents/home/home.component';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OrdersComponent } from './MyComponents/orders/orders.component';
import { ViewBookComponent } from './MyComponents/view-book/view-book.component';
import { CartComponent } from './MyComponents/cart/cart.component';
import { InventoryComponent } from './MyComponents/inventory/inventory.component';
import { AddBookComponent } from './MyComponents/add-book/add-book.component';
import { OrderRequestsComponent } from './MyComponents/order-requests/order-requests.component';
import { UserGaurdGuard } from './Gaurd/user-gaurd.guard';
import { OwnerGuard } from './Gaurd/owner.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OrdersComponent,
    ViewBookComponent,
    CartComponent,
    InventoryComponent,
    AddBookComponent,
    OrderRequestsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'orders',component:OrdersComponent, canActivate: [UserGaurdGuard]},
      {path:'book/:id',component:ViewBookComponent},
      {path:'cart',component:CartComponent , canActivate: [UserGaurdGuard]},
      {path:'inventory',component:InventoryComponent, canActivate: [OwnerGuard]},
      {path:'add',component:AddBookComponent, canActivate: [OwnerGuard]},
      {path:'orderRequests',component:OrderRequestsComponent, canActivate: [OwnerGuard]},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
