import { ANALYTIC, REQUEST } from '../constants';
import {
  AnalyticDataState, AnalyticDataAction, updateAnalyticTagCountAction, updateLongestPathAction,
} from './type';

const initialState: AnalyticDataState = {
  tagsCount: {},
  longestPath: '',
};

const analyticDataReducer = (
  state: AnalyticDataState = initialState,
  action: AnalyticDataAction,
): AnalyticDataState => {
  switch (action.type) {
    case REQUEST.ADD_ERROR_MESSAGE:
    case ANALYTIC.CLEAR_ANALYTIC: {
      return { ...state, longestPath: '', tagsCount: {} };
    }

    case ANALYTIC.UPDATE_TAG_COUNT: {
      return { ...state, tagsCount: (<updateAnalyticTagCountAction>action).payload };
    }

    case ANALYTIC.UPDATE_LENGTH: {
      return { ...state, longestPath: (<updateLongestPathAction>action).payload };
    }

    default: return state;
  }
};

export default analyticDataReducer;
