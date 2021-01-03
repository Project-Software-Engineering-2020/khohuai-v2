const express = require('express');
const router = express.Router();
const Axios = require('axios');

router.get('/',function(req,res){
    Axios.get("https://lotto.api.rayriffy.com/latest").then((result) => {
        p2 = result.data.response.prizes[2];
        res.send(p2);
    })
});

module.exports = router;