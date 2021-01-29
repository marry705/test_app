import { ANALYTIC } from '../constants';
import { AnalyticDataState, AnalyticDataAction } from './type';
import { getTagsCount, getLongestPath } from '../services/analyticService';

const initialState: AnalyticDataState = {
  webpage: '',
  tagsCount: [],
  length: 0,
};

const analyticDataReducer = (
  state: AnalyticDataState = initialState,
  action: AnalyticDataAction,
): AnalyticDataState => {
  switch (action.type) {
    case ANALYTIC.UPDATE_ANALYTIC: {
      const tagsCount = getTagsCount(action.payload);
      const length = getLongestPath(tagsCount[0]);
      return { ...state, length, tagsCount };
    }

    default: return state;
  }
};

export default analyticDataReducer;
