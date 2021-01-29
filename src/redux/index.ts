import { combineReducers } from 'redux';
import bitcoinDataReducer from './bitcoinDataReducer';
import requestReducer from './requestReducer';
import analyticDataReducer from './analyticDataReducer';

const rootReducer = combineReducers({
  request: requestReducer,
  bitcoinData: bitcoinDataReducer,
  analyticData: analyticDataReducer,
});

export default rootReducer;
