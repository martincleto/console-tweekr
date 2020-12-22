import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { store, persistor } from './store';
import NotFound from '@pages/NotFound';
import Wall from '@pages/Wall';
import Loading from '@components/Loading';

import './App.less';

export interface IRouteParams {
  userId: string;
};

const App = () => (
  <div className="app">
    <Provider store={store}>
      <PersistGate loading={<Loading message="Just breaking the egg..."/>} persistor={persistor}>
        <Router>
            <Switch>
              <Route path="/wall/:userId?" component={Wall} />
              <Redirect from="/" to="/wall" exact />
              <Route component={NotFound} />
            </Switch>
        </Router>
      </PersistGate>
    </Provider>
  </div>
  );

export default App;
