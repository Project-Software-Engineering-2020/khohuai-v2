const express = require('express');
const {checkoutCreditCard,romoveInStock,checkCompleteProfile} = require('../Controller/CheckoutController')

const router = express.Router();

router.post('/',checkoutCreditCard);
router.get("/remove",romoveInStock);
router.get("/checkprofilecomplete",checkCompleteProfile)

module.exports = router;