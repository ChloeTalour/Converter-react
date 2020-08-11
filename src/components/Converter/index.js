/* eslint-disable react/prefer-stateless-function */
// import React, { Component } from 'react';
import React from 'react';

import Header from 'src/components/Header';
import Currencies from 'src/components/Currencies';
import Amount from 'src/components/Amount';
import Toggler from 'src/components/Toggler';

import currenciesData from 'src/data/currencies';

import './style.scss';

// BONUS: pouvoir changer le baseAmount
// 1. Créer le input type number dans le composant Header
// 2. Brancher le input en lecture
// 3. Brancher en écriture l'input
// 3.1 Préparer une fonction qui va être en charge de changer les statue (Converter)
// 3.2 Passer cette fonction dans les props de header
// 3.3 Préparer le handler dans Header
// 3.4 Récupérer la value de l'input dans le handler
// 3.5 Passer la value à la fonction passer en props
// 3.6 Récupérer cette value côté Converter et changer le state

// pour pouvoir faire varier des données dans le temps, on passe par un state.
// La façon d'avoir un state (état) pour un composant est de passer par une class
// class Converter extends Component {
class Converter extends React.Component {
  // Grâce au plugin de Babel class-properties, on va pouvoir définir des propriétés
  // de classe directement à la racine de notre  composant
  state = {
    open: true,
    baseAmount: 1,
    currency: 'United States Dollar',
    search: '',
  };

  // Les méthodes de cycles de vie, nous permettent d'intéragir avec
  // l'extérieur de notre application/composant . C'est dans ses méthodes qu'on va pouvoir
  // avoir accès au DOM, faire des requètes aux API, mettre en place les listenner ...
  componentDidMount() {
    console.log('componentDidMount 1er rendu');
    this.changeDocumentTitleEffect();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    this.changeDocumentTitleEffect();
  }

  changeDocumentTitleEffect = () => {
    const { currency } = this.state;
    document.title = `Euro to ${currency}`;
  }

  toggle = () => {
    console.log('etat', this.state);
    const { open } = this.state;
    // setState est la fonction de React qui va nous permettre de changer les valeurs du state
    // (état de notre composant).
    // setState va permettre à React de savoir qu'il y a eu un changement de l'état de l'application
    // this.setState({ open: !open });
    this.setState({ open: !open });
    // WARNING, on ne fait jamais de changement de state directement JAMAIS !
    // On passe toujours par la fonction setState. Ainsi React est notifié du
    // changement de l'état de l'appli et fait un nouveau rendu
    // this.state.open = !open;
  };

  elementConvert = (name) => {
    this.setState({ currency: name });
  }

  makeConversion = () => {
    const { baseAmount, currency } = this.state;
    // on cherche la devise dans le tableau de données qui a le même nom que la devise dans notre state
    const foundCurrency = currenciesData.find((currentCurrency) => currentCurrency.name === currency);

    const amountValue = parseFloat((foundCurrency.rate * baseAmount).toFixed(2), 10);
    // const amountValue = Math.round(foundCurrency.rate * baseAmount * 100) / 100;
    return amountValue;
  }

  getCurrenciesBySearch = () => {
    const { search } = this.state;
    // par défaut on vient toutes les devises dans filteredCurrencies
    let filteredCurrencies = currenciesData;

    // on s'assure que la valeur de search ne contienne pas que des espaces avec trim()
    if (search.trim().length > 0) {
      filteredCurrencies = currenciesData.filter((currency) => {
        // pour éviter les problème de casse, on passe tout en minuscule
        const loweredCurrency = currency.name.toLowerCase();
        const loweredSearch = search.toLowerCase();

        return loweredCurrency.includes(loweredSearch);
      });
    }

    return filteredCurrencies;
  }

  // Fonction qui sera en charge de modifier le state pour search
  setSearch = (search) => {
    this.setState({ search });
  }

  setBaseAmount = (baseAmount) => {
    this.setState({ baseAmount: Number(baseAmount) });
  }

  render() {
    // pour récupérer des valeurs stockés dans le state, on peut venir déstructurer, l'obejt state
    const {
      open,
      baseAmount,
      currency,
      search,
    } = this.state;


    return (
      <div className="converter">
        <Header
          baseAmount={baseAmount}
          changeBaseAmount={this.setBaseAmount}
        />
        <Toggler
          isOpen={open}
          toggle={this.toggle}
        />

        {/* avec l'opérateur logique && javascript va tester ce qui est à gauche du &&
         si cette valeur est vraie alors il va traiter ce qui est à droite */}
        { open && (
          <Currencies
            currencies={this.getCurrenciesBySearch()}
            functionElement={this.elementConvert}
            search={search}
            changeSearch={this.setSearch}
          />
        )}

        <Amount
          value={this.makeConversion()}
          currency={currency}
        />
      </div>
    );
  }
}

export default Converter;
