import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestData } from '../../redux/actionsRequest';
import { updateSortField } from '../../redux/actionBitcoin';
import { StateType } from '../../redux/type';
import BitcoinRow from './BitcoinRow';

const BitcoinTable: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: StateType) => state.request);
  const { bitcoinData, time } = useSelector((state: StateType) => state.bitcoinData);

  React.useEffect(() => {
    dispatch(requestData());
    const interval = setInterval(() => {
      dispatch(requestData());
      console.log('123');
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div>
        Ошибка:
        {error}
      </div>
    );
  } if (isLoading) {
    return <div>Загрузка...</div>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => dispatch(updateSortField('code'))}>Code</th>
          <th>Description</th>
          <th onClick={() => dispatch(updateSortField('rate'))}>Rate</th>
        </tr>
      </thead>
      <tbody>
        {bitcoinData.map((bitcoin, index) => (
          <BitcoinRow key={index} bitcoin={bitcoin} />
        ))}
      </tbody>
    </table>
  );
};

export default BitcoinTable;
