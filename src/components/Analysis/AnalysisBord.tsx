import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clearAnalyticData } from '../../redux/actionAnalytic';
import { StateType } from '../../redux/type';

const AnalysisBord: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: StateType) => state.request);
  const { tagsCount, length } = useSelector((state: StateType) => state.analyticData);

  React.useEffect(() => () => dispatch(clearAnalyticData()), [dispatch]);

  return (
    <>
      {error
        ? <div>{error}</div>
        : isLoading
          ? <div>Loading...</div>
          : length
            ? (
              <div className="analysis-data">
                <div className="info-field">
                  {length}
                </div>
                <table className="info-table">
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
              </div>
            )
            : null}
    </>
  );
};

export default AnalysisBord;
