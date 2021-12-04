import React, { Fragment } from 'react';
import Moment from 'react-moment';

const ProfileEducation = ({ education }) => {
  const { school, degree, fieldofstudy, current, from, to, description } =
    education;
  return (
    <Fragment>
      <h3>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
        {!to ? ' Present' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>

      <p>
        <strong>Degree:</strong> {degree}
      </p>

      <p>
        <strong>Field of study:</strong> {fieldofstudy}
      </p>

      <p>
        <strong>Description:</strong> {description}
      </p>
    </Fragment>
  );
};

export default ProfileEducation;
