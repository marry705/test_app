import reducer from './analyticDataReducer';
import { AnalyticDataState } from './type';
import { ANALYTIC } from '../constants';

test('Analytic Reducer', () => {
  const initialState:AnalyticDataState = {
    tagsCount: {},
    length: 0,
  };

  const mockDataLength:AnalyticDataState = {
    tagsCount: {},
    length: 10,
  };

  const tagsCount = {
    span: 5,
    div: 2,
    html: 1,
  };

  const mockDataTagsCount:AnalyticDataState = {
    tagsCount,
    length: 10,
  };

  expect(reducer(initialState, { type: 'null', payload: '' })).toEqual(initialState);
  expect(reducer(initialState, { type: ANALYTIC.UPDATE_LENGTH, payload: 10 })).toEqual(mockDataLength);
  expect(reducer(mockDataLength, { type: ANALYTIC.UPDATE_TAG_COUNT, payload: tagsCount })).toEqual(mockDataTagsCount);
  expect(reducer(mockDataTagsCount, { type: ANALYTIC.CLEAR_ANALYTIC, payload: null })).toEqual(initialState);
});
