import { Comment } from "./comment.model";

export class Post {
    constructor(public title: string, public author: string, public content: string,
                public creationDate: Date, public comments: Comment[]) {}
}
  