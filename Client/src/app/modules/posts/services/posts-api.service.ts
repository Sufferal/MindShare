import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Post } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {
  url: string = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }
  
  getPosts() {
    return this.http.get<Post[]>(`${this.url}/data`);
  }

  createPost(newPost: Post): Observable <Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

      return this.http.post<Post>(`${this.url}/create`, newPost, httpOptions);
    }
}
