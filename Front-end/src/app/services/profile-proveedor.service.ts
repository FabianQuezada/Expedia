// src/app/services/profile-proveedor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from '../models/provider'; 
import { updateProvider } from '../models/Provider/updateProvider'; 

@Injectable({
  providedIn: 'root'
})
export class ProfileProveedorService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<Provider> {
      const token = localStorage.getItem('token'); 
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
  
      return this.http.get<Provider>(`${this.apiUrl}/auth/profile-proveedor`, { headers });
    }
  
  updateUserProfile(updateData: Partial<updateProvider >): Observable<updateProvider > {

    console.log(updateData)
    return this.http.patch<updateProvider >(`${this.apiUrl}/proveedor/profile-proveedor`, updateData);
  }
  
}