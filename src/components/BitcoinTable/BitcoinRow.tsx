import * as React from 'react';

interface Props {
  data: string
}

const BitcoinRow: React.FC<Props> = ({ data }: Props) => (
  <>
    <tr>
      <th>Ячейка 1</th>
      <th>Ячейка 2</th>
    </tr>
  </>
);

export default BitcoinRow;
