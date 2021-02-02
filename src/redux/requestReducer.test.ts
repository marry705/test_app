import reducer from './requestReducer';
import { RequestState } from './type';
import { REQUEST } from '../constants';

test('Request Reducer', () => {
  const initialState:RequestState = {
    isLoading: false,
    error: '',
  };

  const mockDataLoading:RequestState = {
    isLoading: true,
    error: '',
  };

  const mockDataError:RequestState = {
    isLoading: false,
    error: 'ErrorMessage',
  };

  expect(reducer(initialState, { type: 'null', payload: '' })).toEqual(initialState);
  expect(reducer(initialState, { type: REQUEST.REQUESTED_DATA, payload: '' })).toEqual(mockDataLoading);
  expect(reducer(mockDataLoading, { type: REQUEST.REQUEST_FINISHED, payload: '' })).toEqual(initialState);
  expect(reducer(initialState, { type: REQUEST.ADD_ERROR_MESSAGE, payload: 'ErrorMessage' })).toEqual(mockDataError);
  expect(reducer(mockDataError, { type: REQUEST.CLEAR_ERROR_MESSAGE, payload: '' })).toEqual(initialState);
  expect(reducer(mockDataError, { type: REQUEST.STOP_REQUESTED_DATA, payload: '' })).toEqual(initialState);
  expect(reducer(mockDataLoading, { type: REQUEST.STOP_REQUESTED_DATA, payload: '' })).toEqual(initialState);
});
