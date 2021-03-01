const express = require('express');
const { getAllLottery, getDetailLottery, getSearchNumber, getRecommendedLottery} = require('../Controller/LotteryController')

const router = express.Router();


router.get('/search', getSearchNumber);
router.get('/recommended',getRecommendedLottery);
router.get('/', getAllLottery);
router.get('/:id', getDetailLottery);



module.exports = router;