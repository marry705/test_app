import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, cleanup, screen,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import createSagaMiddleware from 'redux-saga';
import {
  applyMiddleware, createStore, Store, AnyAction, Dispatch,
} from 'redux';
import { Provider } from 'react-redux';

import AnalysisBord from './AnalysisBord';
import rootReducer from '../../redux/index';
import {
  StateType, BitcoinDataState, AnalyticDataState, RequestState,
} from '../../redux/type';

const initialState:BitcoinDataState = {
  bitcoinData: [],
  time: '',
  sortField: 'code',
};

afterEach(cleanup);

test('Checking the initial rendering of the component AnalysisBord with Loading', async () => {
  const analyticState:AnalyticDataState = {
    tagsCount: {},
    length: 0,
  };
  const requestState:RequestState = {
    isLoading: true,
    error: '',
  };

  const initialMainState:StateType = {
    request: requestState,
    bitcoinData: initialState,
    analyticData: analyticState,
  };

  const sagaMiddleware = createSagaMiddleware();
  const store: Store<StateType, AnyAction> & { dispatch: Dispatch } = createStore(rootReducer, initialMainState, applyMiddleware(sagaMiddleware));

  act(() => {
    render(
      <Provider store={store}>
        <AnalysisBord />
      </Provider>,
    );
  });

  const loadingMessage = await screen.findByText('Loading...');
  expect(loadingMessage).toBeInTheDocument();
});

test('Checking the initial rendering of the component AnalysisBord with Error', async () => {
  const analyticState:AnalyticDataState = {
    tagsCount: {},
    length: 0,
  };
  const requestState:RequestState = {
    isLoading: false,
    error: 'Request falled',
  };

  const initialMainState:StateType = {
    request: requestState,
    bitcoinData: initialState,
    analyticData: analyticState,
  };

  const sagaMiddleware = createSagaMiddleware();
  const store: Store<StateType, AnyAction> & { dispatch: Dispatch } = createStore(rootReducer, initialMainState, applyMiddleware(sagaMiddleware));

  act(() => {
    render(
      <Provider store={store}>
        <AnalysisBord />
      </Provider>,
    );
  });

  const errorMessage = await screen.findByText('Request falled');
  expect(errorMessage).toBeInTheDocument();
});

test('Checking the initial rendering of the component AnalysisBord with Data', async () => {
  const analyticState:AnalyticDataState = {
    tagsCount: {
      span: 5,
      div: 2,
      html: 1,
    },
    length: 6,
  };
  const requestState:RequestState = {
    isLoading: false,
    error: '',
  };

  const initialMainState:StateType = {
    request: requestState,
    bitcoinData: initialState,
    analyticData: analyticState,
  };

  const sagaMiddleware = createSagaMiddleware();
  const store: Store<StateType, AnyAction> & { dispatch: Dispatch } = createStore(rootReducer, initialMainState, applyMiddleware(sagaMiddleware));

  act(() => {
    render(
      <Provider store={store}>
        <AnalysisBord />
      </Provider>,
    );
  });

  let tagName = await screen.findByText(analyticState.tagsCount[Object.keys(analyticState.tagsCount)[0]]);
  expect(tagName).toBeInTheDocument();

  tagName = await screen.findByText(analyticState.tagsCount[Object.keys(analyticState.tagsCount)[1]]);
  expect(tagName).toBeInTheDocument();

  tagName = await screen.findByText(analyticState.tagsCount[Object.keys(analyticState.tagsCount)[2]]);
  expect(tagName).toBeInTheDocument();
});
