import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/type';
import updateAnalyticData from '../../redux/actionAnalytic';

import './Analysis.css';

const Analysis: React.FC = () => {
  const dispatch = useDispatch();
  const { tagsCount, length } = useSelector((state: StateType) => state.analyticData);

  return (
    <div className="form-group">
      <span>https://</span>
      <input className="form-field" type="text" placeholder="domain.tld" />
    </div>
  );
};

export default Analysis;
