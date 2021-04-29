const express = require('express');
const { getRewardLotteryOfUser } = require('../Controller/RewardController')

const router = express.Router();

router.get("/", getRewardLotteryOfUser);

module.exports = router;