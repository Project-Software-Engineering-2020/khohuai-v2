const express = require('express');
const {checkoutCreditCard,romoveInStock} = require('../Controller/CheckoutController')

const router = express.Router();

router.post('/',checkoutCreditCard);
router.get("/remove",romoveInStock);

module.exports = router;