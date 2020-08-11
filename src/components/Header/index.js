import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Header = ({ baseAmount, changeBaseAmount }) => {
  const handleChangeBaseAmount = (event) => {
    console.log('yo');
    changeBaseAmount(event.target.value);
  };

  return (
    <header className="header">
      <h1 className="header__title">Converter</h1>
      <p className="header__base-amount">
        <input
          type="number"
          placeholder="Le nombre à convertir en euro"
          value={baseAmount}
          onChange={handleChangeBaseAmount}
          className="header__input"
        />
        euro
      </p>
    </header>
  );
};

Header.propTypes = {
  baseAmount: PropTypes.number.isRequired,
  changeBaseAmount: PropTypes.func.isRequired,
};

export default Header;
