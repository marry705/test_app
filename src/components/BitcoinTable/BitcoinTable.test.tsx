import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, cleanup, fireEvent,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import createSagaMiddleware from 'redux-saga';
import {
  applyMiddleware, createStore, Store, AnyAction, Dispatch,
} from 'redux';
import { Provider } from 'react-redux';
import * as requestActions from '../../redux/actionsRequest';
import * as bitcoinActions from '../../redux/actionBitcoin';
import * as services from '../../services/requestService';
import { rootSaga } from '../../saga';

import BitcoinTable from '.';
import rootReducer from '../../redux';
import {
  StateType, BitcoinDataState, AnalyticDataState, RequestState,
} from '../../redux/type';

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const initialState:BitcoinDataState = {
  bitcoinData: [],
  time: '',
  sortField: 'code',
};
const analyticState:AnalyticDataState = {
  tagsCount: {},
  longestPath: '',
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

test('Checking the initial rendering of the component BitcoinTable with data', async () => {
  const request = {
    EUR: {
      code: 'EUR', symbol: '&euro;', rate: '29,188.0671', description: 'Euro', rate_float: 29188.0671,
    },
  };
  jest.spyOn(services, 'getRequest').mockImplementation(() => Promise.resolve(request));
  const requestData = jest.spyOn(requestActions, 'requestData');

  const sagaMiddleware = createSagaMiddleware();
  const store: Store<StateType, AnyAction> & { dispatch: Dispatch } = createStore(rootReducer, initialMainState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  act(() => {
    render(
      <Provider store={store}>
        <BitcoinTable />
      </Provider>,
    );
  });

  expect(requestData).toHaveBeenCalledTimes(1);

  let tableTh = await screen.findByText('Code*');
  expect(tableTh).toBeInTheDocument();
  tableTh = await screen.findByText('Description');
  expect(tableTh).toBeInTheDocument();
  tableTh = await screen.findByText('Rate');
  expect(tableTh).toBeInTheDocument();

  let tableTd = await screen.findByText('EUR');
  expect(tableTd).toBeInTheDocument();
  tableTd = await screen.findByText('Euro');
  expect(tableTd).toBeInTheDocument();
  tableTd = await screen.findByText('29188.0671');
  expect(tableTd).toBeInTheDocument();
});

test('Checking the initial rendering of the component BitcoinTable with error', async () => {
  jest.spyOn(services, 'getRequest').mockImplementation(() => Promise.reject(new Error('Error Message')));
  const requestData = jest.spyOn(requestActions, 'requestData');

  const sagaMiddleware = createSagaMiddleware();
  const store: Store<StateType, AnyAction> & { dispatch: Dispatch } = createStore(rootReducer, initialMainState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  act(() => {
    render(
      <Provider store={store}>
        <BitcoinTable />
      </Provider>,
    );
  });

  expect(requestData).toHaveBeenCalledTimes(1);
  const error = await screen.findByText('Error Message');
  expect(error).toBeInTheDocument();
});

test('Checking the sort function of the component BitcoinTable', async () => {
  const request = {
    EUR: {
      code: 'EUR', symbol: '&euro;', rate: '29,188.0671', description: 'Euro', rate_float: 29188.0671,
    },
  };
  jest.spyOn(services, 'getRequest').mockImplementation(() => Promise.resolve(request));
  const sortData = jest.spyOn(bitcoinActions, 'updateSortField');

  const sagaMiddleware = createSagaMiddleware();
  const store: Store<StateType, AnyAction> & { dispatch: Dispatch } = createStore(rootReducer, initialMainState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  act(() => {
    render(
      <Provider store={store}>
        <BitcoinTable />
      </Provider>,
    );
  });

  let tableTh = await screen.findByText('Code*');
  expect(tableTh).toBeInTheDocument();
  fireEvent.click(tableTh);
  expect(sortData).toHaveBeenCalledTimes(1);
  expect(sortData).toHaveBeenLastCalledWith('code');

  tableTh = await screen.findByText('Rate');
  expect(tableTh).toBeInTheDocument();
  fireEvent.click(tableTh);
  expect(sortData).toHaveBeenCalledTimes(2);
  expect(sortData).toHaveBeenLastCalledWith('rate');
});
