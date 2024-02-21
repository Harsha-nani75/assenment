import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  
  usernameError: boolean = false;
  passwordError: boolean = false;

  constructor(private authService: AuthService,private router:Router) {}

  
  login() {
 if (this.username === 'admin') {
      this.usernameError = false;
      if (this.password === 'password') {
        this.passwordError = false;
        // Call the login method from AuthService only if both username and password are correct
        if (this.authService.login(this.username,this.password)) {
          // Navigate to the home page or perform any other action upon successful login
          console.log('Login successful');
          this.router.navigate(['home']);
        }
      } else {
        this.passwordError = true;
      }
    } else {
      this.usernameError = true;
    }
  }  }

