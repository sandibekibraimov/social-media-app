import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Engineers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Profile</span>
        </Link>
      </li>
      <li>
        <button onClick={logoutHandler} className='btn btn-primary'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Sign Out</span>
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Engineers</Link>
      </li>
      <li>
        <Link to='/register'>Create Account</Link>
      </li>
      <li>
        <Link to='/login'>Sign in</Link>
      </li>
      <li>
        <a
          href='https://github.com/sandibekibraimov/social-media-app'
          target='_blank'
          rel='noreferrer'
        >
          Github code
        </a>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fab fa-staylinked'></i> SocialMediaApp
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

export default Navbar;
