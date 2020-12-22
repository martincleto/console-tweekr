import { Post } from "@entities/Post";

export interface PostRepository {
  AddPost(content: string, authorId: number, timestamp: string): Promise<Post>;
  GetPostByAuthor(authorId: number[]): Promise<Post[]>;
}
