const { machineLearning } = require('firebase-admin');
const { firestore } = require('../firebaseDB');
const firebase = require('firebase');

//Model
const Lottery = require("../Models/Lottery");

const getAllLottery = async (req, res, next) => {

    let lotteryArray = []

    console.log("get Data")
    try {
        const lottery = await firestore.collection('LotteriesAvailable').get()
        if (lottery.empty) {
            res.status(400).send("No lottery in record")
        } else {
            lottery.docs.forEach(doc => {
                //push into array
                // const lot = new Lottery(
                //     doc.id,
                //     doc.data().photoURL,
                // )
                lotteryArray.push({
                    id: doc.id,
                    photoURL: doc.data().photoURL
                });
            });
            res.status(200).send(lotteryArray);
    
        }
    } catch (error) {
        console.log(error);
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
        var user = firebase.auth().currentUser;
        //ยังไม่ได้สร้าง database ประวัติการซื้อ
        //const history = await firestore.collection('invoices').get();
        
        const lottery = await firestore.collection('LotteriesAvailable').get();
        if (user) {
            const history = await docRef.where("userid", "==", user.id);
            history.docs.forEach(hist => {
                //หาประวัติการซื้อของ user นั้น
                //if (hist.data().userid === user.id && lottery[0].data().nguad >= hist.data().nguad - 2) {
                if (lottery[0].data().nguad >= hist.data().nguad - 2) {
                    //push ค่า lottery ที่เคยซื้อลง historyArray
                    hist.data().lottery.forEach(i => {
                        historyArray.push(i.id);
                    });
                }
            });

            
            lottery.docs.forEach(doc => {
                //push into array
                lotteryArray.push(doc.id);
            });

            let i = 0;
            //ถ้าไม่เคยซื้อในช่วง 31 วันที่ผ่านมา
            if (historyArray.Array === []) {
                const count_lot = lotteryArray.length;
                for (lot in lotteryArray) {
                    let rand = parseInt(Math.random() * count_lot) + 1;
                    if (rand >= Math.ceil(count_lot / 4)) {
                        matchedArray.push(lotteryArray[lot]);
                        i++;
                    }
                    if (i === 4) break;
                }
            }
            else {
                for (hist in historyArray) {
                    let histNum = parseInt(historyArray[hist]);
                    let histLastTwoDigit = histNum % 100;
                    histLastTwoDigit = parseInt(histLastTwoDigit / 10) + ((histLastTwoDigit % 10) * 10);
                    for (lot in lotteryArray) {
                        let lotNum = parseInt(lotteryArray[lot]);
                        let lotLastTwoDigit = lotNum % 100;
                        if (lotLastTwoDigit === histLastTwoDigit) {
                            matchedArray.push(lotteryArray[lot]);
                            i++;
                        }
                        if (i === 4) break;
                    }
                }
                if (i <= 4) {
                    for (lot in lotteryArray) {
                        let duplicated = false;
                        for (match in matchedArray) {
                            if (match === lot) duplicated = true;
                        }
                        if (duplicated === false) {
                            matchedArray.push(lotteryArray[lot]);
                            i++;
                        }
                        if (i === 4) break;
                    }
                }
            }
        }
        else {
            lottery.docs.forEach(doc => {
                //push into array
                lotteryArray.push(doc.id);
            });
            let i = 0;
            const count_lot = lotteryArray.length;
            for (lot in lotteryArray) {
                let rand = parseInt(Math.random() * count_lot) + 1;
                if (rand >= Math.ceil(count_lot / 4)) {
                    matchedArray.push(lotteryArray[lot]);
                    i++;
                }
                if (i === 4) break;
            }
        }
        res.send(matchedArray);
        console.log("historyArray : ", historyArray);
        console.log("lotteryArray : ", lotteryArray);
        console.log("matchedArray : ", matchedArray);
    } catch (error) {
        console.log(error);
    }
}

const getSearchNumber = async (req, res, next) => {
    try {
        const lotteryArray = [];
        const matchedLotteryArray = [];
        //recieved search number
        const number = req.query.keyword;
        const position = req.query.position;

        console.log(number);
        console.log(position);

        const finding = number.split("");
        let findingNum = "";
        //สองตัวท้าย
        if (position === "last2") {
            var findK = 0;
            var maxK = 2;
            var lotK = 4;
            var maxLotK = 6;
        }
        //สามตัวท้าย
        else if (position === "last3") {
            var findK = 0;
            var maxK = 3;
            var lotK = 3;
            var maxLotK = 6;
        }
        //สามตัวหน้า
        else if (position === "front") {
            var findK = 0;
            var maxK = 3;
            var lotK = 0;
            var maxLotK = 3;
        }
        //เลขทั้งหมด
        else if (position === "whole") {
            var findK = 0;
            var maxK = 6;
        }
        for (let i = findK; i < maxK; i++) {
            findingNum += finding[i];
        }
        const lottery = await firestore.collection('LotteriesAvailable').get();
        lottery.docs.forEach(doc => {
            //push into array
            // const lot = new Lottery(
            //     doc.id,
            //     doc.data().photoURL,
            // )
            lotteryArray.push({
                id:doc.id,
                photoURL:doc.data().photoURL,
            });
        });
        //instant find without any split
        if (position === "whole") {
            lotteryArray.forEach(lot => {
                let searchingNum = lot.id;
                if (findingNum === searchingNum) matchedLotteryArray.push(lot);
            });
        }
        //split and find
        else if (position === "last2" || position === "last3" || position === "front") {
            lotteryArray.forEach(lot => {
                const num = lot.id.split("");
                let searchingNum = "";
                for (let i = lotK; i < maxLotK; i++) {
                    searchingNum += num[i];
                }
                if (findingNum === searchingNum) matchedLotteryArray.push(lot);
            });
        }

        console.log(matchedLotteryArray);
        res.send(matchedLotteryArray);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllLottery,
    getDetailLottery,
    getRecommendedLottery,
    getSearchNumber
}