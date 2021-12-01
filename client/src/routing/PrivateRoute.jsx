import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated && !loading ? (
            <Redirect to='/login' />
          ) : (
            <Component {...props} />
          )
        }
      />
    </Fragment>
  );
};

export default PrivateRoute;
