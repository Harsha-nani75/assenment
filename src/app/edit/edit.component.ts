import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  editForm!: FormGroup;
isEdit:boolean=false;
  itemId!: number;
  selectedUserId!: number;
  selectedUser: any ={}; 
  item: any;
data: any;

edit(user:any){
  this.isEdit=true
}
  constructor(private route: ActivatedRoute,
    private http:HttpClient,
    private router: Router,
    private dataService: DatabaseService,private fb:FormBuilder) { 
      this.editForm = this.fb.group({
        
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [''] // Optional control
      });
    }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
   // console.log('ID:', id); 
    this.route.params.subscribe(params => {
      this.itemId = +params['id'];
      this.getData(this.itemId);
      //console.log(this.selectedUser);
    }); }
   
    
    getData(id:number) {
      this.http.get(`http://localhost:3023/data/${id}`).subscribe(
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
  confirmDelete() {
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      this.dataService.deleteItem(this.itemId).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }

  
  updateUser() {
    if (this.editForm.valid) {
      //console.log('Form data:', this.editForm.value); // Log form data for debugging
    
      const formData = this.editForm.value;
      formData.id=this.itemId;
      const newData={
        id :formData.id,
        fname: formData.firstName,
        lname:formData.lastName,
        email: formData.email,
        pno: formData.phoneNumber,

      }
      this.dataService.updateUser(newData,this.itemId).subscribe((response: any) => {
        //console.log('Data saved:', response,newData);
        this.isEdit=false
        //location.reload();
        // Handle success, maybe navigate to another page
      }, (error: any) => {
        console.error('Error saving data:', error);
        // Handle error
      });
    } else {
      //console.error('Form is invalid');
      //console.log(this.editForm.value); // Debugging
      // Handle invalid form
    }
    
  }


  

}
