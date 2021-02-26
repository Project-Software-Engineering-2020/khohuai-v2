const express = require('express');
const { getMyCart, addMyCart } = require('../Controller/BasketController')

const router = express.Router();


router.get('/', getMyCart);
router.post('/', addMyCart);

module.exports = router;