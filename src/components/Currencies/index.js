import React from 'react';
import PropTypes from 'prop-types';
import Currency from './Currency';
import './style.scss';

const Currencies = ({
  currencies,
  functionElement,
  search,
  changeSearch,
}) => {
  const newPassValue = functionElement.bind(this);
  const mappedCurrencies = currencies.map(
    (currency) => <Currency key={currency.name} name={currency.name} elementOnClick={(name) => newPassValue(name)} />,
  );

  const handleOnChange = (event) => {
    console.log('je Passe dans handle onChange');
    changeSearch(event.target.value);
  };

  return (
    <div className="currencies">
      <input
        type="text"
        className="currencies__search"
        placeholder="Rechercher une devise"
        // On vient brancher en lecture notre input text en lui passant la valeur de
        // search contenu dans le state
        value={search}
        // Pour changer la valeur de search, on va passer par le gestionnaire d'évènement onChange
        onChange={handleOnChange}
      />
      <ul className="currencies__list">
        {mappedCurrencies}
      </ul>
    </div>
  );
};

Currencies.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
    }),
  ).isRequired,
  functionElement: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  changeSearch: PropTypes.func.isRequired,
};

export default Currencies;
