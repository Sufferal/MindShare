import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './pages/feed/feed.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostsItemComponent } from './components/posts-item/posts-item.component';
import { CommentsItemComponent } from './components/comments-item/comments-item.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsCreateFormComponent } from './components/posts-create-form/posts-create-form.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: FeedComponent
  }
]

@NgModule({
  declarations: [
    FeedComponent,
    PostsListComponent,
    PostsItemComponent,
    CommentsItemComponent,
    PostsCreateFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class PostsModule { }
