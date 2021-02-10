const express = require('express');
const { sessionLogin,sigin,signup } = require('../Controller/Authentication')

const router = express.Router();

router.post("/login", sigin);
router.post("/sigup", signup);
router.post("/session",sessionLogin);

module.exports = router;