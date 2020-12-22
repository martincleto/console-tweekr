import { User } from '@entities/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppThunkDispatch } from 'app/store'
import { UserRepositoryImpl } from '@data/repositories/UserRepositoryImpl';
import { UserServiceImpl } from '@usecases/UserService';
import { setLoading } from '../app';

export interface UserState {
  id: number;
  name: string;
  following: number[] | User[];
  error: string | null;
}

export const initialState: UserState = {
  id: 0,
  name: '',
  following: [],
  error: null,
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserSuccess(state, action: PayloadAction<User[]>) {
      const { id, name, following } = action.payload[0];
      state.id = id;
      state.name = name;
      state.following = following;
      state.error = null;
    },
    getUserFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    getFollowingUsersSuccess(state, action: PayloadAction<User[]>) {
      state.following = action.payload;
      state.error = null;
    },
    getFollowingUsersFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  }
});

const userRepo = new UserRepositoryImpl();
const userService = new UserServiceImpl(userRepo);

export const fetchUser = (id: number): AppThunk => async (dispatch: AppThunkDispatch) => {
  dispatch(setLoading(true));

  return userService.GetUser([id])
    .then(
      user => dispatch(getUserSuccess(user)),
      err => dispatch(getUserFailed(err.toString()))
    )
    .finally(() => dispatch(setLoading(false)));
};

export const fetchFollowingUsers = (ids: number[]): AppThunk => async (dispatch: AppThunkDispatch) => {
  dispatch(setLoading(true));

  return userService.GetUser(ids)
    .then(
      users => dispatch(getFollowingUsersSuccess(users)),
      err => dispatch(getFollowingUsersFailed(err.toString()))
    )
    .finally(() => dispatch(setLoading(false)));
};

// TODO get this reduxed (follow user feauture not implemented)
export const searchUsers = (query: string) => userService.SearchUser(query);

export const {
  getUserSuccess,
  getUserFailed,
  getFollowingUsersSuccess,
  getFollowingUsersFailed,
} = usersSlice.actions;

export default usersSlice.reducer;
