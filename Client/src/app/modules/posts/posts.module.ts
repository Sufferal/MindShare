import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { FeedComponent } from './components/feed/feed.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PostsPageComponent
  }
]

@NgModule({
  declarations: [
    PostsPageComponent,
    FeedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PostsModule { }
