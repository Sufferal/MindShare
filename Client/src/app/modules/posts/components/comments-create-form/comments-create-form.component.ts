import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsApiService } from '../../services/posts-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post, Comment } from '../../models';

@Component({
  selector: 'app-comments-create-form',
  templateUrl: './comments-create-form.component.html',
  styleUrls: ['./comments-create-form.component.scss']
})
export class CommentsCreateFormComponent {
  @Input() post!: Post;

  commentCreationForm = new FormGroup({
    content: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private postsService: PostsApiService,
    private notificationBar: MatSnackBar
  ) {}

  onSubmit(): void {
    if (this.commentCreationForm.valid) {
      this.notificationBar.open("You left the comment", "Close", {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      const newComment: Comment = {
        author: 'author',
        creationDate: new Date(),
        content: this.commentCreationForm.get('content')?.value as string
      }

      this.post.comments.push(newComment);

      const req = this.postsService.updatePost(this.post);
      req.subscribe();

    } else {
      this.notificationBar.open("Comment cannot be left", "Close", {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
}
