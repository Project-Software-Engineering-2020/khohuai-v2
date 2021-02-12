const {firestore} = require('../firebaseDB');

//Model
const Lottery = require("../Models/Lottery");

const getAllLottery = async (req, res, next) => {

    const lotteryArray = [];

    if (lotteryArray !== []) {
        try {
            const lottery = await firestore.collection('LotteriesAvailable').get()
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
        console.log(lotteryArray)
        res.send(lotteryArray);
    }
}

const getDetailLottery = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('LotteriesAvailable').doc(id).get().then((doc) => {
            res.send(doc.data())
        })

    } catch (error) {
        console.log(error);
    }
}

const getRecommendedLottery = async (req, res, next) => {
    try {
        const historyArray = [];
        const lotteryArray = [];
        const matchedArray = [];
        //ยังไม่ได้สร้าง database ประวัติการซื้อ
        const history = await firestore.collection('purchaseHistory').get();
        history.docs.forEach(hist => {
            //หาประวัติการซื้อของ user นั้น
            //ค่าตัวแปรของ user id และ date ยังไม่ถูก
            if(hist.uid === user.id && hist.date <= date - 31){
                //push ค่า lottery ที่เคยซื้อลง historyArray
                const lot = new Lottery(
                    hist.id,
                    hist.data().number,
                    hist.data().photoURL,
                    hist.data().r,
                    hist.data().s,
                    hist.data().t
                );
                historyArray.push(lot);
            }
        });

        const lottery = await firestore.collection('LotteriesAvailable').get();
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

        let i = 0;
        //ถ้าไม่เคยซื้อในช่วง 31 วันที่ผ่านมา
        if(hist.Array === []){
            const count_lot = lotteryArray.length; 
            for(lot in lotteryArray){
                let rand = (int)(Math.random() * count_lot) + 1;
                if(rand >= Math.ceil(count_lot / 4)){
                    matchedArray.push(lot);
                    i++;
                }
                if(i === 4) break;
            }   
        }
        else{
            for(hist in historyArray){
                let histNum = parseInt(hist.number);
                let histLastTwoDigit = histNum % 100;
                histLastTwoDigit = parseInt(histLastTwoDigit / 10) + ((histLastTwoDigit % 10) * 10)
                for(lot in lotteryArray){
                    let lotNum = parseInt(lot.number);
                    let lotLastTwoDigit = lotNum % 100;
                    if(lotLastTwoDigit === histLastTwoDigit){
                        matchedArray.push(lot);
                        i++;
                    }
                    if(i === 4) break;
                }
            }
            if(i <= 4){
                for(lot in lotteryArray){
                    let duplicated = false;
                    for(match in matchedArray){
                        if(match.number === lot.number) duplicated = true;
                    }
                    if(duplicated === false){
                        matchedArray.push(lot);
                        i++;
                    }  
                    if(i === 4) break;
                }   
            }
        }
        
        

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
        const lottery = await firestore.collection('LotteriesAvailable').get();
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