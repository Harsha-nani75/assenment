import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  data: any;

  constructor(private http:HttpClient) { }
  apiUrl = 'http://localhost:3023';

  addItem(formData: any) {
    return this.http.post<any>(`${this.apiUrl}/pTask`, formData); // Use the correct endpoint URL
  }
 /* getItemById(id: number) {
    const url = `${this.apiUrl}/data/${id}`; // Construct the URL with the actual ID value
    this.http.get(url).subscribe(
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
  }*/

// Assuming DataService is your service class
getItemById(id: number): Observable<any> {
  return this.http.get(`http://localhost:3022/data/${id}`);
}

    deleteItem(id: number) {
    return this.http.delete(`${this.apiUrl}/dTask/${id}`);
  }
  updateUser(newData:any,id:number){
    return this.http.put(`http://localhost:3022/uTask/${id}`, newData);
  }
}
