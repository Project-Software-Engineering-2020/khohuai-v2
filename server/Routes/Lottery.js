const express = require('express');
const { getAllLottery, getDetailLottery, getSearchNumber } = require('../Controller/LotteryController')

const router = express.Router();


router.get('/search', getSearchNumber);
router.get('/', getAllLottery);
router.get('/:id', getDetailLottery);


module.exports = router;