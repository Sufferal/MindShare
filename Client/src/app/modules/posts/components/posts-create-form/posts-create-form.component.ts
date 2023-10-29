import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsApiService } from '../../services/posts-api.service';
import { Post } from '../../models';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts-create-form',
  templateUrl: './posts-create-form.component.html',
  styleUrls: ['./posts-create-form.component.scss'],
})
export class PostsCreateFormComponent {
  minTitleLength: number = 7;
  maxTitleLength: number = 50;

  minContentLength: number = 10;

  showNotification: boolean = false;

  postCreationForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minTitleLength),
      Validators.maxLength(this.maxTitleLength),
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minContentLength),
    ]),
  });

  constructor(
    private postsService: PostsApiService,
    public dialogRef: MatDialogRef<PostsCreateFormComponent>,
    private notificationBar: MatSnackBar
  ) {}

  onSubmit(): void {
    if (this.postCreationForm.valid) {
      this.notificationBar.open("Post created succesfully", "Close", {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
  
      const newPost: Post = {
        title: this.postCreationForm.get('title')?.value as string,
        author: 'Author',
        content: this.postCreationForm.get('content')?.value as string,
        creationDate: new Date(),
        comments: [],
      };
  
      const req = this.postsService.createPost(newPost);
      req.subscribe(() => {
        this.showNotification = true;
      });
    } else {
      this.notificationBar.open("Post cannot be created", "Close", {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
