import { Component, OnInit } from '@angular/core';
import { PostsApiService } from '../../services/posts-api.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postsService: PostsApiService) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(data => {
      for (let object of data) {
        const post: Post = {
          title: object.title,
          author: object.author,
          content: object.content,
          creationDate: object.creationDate,
          comments: object.comments 
        };
        this.posts.push(post);
      }
    })
  }
}
