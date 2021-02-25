const express = require('express');
const { getMyCart, addMyCart} = require('../Controller/BasketController')

const router = express.Router();


router.get('/', getMyCart);
router.post('/', addMyCart);
// router.post('/', editMyCart);

module.exports = router;