import React from 'react';
import PropTypes from 'prop-types';

const Currency = ({ name, elementOnClick }) => (
  <li
    onClick={() => elementOnClick(name)}
    className="currency"
  >
    {name}
  </li>
);

Currency.propTypes = {
  name: PropTypes.string.isRequired,
  // elementOnClick: PropTypes.func.isRequired,
};

export default Currency;
