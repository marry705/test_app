import {
  all, fork, put, call, takeLatest, delay,
  AllEffect, ForkEffect,
  cancel, take, cancelled,
} from 'redux-saga/effects';
import { requestFinished, showError, clearError } from '../redux/actionsRequest';
import { updateData } from '../redux/actionBitcoin';
import { updateAnalyticTagCount, updateLongestPath } from '../redux/actionAnalytic';
import { requestAnalicDataAction } from '../redux/type';
import { getRequest, getPage } from '../services/requestService';
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
    const response = yield call(getPage, payload);
    const tagCount = yield call(getTagsCount, response);
    yield put(updateAnalyticTagCount(tagCount));
    const length = yield call(getLongestPath, response, Object.keys(tagCount)[0]);
    yield put(updateLongestPath(length));
    yield put(requestFinished());
  } catch (e) {
    yield put(requestFinished());
    yield put(showError('Request failed'));
    yield delay(TIMER);
    yield put(clearError());
  }
}

function* requestPageWatcher() {
  yield takeLatest(ANALYTIC.REQUESTED_ANALYTIC, requestPageWorker);
}

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([
    fork(requestWatcher),
    fork(requestPageWatcher),
  ]);
}
