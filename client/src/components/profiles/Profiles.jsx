import React, { Fragment, useEffect } from 'react';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';

import { useDispatch, useSelector } from 'react-redux';

const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdeveloper'></i> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h2>No profiles found</h2>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
