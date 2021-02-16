const express = require('express');
const {checkoutCreditCard} = require('../Controller/CheckoutController')

const router = express.Router();

router.post('/checkout-credit-card',checkoutCreditCard);

module.exports = router;