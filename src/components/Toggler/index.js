import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Toggler = ({ toggle, isOpen }) => {
  console.log(isOpen);

  const togglerClassName = isOpen ? 'toggler toggler--is-open' : 'toggler';

  return (
    <button
      className={togglerClassName}
      type="button"
      onClick={toggle}
    >
      =
    </button>
  );
};

Toggler.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Toggler;
