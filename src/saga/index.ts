import {
  all, fork, put, call, delay, takeLatest, AllEffect, ForkEffect,
} from 'redux-saga/effects';
import { requestFinished, showError, clearError } from '../redux/actionsRequest';
import { updateData } from '../redux/actionBitcoin';
import getRequest from '../services/requestService';
import { REQUEST, SERVER_HOST } from '../constants';

function* requestWorker() {
  try {
    const response = yield call(() => getRequest(SERVER_HOST));
    yield put(updateData(Object.values(response.bpi)));
    yield put(requestFinished());
  } catch (e) {
    yield put(requestFinished());
    yield put(showError('Request failed'));
    yield delay(5000);
    yield put(clearError());
  }
}

function* requestWatcher() {
  yield takeLatest(REQUEST.REQUESTED_DATA, requestWorker);
}

function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(requestWatcher)]);
}

export default rootSaga;
