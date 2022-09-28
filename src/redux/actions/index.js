// Coloque aqui suas actions
export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const CURRENCY = 'CURRENCY';
export const EXPENSES = 'EXPENSES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const logEmail = (payload) => ({
  type: LOGIN_EMAIL,
  email: payload,
});

export const currency = (payload) => ({
  type: CURRENCY,
  currency: payload,
});

export const expenses = (payload) => ({
  type: EXPENSES,
  expense: payload,
  price: Number(payload.value) * Number(payload.exchangeRates[payload.currency].ask),
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  deleted: payload,
  price: payload.reduce((acc, cur) => Number(acc) + (Number(cur.value) * Number(cur
    .exchangeRates[cur.currency].ask)), 0),
});

export const getCurrency = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(currency(Object.keys(data).filter((element) => element !== 'USDT')));
};

export const getExpensesAction = (payload) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(expenses({
    ...payload,
    exchangeRates: data,
  }));
};
