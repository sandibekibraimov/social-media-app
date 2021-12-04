import React, { Fragment } from 'react';
import Moment from 'react-moment';

const ProfileExperience = ({ experience }) => {
  const { company, title, location, current, from, to, description } =
    experience;
  return (
    <Fragment>
      <h3>
        {company} located in {location}{' '}
      </h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
        {!to ? ' Present' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>

      <p>
        <strong>Position:</strong> {title}
      </p>

      <p>
        <strong>Description:</strong> {description}
      </p>
    </Fragment>
  );
};

export default ProfileExperience;
