import { PostRepositoryImpl } from './index';
import * as request from '@data/util';
import { postFixture, postsFixture, userFixture, usersFixture } from '@fixtures';

jest.mock('../../util/request');

let mockRequest: jest.SpyInstance;
let postRepository: PostRepositoryImpl;

beforeAll(() => {
  mockRequest = jest.spyOn(request, 'doRequest');
  postRepository = new PostRepositoryImpl();
});

test('should add a new post', async () => {
  mockRequest.mockReturnValueOnce({
    status: 'success',
  });
});

test('should get posts by a single author ordered by timestamp', async () => {
  mockRequest.mockReturnValueOnce([postFixture]);
  const posts = await postRepository.GetPostByAuthor([userFixture.id]);

  expect(mockRequest).toHaveBeenCalledWith({
    endpoint: 'posts',
    params: `authorId=${userFixture.id}&_sort=timestamp&_order=asc`
  });
  expect(posts).toEqual([postFixture]);
});

test('should get posts by multiple authors ordered by timestamp', async () => {
  const requestedAuthorIds = [
    usersFixture[4].id,
    usersFixture[1].id,
    usersFixture[2].id,
  ];
  mockRequest.mockReturnValueOnce(postsFixture);
  const posts = await postRepository.GetPostByAuthor(requestedAuthorIds);

  expect(mockRequest).toHaveBeenCalledWith({
    endpoint: 'posts',
    params: `authorId=${requestedAuthorIds.join('&authorId=')}&_sort=timestamp&_order=asc`
  });
  expect(posts).toEqual(postsFixture);
});
