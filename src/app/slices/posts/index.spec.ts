import postReducer, { initialState } from './index';
import { postFixture, postsFixture } from '@fixtures';

const state = {
  posts: postsFixture,
  loading: false,
  error: null,
};
const errorMsg = 'Some error ocurred';

test('should handle the initial state', () => {
  // @ts-ignore
  expect(postReducer(undefined, {})).toEqual(initialState);
});

test('should handle `post/addPostSucess`', () => {
  expect(
    postReducer(initialState, {
      type: 'post/addPostSucess',
      payload: postFixture,
    })
  ).toEqual({
    posts: [
      postFixture
    ],
    loading: false,
    error: null,
  });
});

test('should handle `post/addPostFailed`', () => {
  expect(
    postReducer(state, {
      type: 'post/addPostFailed',
      payload: errorMsg,
    })
  ).toEqual({
    ...state,
    error: errorMsg,
  });
});

test('should handle `post/getPostSuccess`', () => {
  expect(
    postReducer(initialState, {
      type: 'post/getPostSuccess',
      payload: postsFixture,
    })
  ).toEqual({
    posts: postsFixture,
    loading: false,
    error: null,
  })
});

test('should handle `post/getPostFailed`', () => {
  expect(
    postReducer(state, {
      type: 'post/getPostFailed',
      payload: errorMsg,
    })
  ).toEqual({
    ...state,
    error: errorMsg,
  });
});
