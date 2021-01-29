import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Analysis.css';

const Analysis: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="form-group">
      <span>https://</span>
      <input className="form-field" type="text" placeholder="domain.tld" />
    </div>
  );
};

export default Analysis;
