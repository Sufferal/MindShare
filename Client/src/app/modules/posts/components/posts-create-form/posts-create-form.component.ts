import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostsApiService } from '../../services/posts.api.service';

@Component({
  selector: 'app-posts-create-form',
  templateUrl: './posts-create-form.component.html',
  styleUrls: ['./posts-create-form.component.scss']
})
export class PostsCreateFormComponent {
  postCreationForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });

  constructor(private postsService: PostsApiService) {}

  onSubmit() {

  }
}
