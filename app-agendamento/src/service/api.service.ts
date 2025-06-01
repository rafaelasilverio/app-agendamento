import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Exemplo: GET /services
  getAllServices() {
    return this.http.get(`${this.baseUrl}/services`);
  }

  // Exemplo: POST /services (requer token)
  createService(data: any, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/services`, data, { headers });
  }

  // Exemplo: POST /auth/login
  login(data: any) {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  // Exemplo: POST /users (cadastro)
  register(data: any) {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }
}
