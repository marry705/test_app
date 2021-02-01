import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from './constants';

import BitcoinTable from './components/BitcoinTable';
import Analysis from './components/Analysis';
import NavBar from './components/NavBar';

import './index.css';

const App: React.FC = () => (
  <div className="main-wrapper">
    <NavBar />
    <div className="info-wrapper">
      <Switch>
        <Route path={ROUTES.CURRENCIES} render={() => <BitcoinTable />} />
        <Route path={ROUTES.ANALYSIS} render={() => <Analysis />} />
        <Redirect from="/" to={ROUTES.CURRENCIES} />
      </Switch>
    </div>
  </div>
);

export default App;
