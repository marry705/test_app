import * as React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/type';

const AnalysisBord: React.FC = () => {
  const { isLoading, error } = useSelector((state: StateType) => state.request);
  const { tagsCount, length } = useSelector((state: StateType) => state.analyticData);

  if (error) {
    return (
      <div>{error}</div>
    );
  } if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>{length}</div>
    </>
  );
};

export default AnalysisBord;
