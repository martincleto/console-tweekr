import { Post } from '@entities/Post';
import { PostRepository } from '@repositories/PostRepository';

export interface PostService {
  AddPost(content: string, authorId: number, timestamp: string): Promise<any>;
  GetPostByAuthor(authorIds: number[]): Promise<Post[]>;
}

export class PostServiceImpl implements PostService {
  postRepo: PostRepository;

  constructor(repository: PostRepository) {
    this.postRepo = repository;
  }

  async AddPost(content: string, authorId: number, timestamp: string): Promise<any> {
    return this.postRepo.AddPost(content, authorId, timestamp);
  }

  async GetPostByAuthor(authorIds: number[]): Promise<Post[]> {
    return this.postRepo.GetPostByAuthor(authorIds);
  }
}
