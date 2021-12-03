import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../../components/layout/Spinner';

const Profile = ({ match }) => {
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [match.params.id, dispatch]);

  return (
    <Fragment>
      {profile.profile === null || profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back to profiles
          </Link>

          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit profile
              </Link>
            )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
