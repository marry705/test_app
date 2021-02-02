import {
  all, fork, put, call, takeLatest, delay, cancel, take, cancelled,
  AllEffect, ForkEffect, PutEffect, CallEffect,
} from 'redux-saga/effects';
import { requestFinished, showError, clearError } from '../redux/actionsRequest';
import { updateData } from '../redux/actionBitcoin';
import { updateAnalyticTagCount, updateLongestPath } from '../redux/actionAnalytic';
import {
  requestAnalicDataAction, AnalyticDataAction, tagsCount,
} from '../redux/type';
import { getRequest, getPage } from '../services/requestService';
import { getTagsCount, getLongestPath } from '../services/analyticService';
import {
  REQUEST, SERVER_HOST, ANALYTIC, TIMER,
} from '../constants';

function* requestWorker() {
  try {
    while (true) {
      try {
        const response = yield call(getRequest, SERVER_HOST);
        yield put(updateData(Object.values(response)));
        yield put(requestFinished());
        yield delay(TIMER);
      } catch (error) {
        yield put(requestFinished());
        yield put(showError(error.message));
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

export function* requestPageWorker({ payload }: requestAnalicDataAction):
Generator<CallEffect<string | Error | (Document | Element)[] | tagsCount> |
          PutEffect<AnalyticDataAction>, void, unknown> {
  try {
    const response = yield call(getPage, payload);
    const tagCount = yield call(getTagsCount, <string>response);
    yield put(updateAnalyticTagCount(<tagsCount>tagCount));
    const longestPath = yield call(getLongestPath, <string>response);
    yield put(updateLongestPath(<string>longestPath));
    yield put(clearError());
    yield put(requestFinished());
  } catch (error) {
    yield put(requestFinished());
    yield put(showError(error.message));
    yield delay(TIMER);
    yield put(clearError());
  }
}

export function* requestPageWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(ANALYTIC.REQUESTED_ANALYTIC, requestPageWorker);
}

export function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([
    fork(requestWatcher),
    fork(requestPageWatcher),
  ]);
}
