import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestStarted, requestStoped } from '../../redux/actionsRequest';
import { updateSortField } from '../../redux/actionBitcoin';
import { StateType } from '../../redux/type';
import { dateOptions } from '../../constants';

import './BitcoinTable.css';

const BitcoinTable: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: StateType) => state.request);
  const { bitcoinData, time, sortField } = useSelector((state: StateType) => state.bitcoinData);

  React.useEffect(() => {
    dispatch(requestStarted());
    return () => dispatch(requestStoped());
  }, [dispatch]);

  if (error) {
    return (
      <div className="error-info">{error}</div>
    );
  }
  if (isLoading) {
    return <div className="loading-info">Loading...</div>;
  }
  return (
    <>
      <div className="info-field">
        The last update was at
        {' '}
        {new Date(time).toLocaleDateString('en-US', dateOptions)}
      </div>
      <table className="info-table">
        <thead>
          <tr>
            <th
              className="sort-field"
              onClick={() => dispatch(updateSortField('code'))}
            >
              Code
              {sortField === 'code' ? '*' : null}
            </th>
            <th>Description</th>
            <th
              className="sort-field"
              onClick={() => dispatch(updateSortField('rate'))}
            >
              Rate
              {sortField === 'rate' ? '*' : null}
            </th>
          </tr>
        </thead>
        <tbody>
          {bitcoinData.map((bitcoin) => (
            <tr key={bitcoin.rate}>
              <td>{bitcoin.code}</td>
              <td>{bitcoin.description}</td>
              <td>{bitcoin.rate_float}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a
        href="https://www.coindesk.com/price/bitcoin"
        target="_blank"
        rel="noreferrer"
        className="info-link"
      >
        Powered by CoinDesk
      </a>
    </>
  );
};

export default BitcoinTable;
