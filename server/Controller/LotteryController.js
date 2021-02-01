const firebaseDB = require('../firebaseDB');
const db = firebaseDB.firestore();

//Model
const Lottery = require("../Models/Lottery");

const getAllLottery = async (req, res, next) => {

    const lotteryArray = [];

    if (lotteryArray !== []) {
        try {
            const lottery = await db.collection('LotteriesAvailable').get()
            if (lottery.empty) {
                res.status(404).send("No lottery in record")
            } else {
                lottery.docs.forEach(doc => {
                    //push into array
                    const lot = new Lottery(
                        doc.id,
                        doc.data().number,
                        doc.data().photoURL,
                        doc.data().r,
                        doc.data().s,
                        doc.data().t
                    )
                    lotteryArray.push(lot);
                });
                res.send(lotteryArray);
            }
        } catch (error) {
            console.log(error);
        }
    }
    else {
        res.send(lotteryArray);
    }
}
const getDetailLottery = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('LotteriesAvailable').doc(id).get().then((doc) => {
            res.send(doc.data())
        })

    } catch (error) {
        console.log(error);
    }
}

const getSearchNumber = async (req, res, next) => {
    try {
        const lotteryArray = [];
        const matchedLotteryArray = [];
        //recieved search number
        const number = req.params.number;
        const position = req.params.position;

        const finding = number.split("");
        let findingNum = "";
        //สองตัวท้าย
        if(position === "last2"){
            var findK = 0;
            var maxK = 2;
            var lotK = 4;
            var maxLotK = 6;
        }
        //สามตัวท้าย
        else if(position === "last3"){
            var findK = 0;
            var maxK = 3;
            var lotK = 3;
            var maxLotK = 6;
        }
        //สามตัวหน้า
        else if(position === "front"){
            var findK = 0;
            var maxK = 3;
            var lotK = 0;
            var maxLotK = 3;
        }
        //เลขทั้งหมด
        else if(position === "whole"){
            var findK = 0;
            var maxK = 3;
        }
        for(let i=findK; i<maxK; i++){
            findingNum += finding[i];
        }
        const lottery = await db.collection('LotteriesAvailable').get()
        lottery.docs.forEach(doc => {
            //push into array
            const lot = new Lottery(
                doc.id,
                doc.data().number,
                doc.data().photoURL,
                doc.data().r,
                doc.data().s,
                doc.data().t
            )
            lotteryArray.push(lot);
        });
        //instant find without any split
        if(position === "whole"){
            lotteryArray.forEach(lot => {
                let searchingNum = lot.number;
                if(findingNum === searchingNum) matchedLotteryArray.push(lot);
            }); 
        }
        //split and find
        else if(position === "last2" || position === "last3" || position === "front"){
            lotteryArray.forEach(lot => {
                const num = lot.number.split("");
                let searchingNum = "";
                for(let i=lotK; i<maxLotK; i++){
                    searchingNum += num[i];
                }
                if(findingNum === searchingNum) matchedLotteryArray.push(lot);
            });
        }
        res.send(matchedLotteryArray);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllLottery,
    getDetailLottery,
    getSearchNumber
}