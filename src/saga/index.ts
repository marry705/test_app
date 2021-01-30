import {
  all, fork, put, call, delay, AllEffect, ForkEffect, cancel, take, cancelled, takeLatest,
} from 'redux-saga/effects';
import { requestFinished, showError, clearError } from '../redux/actionsRequest';
import { updateData } from '../redux/actionBitcoin';
import { updateAnalyticTagCount, updateLongestPath } from '../redux/actionAnalytic';
import { requestAnalicDataAction } from '../redux/type';
import { getRequest } from '../services/requestService';
import { getTagsCount, getLongestPath } from '../services/analyticService';
import {
  REQUEST, SERVER_HOST, ANALYTIC, TIMER,
} from '../constants';

function* requestWorker() {
  try {
    while (true) {
      try {
        const response = yield call(() => getRequest(SERVER_HOST));
        yield put(updateData(Object.values(response.bpi)));
        yield put(requestFinished());
        yield delay(TIMER);
      } catch (e) {
        yield put(requestFinished());
        yield put(showError('Request failed'));
        yield delay(TIMER);
        yield put(clearError());
      }
    }
  } finally {
    if (yield cancelled()) {
      yield put(requestFinished());
      yield put(clearError());
    }
  }
}

function* requestWatcher() {
  while (yield take(REQUEST.REQUESTED_DATA)) {
    const backRequest = yield fork(requestWorker);
    yield take(REQUEST.STOP_REQUESTED_DATA);
    yield cancel(backRequest);
  }
}

function* requestPageWorker({ payload }: requestAnalicDataAction) {
  try {
    const response = yield call(() => getPage());
    console.log(response);
    // const string = '<!DOCTYPE html><html lang="en"><head><title><%= htmlWebpackPlugin.options.title %></title></head><body><div id="root"><div id="root"></div><div id="root"></div></div></body></html>';
    // const tagCount = yield call(() => getTagsCount(string));
    // yield put(updateAnalyticTagCount(tagCount));
    // const length = yield call(() => getLongestPath(string, tagCount));
    // yield put(updateLongestPath(length));
    // yield put(requestFinished());
  } catch (e) {
    console.log('error');
    yield put(requestFinished());
    yield put(showError('Request failed'));
    yield delay(TIMER);
    yield put(clearError());
  }
}

function* requestPageWatcher() {
  yield takeLatest(ANALYTIC.REQUESTED_ANALYTIC, requestPageWorker);
}

function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([
    fork(requestWatcher),
    fork(requestPageWatcher),
  ]);
}

export default rootSaga;

const getPage = async () => {
  try {
    const response = await fetch('http://tut.by', {
      method: 'GET',
    });

    const parser = new DOMParser();
    const doc = parser.parseFromString(response, 'text/html');
    console.log('HTTP DOC:', doc);
  } catch (error) {
    console.error('Huston we have problem...:', error);
  }
};
