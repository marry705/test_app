import * as React from 'react';
import { Bitcoin } from '../../redux/type';

interface Props {
  bitcoin: Bitcoin
}

const BitcoinRow: React.FC<Props> = ({ bitcoin }: Props) => (
  <tr>
    <td>{bitcoin.code}</td>
    <td>{bitcoin.description}</td>
    <td>{bitcoin.rate_float}</td>
  </tr>
);

export default BitcoinRow;
