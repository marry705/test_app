import { DATA } from '../constants';
import { BitcoinDataState, BitcoinAction } from './type';

const initialState: BitcoinDataState = {
  bitcoinData: [],
  time: '',
};

const bitcoinDataReducer = (
  state: BitcoinDataState = initialState,
  action: BitcoinAction,
): BitcoinDataState => {
  switch (action.type) {
    case DATA.UPDATE_DATE:
      return { ...state, time: new Date().toString() };

    default: return state;
  }
};

export default bitcoinDataReducer;
