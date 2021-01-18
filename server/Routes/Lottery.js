const express = require('express');
const { getAllLottery, getDetailLottery} = require('../Controller/LotteryController')

const router = express.Router();



router.get('/',getAllLottery)
router.get('/:id',getDetailLottery)

module.exports = router;