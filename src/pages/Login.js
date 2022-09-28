import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import trybeWallet from './imgs/trybewallet.png';
import { logEmail } from '../redux/actions';

// requisito 01: helpers
// ajuda usada para fazer as funções do onChange: https://stackoverflow.com/questions/53519578/forms-as-functional-components-with-react/64100833#64100833

function Login({ loginEmail }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [button, setButton] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const isValidEmail = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const minLength = 6;

  const handleChangeInput = ({ target }) => {
    setEmail(target.value);
    setButton(!(isValidEmail.test(target.value) && password.length >= minLength));
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
    setButton(!(isValidEmail.test(email) && target.value.length >= minLength));
  };

  return (
    <div className="login">
      {redirect && <Redirect to="/carteira" />}
      <form className="loginBox">

        <img className="imgWallet" alt="imgWallet" src={ trybeWallet } />

        <input
          type="email"
          id="email"
          data-testid="email-input"
          value={ email }
          placeholder="Digite seu email"
          onChange={ handleChangeInput }
          className="inputForm"
        />

        <br />

        <input
          type="password"
          id="passoword"
          data-testid="password-input"
          value={ password }
          placeholder="Digite sua senha"
          onChange={ handleChangePassword }
          className="inputForm"
        />

        <br />

        <button
          type="submit"
          disabled={ button }
          onClick={ () => { loginEmail(email); setRedirect(true); } }
          className="buttonForm"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  loginEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginEmail: (payload) => dispatch(logEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
