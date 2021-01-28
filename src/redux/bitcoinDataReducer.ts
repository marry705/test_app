import { DATA } from '../constants';
import { Bitcoin, BitcoinDataState, BitcoinAction } from './type';

let bitcoinData: Bitcoin[] = [];

const initialState: BitcoinDataState = {
  bitcoinData,
  time: '',
  sortField: 'code',
};

const bitcoinDataReducer = (
  state: BitcoinDataState = initialState,
  action: BitcoinAction,
): BitcoinDataState => {
  switch (action.type) {
    case DATA.UPDATE_DATE:
      // eslint-disable-next-line max-len
      bitcoinData = action.payload.sort((bincoin1: Bitcoin, bincoin2: Bitcoin) => (bincoin1[state.sortField] > bincoin2[state.sortField] ? -1 : 1));

      return { ...state, time: new Date().toString(), bitcoinData };

    case DATA.UPDATE_SORT_FIELD:
      // eslint-disable-next-line max-len
      bitcoinData = state.bitcoinData.sort((bincoin1: Bitcoin, bincoin2: Bitcoin) => (bincoin1[action.payload] > bincoin2[action.payload] ? -1 : 1));

      return { ...state, sortField: action.payload };

    default: return state;
  }
};

export default bitcoinDataReducer;
