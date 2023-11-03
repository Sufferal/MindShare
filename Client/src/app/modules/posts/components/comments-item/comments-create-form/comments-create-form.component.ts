import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsApiService } from '../../../services/posts-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comments-create-form',
  templateUrl: './comments-create-form.component.html',
  styleUrls: ['./comments-create-form.component.scss']
})
export class CommentsCreateFormComponent {
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
    } else {
      this.notificationBar.open("Comment cannot be left", "Close", {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
}
