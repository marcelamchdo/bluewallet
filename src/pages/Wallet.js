import React from 'react';
import Header from '../components/Header';
import walletWhite from './imgs/trybewallet-white.png';
import '../components/Header.css';
import WalletForm from '../components/WalletForm';
import '../components/WalletForm.css';
import Table from '../components/Table';
import '../components/Table.css';

function Wallet() {
  return (
    <div>
      <div className="walletHeader">
        <img className="imgWallet" alt="imgWallet" src={ walletWhite } />
        <Header />
      </div>
      <div>
        <WalletForm />
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
}

export default Wallet;
