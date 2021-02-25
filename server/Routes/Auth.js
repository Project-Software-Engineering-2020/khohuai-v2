const express = require('express');
const { googleLogin, signin, logout, signup } = require('../Controller/Authentication')

const router = express.Router();

router.post("/login", signin);
router.post("/logout", logout)
router.post("/sigup", signup);
router.post("/google", googleLogin);

module.exports = router;