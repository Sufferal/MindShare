import { Component, OnInit } from '@angular/core';
import { PostsApiService } from '../../services/posts-api.service';
import { Post } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { PostsCreateFormComponent } from '../../components';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  showPostForm: boolean = false;
  posts: Post[] = [];

  constructor(private postsService: PostsApiService, private dialog: MatDialog) {}

  ngOnInit(): void {    
    this.postsService.getPosts().subscribe((data: Post[]) => this.posts = data);
  }

  openDialog(): void {
    this.dialog.open(PostsCreateFormComponent, {
      width: '500px',
    });
  }
}
