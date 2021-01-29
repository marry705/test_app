import { CombinedState } from 'redux';
import { REQUEST, DATA, ANALYTIC } from '../constants';

export type RequestState = {
    isLoading: boolean,
    error: string,
};

export type Bitcoin = {
    code: string,
    symbol: string,
    rate: string,
    description: string,
    'rate_float': number,
};

export type BitcoinDataState = {
    bitcoinData: Bitcoin[],
    time: string,
    sortField: 'code' | 'rate',
};

export type TagCount = {
    tag: string,
    count: number,
};

export type AnalyticDataState = {
    webpage: string,
    tagsCount: TagCount[],
    length: number,
};

interface requestDataAction {
    type: typeof REQUEST.REQUESTED_DATA,
    payload: string,
}

interface requestFinishedAction {
    type: typeof REQUEST.REQUEST_FINISHED,
    payload: string,
}

interface showErrorAction {
    type: typeof REQUEST.ADD_ERROR_MESSAGE,
    payload: string,
}

interface clearErrorAction {
    type: typeof REQUEST.CLEAR_ERROR_MESSAGE,
    payload: string,
}

interface requestStopedAction {
    type: typeof REQUEST.STOP_REQUESTED_DATA,
    payload: string,
}

export type RequestAction = requestDataAction |
    requestFinishedAction |
    showErrorAction |
    clearErrorAction |
    requestStopedAction;

export type updateDataAction = {
    type: typeof DATA.UPDATE_DATE,
    payload: Bitcoin[],
}

export type updateSortFieldAction = {
    type: typeof DATA.UPDATE_SORT_FIELD,
    payload: 'code' | 'rate',
}

export type BitcoinAction = updateDataAction | updateSortFieldAction;

export type AnalyticDataAction = {
    type: typeof ANALYTIC.UPDATE_ANALYTIC,
    payload: string,
};

export type StateType = CombinedState<{
    request: RequestState;
    bitcoinData: BitcoinDataState;
    analyticData: AnalyticDataState;
}>;
