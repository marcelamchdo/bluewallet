import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App'
import { screen } from '@testing-library/react'
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';

const VALIDADE_LOGIN = {
  email: 'oi@oi.com',
  validPassword: '300897',
  invalidPassword: '30089',
}

describe('Testar a página de login', () => {
  it('Testar elementos da página de login', () => {
    renderWithRouterAndRedux(<App/>)
    const getEmailInput = screen.getByTestId('email-input');
    const getPasswordInput = screen.getByTestId('password-input');
    const getButtonLogin = screen.getByRole('button')

    expect(getEmailInput).toBeInTheDocument(); 
    expect(getPasswordInput).toBeInTheDocument(); 
    expect(getButtonLogin).toBeInTheDocument();

    userEvent.type(getEmailInput, VALIDADE_LOGIN.email)
    expect(getEmailInput.value).toBe(VALIDADE_LOGIN.email)
    expect(getButtonLogin.disabled).toBeTruthy();

    userEvent.type(getPasswordInput, VALIDADE_LOGIN.invalidPassword)
    expect(getPasswordInput.value).toBe(VALIDADE_LOGIN.invalidPassword)
    expect(getButtonLogin.disabled).toBeTruthy()

    userEvent.type(getPasswordInput, VALIDADE_LOGIN.validPassword);
    expect(getPasswordInput.value).toBe(VALIDADE_LOGIN.validPassword)
    expect(getButtonLogin.disabled).toBeFalsy()
  });
  it('Testar se o login funciona corretamente', async () => {
    const { history } =renderWithRouterAndRedux(<App/>)
    const getEmailInput = screen.getByTestId('email-input');
    const getpasswordInput = screen.getByTestId('password-input');
    const getButtonLogin = screen.getByRole('button')

    userEvent.type(getEmailInput, VALIDADE_LOGIN.email)
    userEvent.type(getpasswordInput, VALIDADE_LOGIN.validPassword);
    userEvent.click(getButtonLogin);
  });

 
})
