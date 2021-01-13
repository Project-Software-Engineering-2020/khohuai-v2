const express = require('express');
const {getProfile,updateProfile} = require('../Controller/UserController')

const router = express.Router();

router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);

// router.post('/user',addUser);
// router.get('/user', getAllUser);
// router.delete('/user/:id', deleteUser);

module.exports = router;