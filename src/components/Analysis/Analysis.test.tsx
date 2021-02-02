import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, cleanup, screen, fireEvent,
} from '@testing-library/react';
import createSagaMiddleware from 'redux-saga';
import {
  applyMiddleware, createStore, Store, AnyAction, Dispatch,
} from 'redux';
import { Provider } from 'react-redux';
import * as actions from '../../redux/actionAnalytic';

import Analysis from '.';
import rootReducer from '../../redux';
import { StateType } from '../../redux/type';

const sagaMiddleware = createSagaMiddleware();

const store: Store<StateType, AnyAction> & { dispatch: Dispatch } = createStore(rootReducer, applyMiddleware(sagaMiddleware));

beforeEach(() => {
  render(
    <Provider store={store}>
      <Analysis />
    </Provider>,
  );
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('Checking the initial rendering of the component Analysis', () => {
  expect(screen.getByPlaceholderText(/domain.tld/i)).toBeInTheDocument();
});

test('Checking the input in the component Analysis', async () => {
  const requestData = jest.spyOn(actions, 'requestAnalyticData');
  const testUrl = 'https://www.tut.by/';

  const inputNode = await screen.getByPlaceholderText(/domain.tld/i);
  fireEvent.change(inputNode, { target: { value: testUrl } });

  fireEvent.keyPress(inputNode, { key: 'Enter', charCode: 13 });
  expect(requestData).toHaveBeenCalledTimes(1);
  expect(requestData).toHaveBeenLastCalledWith(testUrl);
});

test('Checking the input with empty data in the component Analysis', async () => {
  const requestData = jest.spyOn(actions, 'requestAnalyticData');
  const inputNode = await screen.getByPlaceholderText(/domain.tld/i);

  fireEvent.change(inputNode, { target: { value: '' } });
  fireEvent.keyPress(inputNode, { key: 'Enter', charCode: 13 });
  expect(requestData).toHaveBeenCalledTimes(0);
});
