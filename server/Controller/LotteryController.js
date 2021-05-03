const { machineLearning } = require('firebase-admin');
const { firestore, auth } = require('../firebaseDB');

//Model
const Lottery = require("../Models/Lottery");

const getNgudShop = async (req,res) => {

    let ngud = [];
    const ngudDB = await firestore.collection('ngud').orderBy("end", "desc").get()
    await ngudDB.docs.forEach(doc => {
        ngud.push({
            ngud: doc.id,
            end: doc.data().end.toDate(),
            start: doc.data().start,
        })
    });
    console.log(ngud[0].end)
    res.send(ngud[0].end);
}

const getAllLottery = async (req, res, next) => {

    let lotteryArray = [];;
    let ngud = []

    try {
        const ngudDB = await firestore.collection('ngud').orderBy("end", "desc").get()
        await ngudDB.docs.forEach(doc => {
            ngud.push({
                ngud: doc.id,
                end: doc.data().end.toDate(),
                start: doc.data().start,
            })
        });

        const lottery = await firestore.collection('lottery').get()
        if (lottery.empty) {
            res.status(400).send("No lottery in record")
        } else {
            lottery.docs.forEach(doc => {

                lotteryArray.push({
                    id: doc.id,
                    photoURL: doc.data().photoURL,
                    ngud: ngud[0].end
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
        await firestore.collection('lottery').doc(id).get().then((doc) => {
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
        var user = auth.currentUser;
        //ยังไม่ได้สร้าง database ประวัติการซื้อ
        //const history = await firestore.collection('invoices').get();

        const history = await firestore.collection('invoices').get();
        const lottery = await firestore.collection('lottery').get();
        if (user) {

            lottery.docs.forEach(doc => {
                //push into array
                lotteryArray.push({
                    id: doc.id,
                    photoURL: doc.data().photoURL,
                    nguad: doc.data().nguad
                });
            });

            history.docs.forEach(hist => {
                //หาประวัติการซื้อของ user นั้น
                console.log("nguad : ", lotteryArray[0].nguad);
                console.log("user.id : ", user.uid);

                if (hist.data().userid === user.uid && lotteryArray[0].nguad >= hist.data().nguad - 2) {
                    if (lotteryArray[0].nguad >= hist.data().nguad - 2) {
                        //push ค่า lottery ที่เคยซื้อลง historyArray
                        hist.data().lottery.forEach(i => {
                            historyArray.push(i.id);
                        });
                    }
                }
            });



            let i = 0;
            //ถ้าไม่เคยซื้อในช่วง 31 วันที่ผ่านมา
            if (historyArray.Array === []) {
                const count_lot = lotteryArray.length;
                let randArr = [];
                let check = 1;
                for (; ;) {
                    let rand = parseInt(Math.random() * (count_lot)) + 0;
                    for (k in randArr) {
                        if (rand === randArr[k]) {
                            check = 0;
                            break;
                        }
                    }
                    if (check === 1) {
                        randArr.push(rand);
                        matchedArray.push(lotteryArray[rand]);
                        i++;
                    }
                    check = 1;
                    if (i === 4) break;
                }
            }
            else {
                for (hist in historyArray) {
                    let histNum = parseInt(historyArray[hist]);
                    let histLastTwoDigit = histNum % 100;
                    histLastTwoDigit = parseInt(histLastTwoDigit / 10) + ((histLastTwoDigit % 10) * 10);
                    for (lot in lotteryArray) {
                        let lotNum = parseInt(lotteryArray[lot].id);
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
                lotteryArray.push({
                    id: doc.id,
                    photoURL: doc.data().photoURL,
                    nguad: doc.data().nguad,
                    stock: doc.data().stock
                });
            });
            let i = 0;
            const count_lot = lotteryArray.length;
            let randArr = [];
            let check = 1;
            for (; ;) {
                let rand = parseInt(Math.random() * (count_lot)) + 0;
                for (k in randArr) {
                    if (rand === randArr[k]) {
                        check = 0;
                        break;
                    }
                }
                if (check === 1) {
                    randArr.push(rand);
                    matchedArray.push(lotteryArray[rand]);
                    i++;
                }
                check = 1;
                if (i === 4) break;
            }
        }

        // console.log("historyArray : ", historyArray);
        // console.log("lotteryArray : ", lotteryArray);
        // console.log("matchedArray : ", matchedArray);
        res.send(matchedArray);
    } catch (error) {
        console.log(error);
    }
}

const getAlmostOutOfStock = async (req, res, next) => {
    try {
        const lotteryArray = [];
        const almostOutOfStockLotteryArray = [];
        const lottery = await firestore.collection('lottery').get();
        let i;
        for (i = 0; i <= 10; i++) {
            lotteryArray.push([i]);
        }
        lottery.docs.forEach(doc => {
            //push into array
            lotteryArray[doc.data().photoURL.length].push({
                id: doc.id,
                photoURL: doc.data().photoURL,
                nguad: doc.data().nguad,
                stock: doc.data().photoURL.length
            });
        });
        let count = 0;
        for (i = 0; i <= 10; i++) {
            for (let j = 1; ; j++) {
                if (lotteryArray[i][j] === undefined) break;
                almostOutOfStockLotteryArray.push(lotteryArray[i][j]);
                count++;
                if (count === 8) break;
            }
            if (count === 8) break;
        }
        // console.log("lotteryArray : ", lotteryArray);
        // console.log("almostOutOfStockLotteryArray : ", almostOutOfStockLotteryArray);
        res.send(almostOutOfStockLotteryArray);
    }
    catch (error) {
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
        const lottery = await firestore.collection('lottery').get();
        await lottery.docs.forEach(doc => {
            //push into array
            // const lot = new Lottery(
            //     doc.id,
            //     doc.data().photoURL,
            // )
            lotteryArray.push({
                id: doc.id,
                photoURL: doc.data().photoURL,
                // nguad: doc.data().nguad,
                stock: doc.data().photoURL.length
            });

        });
        //instant find without any split
        if (position === "whole") {
            await lotteryArray.forEach(lot => {
                let searchingNum = lot.id;
                if (findingNum === searchingNum) matchedLotteryArray.push(lot);
            });
        }
        //split and find
        else if (position === "last2" || position === "last3" || position === "front") {
            await lotteryArray.forEach(lot => {
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
    getAlmostOutOfStock,
    getSearchNumber,
    getNgudShop
}