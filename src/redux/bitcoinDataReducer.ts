import { DATA } from '../constants';
import {
  Bitcoin, BitcoinDataState, BitcoinAction, updateDataAction, updateSortFieldAction,
} from './type';

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
    case DATA.UPDATE_DATE: {
      bitcoinData = (<updateDataAction>action).payload
        // eslint-disable-next-line max-len
        .sort((bincoin1: Bitcoin, bincoin2: Bitcoin) => (bincoin1[state.sortField] > bincoin2[state.sortField] ? -1 : 1));

      return { ...state, time: new Date().toString(), bitcoinData };
    }

    case DATA.UPDATE_SORT_FIELD: {
      const sortField = (<updateSortFieldAction>action).payload;
      bitcoinData = state.bitcoinData
        // eslint-disable-next-line max-len
        .sort((bincoin1: Bitcoin, bincoin2: Bitcoin) => (bincoin1[sortField] > bincoin2[sortField] ? -1 : 1));

      return { ...state, sortField };
    }

    default: return state;
  }
};

export default bitcoinDataReducer;
