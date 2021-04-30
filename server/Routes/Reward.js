const express = require('express');
const { getRewardLotteryOfUser,getRewardDetail } = require('../Controller/RewardController')

const router = express.Router();

router.get("/", getRewardLotteryOfUser);
router.get("/detail/:id", getRewardDetail);

module.exports = router;