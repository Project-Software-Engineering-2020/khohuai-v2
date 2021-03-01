const express = require('express');
const { BeforePurchase } = require('../Controller/PurChaseController')

const router = express.Router();

router.get("/", BeforePurchase);

module.exports = router;