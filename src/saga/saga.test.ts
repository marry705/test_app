import { runSaga } from 'redux-saga';
import { requestPageWorker } from '.';
import * as services from '../services/requestService';
import { ANALYTIC, REQUEST } from '../constants';
import { requestAnalicDataAction } from '../redux/type';

afterEach(() => {
  jest.clearAllMocks();
});

test('request Page', async () => {
  const pageHtml = '<html lang="en"><head></head><div><div>Hello There</div></div><body></body></html>';
  const tageCount = {
    div: 2,
    body: 1,
    head: 1,
    html: 1,
  };
  const longestPath = '#document - HTML - BODY - DIV - DIV';

  const getPage = jest.spyOn(services, 'getPage').mockImplementation(() => Promise.resolve(pageHtml));
  const dispatched: requestAnalicDataAction[] = [];

  await runSaga({
    dispatch: (action: requestAnalicDataAction) => dispatched.push(action),
  },
  requestPageWorker, { type: typeof ANALYTIC.REQUESTED_ANALYTIC, payload: 'url' });

  expect(getPage).toHaveBeenCalledTimes(1);
  expect(dispatched).toEqual([
    { type: ANALYTIC.UPDATE_TAG_COUNT, payload: tageCount },
    { type: ANALYTIC.UPDATE_LENGTH, payload: longestPath },
    { type: REQUEST.CLEAR_ERROR_MESSAGE, payload: '' },
    { type: REQUEST.REQUEST_FINISHED, payload: '' },
  ]);
});

test('request Page with Error', async () => {
  const errorMessage = 'Error message';

  const getPage = jest.spyOn(services, 'getPage').mockImplementation(() => Promise.reject(new Error(errorMessage)));
  const dispatched: requestAnalicDataAction[] = [];

  await runSaga({
    dispatch: (action: requestAnalicDataAction) => dispatched.push(action),
  },
  requestPageWorker, { type: typeof ANALYTIC.REQUESTED_ANALYTIC, payload: 'url' });

  expect(getPage).toHaveBeenCalledTimes(1);
  expect(dispatched).toEqual([
    { type: REQUEST.REQUEST_FINISHED, payload: '' },
    { type: REQUEST.ADD_ERROR_MESSAGE, payload: errorMessage },
  ]);
});
