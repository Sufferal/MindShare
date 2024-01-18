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

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.url}/user`);
  }

  updateUser(updatedUser: User): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<any>(`${this.url}/user/update`, updatedUser, httpOptions);
  }
}
