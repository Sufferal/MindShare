import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  apiUrl: string = environment.apiUrl;
  apiUrlDiff: string = environment.apiUrlDiff;

  constructor(private http: HttpClient) { }

  getUser(loginData: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }
 
  // This is for server.js
  postUser(newUser: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(`${this.apiUrlDiff}/user/create`, newUser, httpOptions);
  }
}
