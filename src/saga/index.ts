import {
  all, fork, put, call, delay, AllEffect, ForkEffect, cancel, take, cancelled,
} from 'redux-saga/effects';
import { requestFinished, showError, clearError } from '../redux/actionsRequest';
import { updateData } from '../redux/actionBitcoin';
import getRequest from '../services/requestService';
import { REQUEST, SERVER_HOST, TIMER } from '../constants';

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

function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(requestWatcher)]);
}

export default rootSaga;
