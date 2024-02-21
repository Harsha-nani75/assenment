import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { KeyValuePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  editForm!: FormGroup;

  data: any=[];
  constructor(public authService: AuthService,private http: HttpClient,private fb: FormBuilder,private database:DatabaseService,private router:Router) {}
  
  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }
  ngOnInit() {
    this.fetchData();
    this.editForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  fetchData() {
    this.http.get('http://localhost:3022/data').subscribe(
      (response: any) => { // Ensure to type response as any if the structure is not known
        if (response && response.data && Array.isArray(response.data)) {
          this.data = response.data;
          //console.table('Data:', this.data);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  onSubmit() {
    if (this.editForm.valid) {
      // Send data to the API
      const formData = this.editForm.value;
      this.database.addItem(formData).subscribe((response: any) => {
        console.log('Data saved:', response);
        location.reload()
        // Handle success, maybe navigate to another page
      }, (error: any) => {
        console.error('Error saving data:', error);
        // Handle error
      });
    } else {
      console.error('Form is invalid');
      // Handle invalid form
    }
  }


}
