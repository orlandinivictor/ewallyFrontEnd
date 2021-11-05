import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/login" component={Login} />

      <PrivateRoute exact path="/" component={Home} isClosed />
    </Switch>
  );
}
