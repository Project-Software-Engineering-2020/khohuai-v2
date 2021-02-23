const express = require('express');
const { getMyCart} = require('../Controller/BasketController')

const router = express.Router();


router.get('/', getMyCart);
// router.post('/', editMyCart);

module.exports = router;