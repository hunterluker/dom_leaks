import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Stripe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 500
    };
  }

  onToken = token => {
    token.card = void 0;
    axios
      .post('/api/payment', { token, amount: this.state.amount })
      .then(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <StripeCheckout
        name="DOM Leaks"
        panelLabel="Donate"
        description="Donation"
        image="https://i2.wp.com/thepeoplescube.com/images/various_uploads/NSA_Logo_Prism_Self_Spying_250.png"
        token={this.onToken}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        amount={this.state.amount}
      >
        <button className="donate-btn">Donate</button>
      </StripeCheckout>
    );
  }
}

export default Stripe;
