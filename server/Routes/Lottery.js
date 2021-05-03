const express = require('express');
const { getAllLottery,getNgudShop ,getDetailLottery, getSearchNumber, getRecommendedLottery, getAlmostOutOfStock} = require('../Controller/LotteryController')

const router = express.Router();

router.get('/currentngud', getNgudShop)
router.get('/search', getSearchNumber);
router.get('/recommended', getRecommendedLottery);
router.get('/aos', getAlmostOutOfStock);
router.get('/', getAllLottery);
router.get('/:id', getDetailLottery);

module.exports = router;