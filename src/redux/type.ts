import { REQUEST, DATA } from '../constants';

export type RequestState = {
    isLoading: boolean,
    error: string,
};

export type Bitcoin = {
    id: string,
    data: string,
};

export type BitcoinDataState = {
    bitcoinData: Bitcoin[],
    time: string,
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

// eslint-disable-next-line max-len
export type RequestAction = requestDataAction | requestFinishedAction | showErrorAction | clearErrorAction;

interface updateDataAction {
    type: typeof DATA.UPDATE_DATE,
    payload: Bitcoin,
}

export type BitcoinAction = updateDataAction;

export type StateType = {
    request: RequestState,
    bitcoinData: BitcoinDataState,
};

export type SateAction = RequestAction | BitcoinAction;

export type DispatchType = (args: SateAction) => SateAction;
