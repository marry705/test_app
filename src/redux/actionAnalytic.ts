import { AnalyticDataAction, tagsCount } from './type';
import { ANALYTIC } from '../constants';

export const updateAnalyticTagCount = (data: tagsCount): AnalyticDataAction => ({
  type: ANALYTIC.UPDATE_TAG_COUNT,
  payload: data,
});

export const updateLongestPath = (data: string): AnalyticDataAction => ({
  type: ANALYTIC.UPDATE_LENGTH,
  payload: data,
});

export const requestAnalyticData = (data: string): AnalyticDataAction => ({
  type: ANALYTIC.REQUESTED_ANALYTIC,
  payload: data,
});

export const clearAnalyticData = (): AnalyticDataAction => ({
  type: ANALYTIC.CLEAR_ANALYTIC,
  payload: null,
});
