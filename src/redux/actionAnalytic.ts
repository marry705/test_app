import { AnalyticDataAction } from './type';
import { ANALYTIC } from '../constants';

const updateAnalyticData = (data: string): AnalyticDataAction => ({
  type: ANALYTIC.UPDATE_ANALYTIC,
  payload: data,
});

export default updateAnalyticData;
