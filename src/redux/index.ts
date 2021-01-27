import { combineReducers } from 'redux';
import bitcoinDataReducer from './bitcoinDataReducer';
import requestReducer from './requestReducer';

const rootReducer = combineReducers({
  request: requestReducer,
  bitcoinData: bitcoinDataReducer,
});

export default rootReducer;
