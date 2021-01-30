import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/type';
import { requestAnalyticData } from '../../redux/actionAnalytic';

import AnalysisBord from './AnalysisBord';

import './Analysis.css';

const Analysis: React.FC = () => {
  const dispatch = useDispatch();
  const urlInput = React.useRef<HTMLInputElement>(null);
  const { isLoading } = useSelector((state: StateType) => state.request);

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      dispatch(requestAnalyticData(urlInput.current.value));
    }
  };

  return (
    <>
      <div className="form-group">
        <span>https://</span>
        <input
          onKeyPress={keyPressHandler}
          ref={urlInput}
          className="form-field"
          type="text"
          disabled={isLoading}
          placeholder="domain.tld"
        />
      </div>
      <AnalysisBord />
    </>
  );
};

export default Analysis;
