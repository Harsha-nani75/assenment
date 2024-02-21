import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {  CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor( private authService:AuthService,private router:Router) { }
  
  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      return true; // Allow access to the route if the user is logged in
    } else {
      this.router.navigate(['/login']); // Redirect to the login page if the user is not logged in
      return false; // Deny access to the route
    }
  }
}
