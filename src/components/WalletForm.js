import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCurrency, getExpensesAction } from '../redux/actions';

function WalletForm({ currencies, getCurrencies, getExpenses }) {
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');

  const handleChangeValue = ({ target }) => {
    setValue(target.value);
  };

  const handleChangeDescription = ({ target }) => {
    setDescription(target.value);
  };

  const handleChangeCurrency = ({ target }) => {
    setCurrency(target.value);
  };

  const handleChangeMethod = ({ target }) => {
    setMethod(target.value);
  };

  const handleChangeTag = ({ target }) => {
    setTag(target.value);
  };

  const objExpense = { value, description, currency, method, tag };
  const handleClickButton = (event) => {
    event.preventDefault();
    getExpenses(objExpense);
    setValue('');
    setDescription('');
  };

  useEffect(() => { getCurrencies(); }, [getCurrencies]);

  const payMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

  const tagCharacter = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

  return (
    <div>
      <form className="formWallet">
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            id="value"
            value={ value }
            onChange={ handleChangeValue }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            id="description"
            value={ description }
            onChange={ handleChangeDescription }
          />
        </label>

        <label htmlFor="coin">
          Moeda:
          <select
            data-testid="currency-input"
            value={ currency }
            id="coin"
            onChange={ handleChangeCurrency }
          >
            {currencies.map((curr) => (
              <option
                value={ curr }
                key={ curr }
              >
                {curr}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Pagamento:
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ handleChangeMethod }
          >
            {payMethod.map((methodPay) => (
              <option
                value={ methodPay }
                key={ methodPay }
              >
                {methodPay}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ handleChangeTag }
          >
            {tagCharacter.map((tagEl) => (
              <option
                value={ tagEl }
                key={ tagEl }
              >
                {tagEl}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          onClick={ handleClickButton }
        >
          Adicionar despesa
        </button>
      </form>

    </div>
  );
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrency()),
  getExpenses: (payload) => dispatch(getExpensesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
