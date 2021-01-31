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

import BitcoinRow from './BitcoinRow';
import rootReducer from '../../redux/index';
import { StateType, Bitcoin } from '../../redux/type';

afterEach(cleanup);

test('Checking the initial rendering of the component BitcoinRow first', async () => {
  const sagaMiddleware = createSagaMiddleware();
  const store: Store<StateType, AnyAction> & { dispatch: Dispatch } = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  const bitcoin1:Bitcoin = {
    code: 'EUR',
    symbol: '&euro;',
    rate: '27,251.6361',
    description: 'Euro',
    rate_float: 27251.6361,
  };

  act(() => {
    render(
      <Provider store={store}>
        <BitcoinRow bitcoin={bitcoin1} />
      </Provider>,
    );
  });

  const code = await screen.findByText(bitcoin1.code);
  expect(code).toBeInTheDocument();

  const rateFloat = await screen.findByText(bitcoin1.rate_float);
  expect(rateFloat).toBeInTheDocument();

  const description = await screen.findByText(bitcoin1.description);
  expect(description).toBeInTheDocument();
});

test('Checking the initial rendering of the component BitcoinRow second', async () => {
  const sagaMiddleware = createSagaMiddleware();
  const store: Store<StateType, AnyAction> & { dispatch: Dispatch } = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  const bitcoin2:Bitcoin = {
    code: 'USD',
    description: 'United States Dollar',
    rate: '32,908.0669',
    rate_float: 32908.0669,
    symbol: '&#36;',
  };

  act(() => {
    render(
      <Provider store={store}>
        <BitcoinRow bitcoin={bitcoin2} />
      </Provider>,
    );
  });

  const code = await screen.findByText(bitcoin2.code);
  expect(code).toBeInTheDocument();

  const rateFloat = await screen.findByText(bitcoin2.rate_float);
  expect(rateFloat).toBeInTheDocument();

  const description = await screen.findByText(bitcoin2.description);
  expect(description).toBeInTheDocument();
});
