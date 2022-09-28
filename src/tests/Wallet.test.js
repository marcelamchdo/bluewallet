import React from 'react';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const VALIDADE_LOGIN = {
  email: 'oi@oi.com',
  validPassword: '300897',
  invalidPassword: '30089',
}

describe('Testa o componente WalletForm', () => {
  it('Testa a rota', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<WalletForm />);
    expect(history.location.pathname).toBe('/');

    const getValue = getByTestId('value-input');
    const getDescription = getByTestId('description-input');
    userEvent.type(value, '30');
    expect(getValue.value).toBe('30');
    userEvent.type(description, 'oi');
    expect(getDescription.value).toBe('oi');
    userEvent.click(getButton);
    expect(getValue.value).toBe('');
    expect(getDescription.value).toBe('');
  })
  });