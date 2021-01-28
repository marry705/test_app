import { Bitcoin, BitcoinAction } from './type';
import { DATA } from '../constants';

export const updateData = (data: Bitcoin[]): BitcoinAction => ({
  type: DATA.UPDATE_DATE,
  payload: data,
});

export const updateSortField = (data: 'code' | 'rate'): BitcoinAction => ({
  type: DATA.UPDATE_SORT_FIELD,
  payload: data,
});
