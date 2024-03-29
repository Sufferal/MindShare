import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url: string = environment.apiUrl;
  urlDiff: string = environment.apiUrlDiff;

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.urlDiff}/user`);
  }

  updateUser(updatedUser: any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<any>(`${this.urlDiff}/user/update`, updatedUser, httpOptions);
  }

  toggle2FA(user: any): any {
    return this.http.post<any>(`${this.url}/two-step-activate`, user);
  }
}
