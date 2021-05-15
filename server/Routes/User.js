const express = require('express');
const {getProfile,updateProfile,setCurrentUser} = require('../Controller/UserController')

const router = express.Router();


router.put('/profile', updateProfile);
router.get('/profile/:id', getProfile);
router.get('/currentuser/:id',setCurrentUser)

module.exports = router;