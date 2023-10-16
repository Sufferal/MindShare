import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './pages';
import { PostsListComponent, PostsItemComponent, PostsCreateFormComponent, CommentsItemComponent } from './components';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsRoutingModule } from './posts-routing.module';


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
    PostsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class PostsModule { }
