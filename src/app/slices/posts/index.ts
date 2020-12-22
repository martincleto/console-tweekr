import { Post } from '@entities/Post';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppThunkDispatch } from 'app/store'
import { PostRepositoryImpl } from '@data/repositories/PostRepositoryImpl';
import { PostServiceImpl } from '@usecases/PostService';
import { setLoading} from '../app';

export interface PostState {
  posts: Post[];
  error: string | null;
}

export const initialState: PostState = {
  posts: [],
  error: null,
};

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPostSucess(state, action: PayloadAction<Post>){
      state.posts.push(action.payload);
      state.error = null;
    },
    addPostFailed(state, action: PayloadAction<string>){
      state.error = action.payload;
    },
    getPostSuccess(state, action: PayloadAction<Post[]>){
      state.posts = action.payload;
      state.error = null;
    },
    getPostFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  }
});

const postRepo = new PostRepositoryImpl();
const postService = new PostServiceImpl(postRepo);

type NewPost = {
  authorId: number;
  content: string;
  timestamp: string;
};

export const addPost = (body: NewPost): AppThunk => async (dispatch: AppThunkDispatch) => {
  dispatch(setLoading(true));

  const {authorId, content, timestamp} = body;
  return postService.AddPost(content, authorId, timestamp)
    .then(
      post => dispatch(addPostSucess(post)),
      err => dispatch(addPostFailed(err.toString()))
    )
    .finally(() => dispatch(setLoading(false)));
};

export const fetchPosts = (ids: number[]): AppThunk => async (dispatch: AppThunkDispatch) => {
  dispatch(setLoading(true));

  return postService.GetPostByAuthor(ids)
    .then(
      post => dispatch(getPostSuccess(post)),
      err => dispatch(getPostFailed(err.toString()))
    )
    .finally(() => dispatch(setLoading(false)));
};

export const {
  addPostSucess,
  addPostFailed,
  getPostSuccess,
  getPostFailed,
} = postsSlice.actions;

export default postsSlice.reducer;

