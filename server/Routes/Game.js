const express = require('express');
const {getInventory, setInventory} = require('../Controller/GameController')

const router = express.Router();

router.get('/get', getInventory);
router.post('/set', setInventory);

module.exports = router;