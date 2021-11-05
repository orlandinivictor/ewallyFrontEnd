import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

type Props = RouteProps & {
  component: React.FC;
  isClosed?: boolean;
};

export default function PrivateRoute({
  component: Component,
  isClosed,
  ...rest
}: Props) {
  const { token } = useAuth();
  const isLoggedIn = !!token;

  if (!isLoggedIn && isClosed) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { prevPath: rest.location?.pathname },
        }}
      />
    );
  }

  return <Route {...rest} component={Component} />;
}
