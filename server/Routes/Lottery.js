const express = require('express');
const { getAllLottery, getDetailLottery, getSearchNumber } = require('../Controller/LotteryController')

const router = express.Router();



router.get('/', getAllLottery);
router.get('/:id', getDetailLottery);
router.get('/search=:number&:position', getSearchNumber);

module.exports = router;