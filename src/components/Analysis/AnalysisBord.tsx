import * as React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/type';

const AnalysisBord: React.FC = () => {
  const { isLoading, error } = useSelector((state: StateType) => state.request);
  const { tagsCount, length } = useSelector((state: StateType) => state.analyticData);

  return (
    <>
      {error
        ? <div>{error}</div>
        : isLoading
          ? <div>Loading...</div>
          : (
            <>
              <div className="info-field">
                {length}
              </div>
              <table className="tag-table">
                <thead>
                  <tr>
                    <th>Tag Name</th>
                    <th>Tag Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(tagsCount).map((key) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{tagsCount[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
    </>
  );
};

export default AnalysisBord;
