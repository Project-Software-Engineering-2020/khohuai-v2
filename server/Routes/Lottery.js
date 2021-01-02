const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/lottery',function(req,res){
    console.log("Fetch Data");
    fetch('https://lotto.api.rayriffy.com/latest')
    .then(result => {
        console.log(result);
        res.send(result);
    })
});
router.get('/chon', (req,res) => {
    console.log("chon");
})

module.exports = router;