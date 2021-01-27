import {
  all, fork, put, call, delay, takeLatest,
} from 'redux-saga/effects';
import { REQUEST } from '../constants';
import {
  requestData, requestFinished, updateData, showError, clearError,
} from '../redux/actions';
import getRequest from '../services/requestService';

function* requestWorker() {
  try {
    const response = yield call(() => getRequest());
    console.log(response);
    // yield put(updateData(response));
    // yield put(requestFinished());
  } catch (e) {
    yield put(showError('Request failed'));
    yield delay(5000);
    yield put(clearError());
  }
}

function* requestWatcher() {
  yield takeLatest(REQUEST.REQUESTED_DATA, requestWorker);
}

export default function* rootSaga() {
  yield all([
    fork(requestWatcher),
  ]);
}
