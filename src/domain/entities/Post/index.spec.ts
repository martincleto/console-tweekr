import { Post } from './index';
import { postFixture } from '@fixtures';

let post: Post;

beforeAll(() => {
  post = new Post(postFixture.id, postFixture.content, postFixture.authorId, postFixture.timestamp);
});

test('should have a `id` property', () => {
  expect(post.id).toEqual(postFixture.id);
});

test('should have a `content` property', () => {
  expect(post.content).toEqual(postFixture.content);
});

test('should have a `authorId` property', () => {
  expect(post.authorId).toEqual(postFixture.authorId);
});

test('should have a `timestamp` property', () => {
  expect(post.timestamp).toEqual(expect.stringMatching(/[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}.[\d]{3}Z/));
});
