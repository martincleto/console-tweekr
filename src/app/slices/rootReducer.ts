import { combineReducers } from '@reduxjs/toolkit';

import appReducer from '@slices/app';
import postsReducer from '@slices/posts';
import usersReducer from '@slices/users';

const rootReducer = combineReducers({
  app: appReducer,
  post: postsReducer,
  user: usersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
