import { Component, Input } from '@angular/core';
import { PostsApiService } from '../../services/posts-api.service';
import { Post } from '../../models';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent {
  @Input() posts: Post[] = [];
}
