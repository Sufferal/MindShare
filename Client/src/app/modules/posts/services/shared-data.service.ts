import { Injectable } from '@angular/core';
import { Post } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  post!: Post;
}
