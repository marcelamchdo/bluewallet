import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Header({ loginEmail, totalField }) {
  return (
    <header className="loginInfo">
      <p data-testid="email-field">{loginEmail}</p>
      <p data-testid="total-field">{Number(totalField).toFixed(2)}</p>
      <p data-testid="header-currency-field">BRL</p>
    </header>
  );
}

Header.propTypes = {
  loginEmail: PropTypes.string.isRequired,
  totalField: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  loginEmail: state.user.email,
  totalField: state.wallet.totalField,
});

export default connect(mapStateToProps)(Header);

// como usar o mapStateToProps = https://fernandobelotto.github.io/react-redux/using-react-redux/connect-mapstate/ //
