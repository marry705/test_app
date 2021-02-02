import reducer from './analyticDataReducer';
import { AnalyticDataState } from './type';
import { ANALYTIC } from '../constants';

test('Analytic Reducer', () => {
  const initialState:AnalyticDataState = {
    tagsCount: {},
    longestPath: '',
  };

  const mockDataLength:AnalyticDataState = {
    tagsCount: {},
    longestPath: 'html - body - div.book - span',
  };

  const tagsCount = {
    span: 5,
    div: 2,
    html: 1,
  };

  const mockDataTagsCount:AnalyticDataState = {
    tagsCount,
    longestPath: 'html - body - div.book - span',
  };

  expect(reducer(initialState, { type: 'null', payload: '' })).toEqual(initialState);
  expect(reducer(initialState, { type: ANALYTIC.UPDATE_LENGTH, payload: 'html - body - div.book - span' })).toEqual(mockDataLength);
  expect(reducer(mockDataLength, { type: ANALYTIC.UPDATE_TAG_COUNT, payload: tagsCount })).toEqual(mockDataTagsCount);
  expect(reducer(mockDataTagsCount, { type: ANALYTIC.CLEAR_ANALYTIC, payload: null })).toEqual(initialState);
});
