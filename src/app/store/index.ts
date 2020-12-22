import { Action, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import ReduxThunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';

import rootReducer, { RootState } from '@slices/rootReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['app'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        'app/setLoading',
        'persist/PERSIST',
        'post/addPostSucess',
        'post/getPostSuccess',
        'user/getUserSuccess',
        'user/getFollowingUsersSuccess',
      ],
    }
  }),
  ReduxThunk,
];

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('../slices/rootReducer', () => {
    const newRootReducer = require('../slices/rootReducer').default;
    store.replaceReducer(
      persistReducer(persistConfig, newRootReducer)
    )
  })
}

export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, void, Action>;
export type AppThunk = ThunkAction<Promise<any>, RootState, unknown, Action<string>>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppThunkDispatch = () => useDispatch<AppThunkDispatch>();

export {
  store,
  persistor,
}
