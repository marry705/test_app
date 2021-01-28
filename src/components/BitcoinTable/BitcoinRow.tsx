import * as React from 'react';
import { Bitcoin } from '../../redux/type';

interface Props {
  bitcoin: Bitcoin
}

const BitcoinRow: React.FC<Props> = ({ bitcoin }: Props) => (
  <>
    <tr>
      <th>{bitcoin.code}</th>
      <th>{bitcoin.description}</th>
      <th>{bitcoin.rate}</th>
    </tr>
  </>
);

export default BitcoinRow;
