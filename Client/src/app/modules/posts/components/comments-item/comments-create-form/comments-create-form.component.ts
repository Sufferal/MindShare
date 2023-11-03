import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  onSubmit(): void {
    
  }
}
