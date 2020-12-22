import userReducer, { initialState } from './index';
import { userFixture, usersFixture } from '@fixtures';

const state = {
  ...userFixture,
  error: null,
};
const errorMsg = 'Some error ocurred';

test('should handle the initial state', () => {
  // @ts-ignore
  expect(userReducer(undefined, {})).toEqual(initialState);
});

test('should handle `user/getUserSucess`', () => {
  expect(
    userReducer(initialState, {
      type: 'user/getUserSuccess',
      payload: [userFixture],
    })
  ).toEqual({
    id: userFixture.id,
    name: userFixture.name,
    following: userFixture.following,
    error: null,
  })
});

test('should handle `user/getUserFailed`', () => {
  expect(
    userReducer(initialState, {
      type: 'user/getUserFailed',
      payload: errorMsg,
    })
  ).toEqual({
    ...initialState,
    error: errorMsg,
  })
});

test('should handle `user/getUserSucess`', () => {
  const followingUsers = usersFixture.filter(user => userFixture.following.includes(user.id));

  expect(
    userReducer(state, {
      type: 'user/getFollowingUsersSuccess',
      payload: followingUsers,
    })
  ).toEqual({
    id: userFixture.id,
    name: userFixture.name,
    following: followingUsers,
    error: null,
  })
});

test('should handle `user/getUserFailed`', () => {
  expect(
    userReducer(state, {
      type: 'user/getUserFailed',
      payload: errorMsg,
    })
  ).toEqual({
    ...state,
    error: errorMsg,
  })
});
