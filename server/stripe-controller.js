require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = {
  handlePayment: (req, res) => {
    const {
      amount,
      token: { id }
    } = req.body;
    stripe.charges.create(
      {
        amount: amount,
        currency: 'usd',
        source: id,
        description: 'Donation to DOM Leaks'
      },
      (err, charge) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          console.log(charge);
          return res.status(200).send(charge);
        }
      }
    );
  }
};
