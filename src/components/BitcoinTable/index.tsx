import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestData, requestStoped } from '../../redux/actionsRequest';
import { updateSortField } from '../../redux/actionBitcoin';
import { StateType } from '../../redux/type';
import { dateOptions } from '../../constants';
import BitcoinRow from './BitcoinRow';

import './BitcoinTable.css';

const BitcoinTable: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: StateType) => state.request);
  const { bitcoinData, time } = useSelector((state: StateType) => state.bitcoinData);

  React.useEffect(() => {
    dispatch(requestData());
    return () => dispatch(requestStoped());
  }, [dispatch]);

  if (error) {
    return (
      <div>{error}</div>
    );
  } if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="info-field">{new Date(time).toLocaleDateString('ru', dateOptions)}</div>
      <table className="bitcoin-table">
        <thead>
          <tr>
            <th onClick={() => dispatch(updateSortField('code'))}>Code</th>
            <th>Description</th>
            <th onClick={() => dispatch(updateSortField('rate'))}>Rate</th>
          </tr>
        </thead>
        <tbody>
          {bitcoinData.map((bitcoin) => (
            <BitcoinRow key={bitcoin.rate} bitcoin={bitcoin} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BitcoinTable;
