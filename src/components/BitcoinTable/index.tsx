import * as React from 'react';
import { useDispatch } from 'react-redux';
import { requestData } from '../../redux/actions';

import BitcoinRow from './BitcoinRow';

const BitcoinTable: React.FC = () => {
  const dispatch = useDispatch();

  const tasks = [{ id: '1' }, { id: '2' }, { id: '3' }];

  // React.useEffect(() => dispatch(requestData()), []);

  return (
    <table>
      <tbody>
        {tasks.map((task) => (
          <BitcoinRow key={task.id} data={task.id} />
        ))}
      </tbody>
    </table>
  );
};

export default BitcoinTable;
