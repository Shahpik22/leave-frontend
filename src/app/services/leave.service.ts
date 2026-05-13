import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  apiUrl = 'http://localhost:3000/api/leave';

  constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token') || ''
      })
    };
  }

  applyLeave(data: any) {
    return this.http.post(
      `${this.apiUrl}/apply`,
      data,
      this.getHeaders()
    );
  }

  getLeaves() {
    return this.http.get(
      `${this.apiUrl}/list`,
      this.getHeaders()
    );
  }
}