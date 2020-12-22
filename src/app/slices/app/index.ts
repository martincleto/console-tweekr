import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  drawerCollapsed: boolean;
  loading: boolean;
  sidebarCollapsed: boolean;
}

export const initialState: AppState = {
  drawerCollapsed: true,
  loading: false,
  sidebarCollapsed: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDrawerCollapsed(state, action: PayloadAction<boolean>) {
      state.drawerCollapsed = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
  }
});

export const {
  setDrawerCollapsed,
  setLoading,
  setSidebarCollapsed,
} = appSlice.actions;

export default appSlice.reducer;

