import { REQUEST } from '../constants';
import { RequestState, RequestAction } from './type';

const initialState: RequestState = {
  isLoading: false,
  error: '',
};

const requestReducer = (
  state: RequestState = initialState,
  action: RequestAction,
): RequestState => {
  switch (action.type) {
    case REQUEST.REQUESTED_DATA:
      return { ...state, isLoading: true, error: '' };

    case REQUEST.REQUEST_FINISHED:
      return { ...state, isLoading: false };

    case REQUEST.ADD_ERROR_MESSAGE:
      return { ...state, error: action.payload };

    case REQUEST.CLEAR_ERROR_MESSAGE:
      return { ...state, error: '' };

    default: return state;
  }
};

export default requestReducer;