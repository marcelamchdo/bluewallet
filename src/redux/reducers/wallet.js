// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY, EXPENSES, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalField: 0,
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY:
    return {
      ...state,
      currencies: action.currency,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...action.expense,
      }],
      totalField: (
        Number(state.totalField) + Number(action.price))
        .toFixed(2),
    };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: [...action.deleted],
      totalField: Number(action.price).toFixed(2) };
  default:
    return state;
  }
};

export default wallet;
