export const REQUEST = {
  REQUESTED_DATA: 'REQUESTED_DATA',
  REQUEST_FINISHED: 'REQUEST_FINISHED',
  ADD_ERROR_MESSAGE: 'ADD_ERROR_MESSAGE',
  CLEAR_ERROR_MESSAGE: 'CLEAR_ERROR_MESSAGE',
  STOP_REQUESTED_DATA: 'STOP_REQUESTED_DATA',
};

export const DATA = {
  UPDATE_DATE: 'UPDATE_DATE',
  UPDATE_SORT_FIELD: 'UPDATE_SORT_FIELD',
};

export const ANALYTIC = {
  REQUESTED_ANALYTIC: 'REQUESTED_ANALYTIC',
  CLEAR_ANALYTIC: 'CLEAR_ANALYTIC',
  UPDATE_TAG_COUNT: 'UPDATE_TAG_COUNT',
  UPDATE_LENGTH: 'UPDATE_LENGTH',
};

export const ROUTES = {
  CURRENCIES: '/currencies',
  ANALYSIS: '/analysis',
};

export const SERVER_HOST = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export const TIMER = 10000;

export const dateOptions = {
  year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
};
