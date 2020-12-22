import { Post } from '@entities/Post';
import { PostRepository } from '@repositories/PostRepository';
import { doRequest, setTimestamp } from '@data/util';

class PostDTO {
  id = 0;
  content = '';
  authorId = 0;
  timestamp = '';
}

export class PostRepositoryImpl implements PostRepository {
  async AddPost(content: string, authorId: number): Promise<any> {
    const response = await doRequest({
      endpoint: 'posts',
      body: {
        content,
        authorId,
        timestamp: setTimestamp(),
      },
      method: 'POST',
    });

    return response;
  }

  async GetPostByAuthor(authorIds: number[]): Promise<Post[]> {
    const data = await doRequest({
      endpoint: 'posts',
      params: `authorId=${authorIds.join('&authorId=')}&_sort=timestamp&_order=asc`,
    });
    
    return data.map((post: PostDTO) => new Post(post.id, post.content, post.authorId, post.timestamp));
  }
}
