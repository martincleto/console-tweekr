import appReducer, { initialState } from './index';

test('should handle the initial state', () => {
  // @ts-ignore
  expect(appReducer(undefined, {})).toEqual(initialState);
});

test('should handle `app/setDrawerCollapsed`', () => {
  expect(
    appReducer(initialState, {
      type: 'app/setDrawerCollapsed',
      payload: false,
    })
  ).toEqual({
    drawerCollapsed: false,
  })
});

test('should handle `app/setSidebarCollapsed`', () => {
  expect(
    appReducer(initialState, {
      type: 'app/setSidebarCollapsed',
      payload: false,
    })
  ).toEqual({
    sidebarCollapsed: false,
  })
});
