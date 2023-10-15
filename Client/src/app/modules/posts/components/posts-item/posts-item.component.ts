import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-posts-item',
  templateUrl: './posts-item.component.html',
  styleUrls: ['./posts-item.component.scss'],
  
})
export class PostsItemComponent {
  @Input() post!: Post;
}
