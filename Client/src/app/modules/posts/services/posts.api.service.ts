import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {
  constructor(private http: HttpClient) { }
  
  getPosts(): Observable<any> {
    const url = 'http://127.0.0.1:3000/data'
    return this.http.get(url)
  }
}
