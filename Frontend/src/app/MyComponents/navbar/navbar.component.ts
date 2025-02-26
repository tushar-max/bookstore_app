import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { SignupService } from 'src/app/Services/Signup/signup.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loginUserRequest = {
    email: '',
    password: '',
    role: ''
  }
  signupUserRequest = {
    name:'',
    email:'',
    phone:0,
    password:'',
    role:''
  }
  constructor(private route: Router, private auth: AuthService,private signup:SignupService) {

  }

  isLoggedIn() {
    return !(localStorage.getItem("isLoggedIn") == null || localStorage.getItem("isLoggedIn") == '0');
  }
  isAdmin() {
    return !(localStorage.getItem("isAdmin") == null || localStorage.getItem("isAdmin") == '0')
  }

  loginUser() {
    if (!this.validEmail()) {
      alert("Please enter valid email address!");
      return;
    }
    if (this.loginUserRequest.role === "") {
      alert("Please select role!");
      return;
    }
    console.log(this.loginUserRequest);
    this.auth.login(this.loginUserRequest).subscribe({
      next: (response) => {
        if (response === null) {
          localStorage.clear();
          alert("Wrong Credentials!.Please enter correct email and password");
        }
        else {
          alert("Login Success!!");
          localStorage.setItem("jwt", response.access_token);
          localStorage.setItem("isLoggedIn", '1');
          localStorage.setItem("isAdmin", this.loginUserRequest.role === "customer" ? '0' : '1');
          localStorage.setItem("userEmail", this.loginUserRequest.email);

        }
        this.loginUserRequest.email = '';
        this.loginUserRequest.password = '';
        this.loginUserRequest.role = '';

      },
      error(err) {
        alert("Wrong credentials");
        console.log(err);

      },
    });
    this.route.navigate(['/']);
  }

  validEmail(): boolean {
    // Regular expression pattern for email validation
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.loginUserRequest.email)) {
      return false;
    }
    return true;;
  }

  validSignupEmail(): boolean {
    // Regular expression pattern for email validation
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.signupUserRequest.email)) {
      return false;
    }
    return true;;
  }

  handleLogout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }
  signupUser(){
    if (!this.validSignupEmail()) {
      alert("Please enter valid email address!");
      return;
    }
    if(this.signupUserRequest.name===""){
      alert("Name should not be empty")
      return;
    }
    if(this.signupUserRequest.password===""){
      alert("Password should not be empty");
      return;
    }
    if(this.signupUserRequest.phone.toString().length!==10 || this.signupUserRequest.phone<=0){
      alert("Phone number should be of 10 digit");
      console.log(this.signupUserRequest.phone.toString());

      return;
    }
    if (this.signupUserRequest.role === "") {
      alert("Please select role!");
      return;
    }

    console.log(this.signupUserRequest);

    this.signup.signup(this.signupUserRequest).subscribe({
      next:(response)=>{
        console.log(response);
        alert("Registration successful!");
      },
      error:(err)=>{
        console.log("error");
        alert(err.error.message);
      }
    })
  }
}
