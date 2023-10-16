import { Comment } from "./comment.model";

export interface Post {
    title: string;
    author: string;
    content: string;
    creationDate: Date;
    comments: Comment[];
}
  