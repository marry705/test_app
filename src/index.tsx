import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/index';
import rootSaga from './saga/index';
import { SateAction, DispatchType, StateType } from './redux/type';

import App from './App';

// const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line max-len
const store = createStore(rootReducer);
// sagaMiddleware.run(rootSaga);

console.log(store);

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
