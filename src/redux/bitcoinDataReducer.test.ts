import reducer from './bitcoinDataReducer';
import { BitcoinDataState, Bitcoin } from './type';
import { DATA } from '../constants';

test('Bitcoin Reducer', () => {
  const initialState:BitcoinDataState = {
    bitcoinData: [],
    time: new Date().toString(),
    sortField: 'code',
  };

  const mockDataSort:BitcoinDataState = {
    bitcoinData: [],
    time: new Date().toString(),
    sortField: 'rate',
  };

  const bitcoin1:Bitcoin = {
    code: 'USD',
    description: 'United States Dollar',
    rate: '32,908.0669',
    rate_float: 32908.0669,
    symbol: '&#36;',
  };

  const mockDataBitcoin:BitcoinDataState = {
    bitcoinData: [bitcoin1],
    time: new Date().toString(),
    sortField: 'code',
  };

  expect(reducer(initialState, { type: 'null', payload: 'rate' })).toEqual(initialState);
  expect(reducer(initialState, { type: DATA.UPDATE_SORT_FIELD, payload: 'rate' })).toEqual(mockDataSort);
  expect(reducer(initialState, { type: DATA.UPDATE_DATE, payload: [bitcoin1] })).toEqual(mockDataBitcoin);
});
