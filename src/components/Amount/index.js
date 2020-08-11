import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Amount = ({ value, currency }) => (
  <footer className="amount">
    <div className="amount__value">{value}</div>
    <div className="amount__currency">{currency}</div>
  </footer>
);

Amount.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Amount;
