import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn: boolean = false;

  login(username: string, password: string):boolean {
    // Perform login logic, set isLoggedIn to true upon successful login
    if (username === 'admin' && password === 'password') {
      this.isLoggedIn = true;
      return true;
    } else {
      return false;
    }
  }


  logout() {
    // Perform logout logic, set isLoggedIn to false
    this.isLoggedIn = false;
  }
}
