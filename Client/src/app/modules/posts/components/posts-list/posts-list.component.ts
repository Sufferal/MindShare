import { Component, OnInit } from '@angular/core';
import { PostsApiService } from '../../services/posts.api.service';
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
        const post = new Post(object.title, object.author, object.content, object.creationDate, object.comments);
        this.posts.push(post);
      }
    })
  }
}
