import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // apiUrl = 'http://localhost:3000/api/auth';
  apiUrl = 'https://leave-backend-gamma.vercel.app/api/auth';
  
    constructor(private http: HttpClient) { }

register(data: any) {
  return this.http.post(`${this.apiUrl}/register`, data);
}

login(data: any) {
  return this.http.post(`${this.apiUrl}/login`, data);
}

saveUser(user: any) {
  localStorage.setItem('user', JSON.stringify(user));
}

getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}');
}

logout() {
  localStorage.removeItem('user');
}
}