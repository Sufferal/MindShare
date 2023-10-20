import { Component, OnInit } from '@angular/core';
import { PostsApiService } from '../../services/posts-api.service';
import { Post } from '../../models';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postsService: PostsApiService) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((data: Post[]) => {
      for (let post of data) {
        this.posts.push(post);
      }
    })
  }
}
