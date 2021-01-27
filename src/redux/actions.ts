import { BitcoinAction, RequestAction, Bitcoin } from './type';
import { REQUEST, DATA } from '../constants';

export const requestData = (): RequestAction => ({
  type: REQUEST.REQUESTED_DATA,
  payload: '',
});

export const requestFinished = (): RequestAction => ({
  type: REQUEST.REQUEST_FINISHED,
  payload: '',
});

export const showError = (data: string): RequestAction => ({
  type: REQUEST.ADD_ERROR_MESSAGE,
  payload: data,
});

export const clearError = (): RequestAction => ({
  type: REQUEST.CLEAR_ERROR_MESSAGE,
  payload: '',
});

export const updateData = (data: Bitcoin): BitcoinAction => ({
  type: DATA.UPDATE_DATE,
  payload: data,
});
