import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

function Table({ expenses, deleteExpenseList }) {
  return (
    <table className="table">
      <thead>
        <tr className="tableColumns">
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((element) => (
          <tr key={ element.id } className="tableLines">
            <td>{ element.description }</td>
            <td>{ element.currency}</td>
            <td>{ element.tag }</td>
            <td>{ element.method }</td>
            <td>{ Number(element.value).toFixed(2) }</td>
            <td>{ element.exchangeRates[element.currency].name }</td>
            <td>{ Number(element.exchangeRates[element.currency].ask).toFixed(2) }</td>
            <td>
              { (Number(element.value) * Number(element.exchangeRates[element.currency]
                .ask)).toFixed(2) }
            </td>
            <td>
              <button
                data-testid="delete-btn"
                type="button"
                value={ element }
                onClick={ () => {
                  deleteExpenseList(expenses.filter(
                    (index) => (index.id !== element.id),
                  ));
                } }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.defaultProps = { expenses: [] };
Table.propTypes = {
  deleteExpenseList: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number,
      value: PropTypes.number,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
    },
  )) };

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseList: (payload) => dispatch(deleteExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
// comentario p poder commitar
