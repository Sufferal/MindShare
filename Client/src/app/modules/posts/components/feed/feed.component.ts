import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  private posts: Post[];

  constructor() {
    this.posts = [new Post("Initial", "Seva", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi \
    ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\
    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur \
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
    mollit anim id est laborum.", [new Comment("Cip", "hello")])];
    this.posts.push(new Post("Second topic", "Mike", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi \
    ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\
    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur \
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
    mollit anim id est laborum.", [new Comment("Ben", "hello")]))
  }

  getPosts() {
    return this.posts;
  }
}

export class Post {
  constructor(private name: string, private author: string, private content: string, private comments: Comment[]) {}

  getName() {
    return this.name;
  }

  getAuthor() {
    return this.author;
  }

  getContent() {
    return this.content;
  }

  getComments() {
    return this.comments;
  }
}

export class Comment {
  constructor(private author: string, private content: string) {}

  getAuthor() {
    return this.author;
  }

  getContent() {
    return this.content;
  }
}
