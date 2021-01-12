const express = require('express');
const {getProfile,addUser,getAllUser, deleteUser} = require('../Controller/UserController')

const router = express.Router();

router.get('/profile/:id', getProfile);

// router.post('/user',addUser);
// router.get('/user', getAllUser);
// router.delete('/user/:id', deleteUser);

module.exports = router;