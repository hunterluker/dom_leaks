import React, { Component } from 'react';
import bitcoin from '../../images/bitcoin.png';

class Donate extends Component {
  render() {
    return (
      <div>
        <div className="page-welcome">
          {' '}
          <span className="page-number">04</span> Donate
        </div>

        <div className="container text-left donate-title-1">
          <h2 className="mb-3">Donate to DOM Leaks</h2>
          <div className="white-line mb-4" />
          <p>
            <span className="mr-2">/ </span> DOM Leaks is entirely supported by
            the general public.
          </p>
          <p>
            <span className="mr-2">/ </span>
            Your donations pay for DOM Leaks projects, staff, servers and
            protective infrastructure.
          </p>
        </div>

        <div className="account-info container">
          <div className="card bg-light text-dark">
            <div className="card-header">
              <h4 className="donate text-left">Credit Card</h4>
            </div>
            <div className="card-body">
              <p className="donate-text text-left">
                Global credit card donations via stripe
              </p>
              <p className="donate-text text-left p-1 text-primary">
                Donations made via stripe are tax deductible in the EU.
              </p>
            </div>
            <div className="card-footer">
              <button
                data-toggle="modal"
                data-target="#bitcoinModal"
                className="donate-btn float-left"
              >
                DONATE
              </button>
            </div>
          </div>
        </div>

        <div className="account-info container">
          <div className="card bg-light text-dark">
            <div className="card-header">
              <h4 className="donate text-left">Bitcoin</h4>
            </div>
            <div className="card-body">
              <p className="donate-text text-left">
                Bitcoin is a secure and anonymous digital currency. Bitcoins
                cannot be easily tracked back to you, and are safer and faster
                alternative to other donation methods. You can send BTC to the
                following address:
              </p>
              <p className="donate-text text-left p-1 text-danger">
                3M4rvRqbkaCfudp7bXLNE62d1iBL2wYVNA
              </p>
            </div>
            <div className="card-footer">
              <button
                data-toggle="modal"
                data-target="#bitcoinModal"
                className="donate-btn float-left"
              >
                QR Code
              </button>
            </div>
          </div>
        </div>

        <div className="account-info container">
          <div className="card bg-light text-dark">
            <div className="card-header">
              <h4 className="donate text-left">Ethereum</h4>
            </div>
            <div className="card-body">
              <p className="donate-text text-left">
                Bitcoin is a secure and anonymous digital currency. Bitcoins
                cannot be easily tracked back to you, and are safer and faster
                alternative to other donation methods. You can send BTC to the
                following address:
              </p>
              <p className="donate-text text-left p-1 text-danger">
                3M4rvRqbkaCfudp7bXLNE62d1iBL2wYVNA
              </p>
            </div>
            <div className="card-footer">
              <button
                data-toggle="modal"
                data-target="#bitcoinModal"
                className="donate-btn float-left"
              >
                QR Code
              </button>
            </div>
          </div>
        </div>

        <div className="account-info container mb-5">
          <div className="card bg-light text-dark">
            <div className="card-header">
              <h4 className="donate text-left">Litecoin</h4>
            </div>
            <div className="card-body">
              <p className="donate-text text-left">
                Bitcoin is a secure and anonymous digital currency. Bitcoins
                cannot be easily tracked back to you, and are safer and faster
                alternative to other donation methods. You can send BTC to the
                following address:
              </p>
              <p className="donate-text text-left p-1 text-danger">
                3M4rvRqbkaCfudp7bXLNE62d1iBL2wYVNA
              </p>
            </div>
            <div className="card-footer">
              <button
                data-toggle="modal"
                data-target="#bitcoinModal"
                className="donate-btn float-left"
              >
                QR Code
              </button>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="bitcoinModal"
          role="dialog"
          aria-labelledby="bitcoinModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="card-header">
                <button
                  type="button"
                  className="close ml-auto"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <img width="200px" src={bitcoin} alt="" />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Donate;
