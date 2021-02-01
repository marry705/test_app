import * as React from 'react';
import { render } from 'react-dom';
import 'regenerator-runtime/runtime';
import createSagaMiddleware from 'redux-saga';
import {
  applyMiddleware, createStore, Store, AnyAction, Dispatch,
} from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import rootReducer from './redux/index';
import rootSaga from './saga/index';
import { StateType } from './redux/type';

import App from './App';

const sagaMiddleware = createSagaMiddleware();

const store: Store<StateType, AnyAction> & { dispatch: Dispatch } = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
