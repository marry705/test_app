import { ANALYTIC } from '../constants';
import {
  AnalyticDataState, AnalyticDataAction, updateAnalyticTagCountAction, updateLongestPathAction,
} from './type';

const initialState: AnalyticDataState = {
  tagsCount: {},
  length: 0,
};

const analyticDataReducer = (
  state: AnalyticDataState = initialState,
  action: AnalyticDataAction,
): AnalyticDataState => {
  switch (action.type) {
    case ANALYTIC.UPDATE_TAG_COUNT: {
      return { ...state, tagsCount: (<updateAnalyticTagCountAction>action).payload };
    }

    case ANALYTIC.UPDATE_LENGTH: {
      return { ...state, length: (<updateLongestPathAction>action).payload };
    }

    default: return state;
  }
};

export default analyticDataReducer;
