import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>SocialMediaApp</h1>
          <p className='lead'>
            Create your profile/portfolio, share posts and get help from other
            engineers!
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Create Account
            </Link>
            <Link to='/login' className='btn btn-light'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
