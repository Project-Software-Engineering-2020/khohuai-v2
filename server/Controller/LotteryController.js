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
                console.log(lotteryArray)
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
        await db.collection('LotteriesAvailable').doc(id).get().then((doc) => {
            res.send(doc.data())
        })

    } catch (error) {
        console.log(error);
    }
}

const getSearchNumber = async (req, res, next) => {
    console.log("test");
    // try {
    //     const lotteryArray = [];
    //     const matchedLotteryArray = [];
    //     //recieved search number
    //     const number = req.params.number;
    //     const position = req.params.position;

    //     const finding = number.split("");
    //     let findingNum = "";
    //     for(let i=0; i<6; i++){
    //         findingNum += finding[i];
    //     }
    //     await db.collection('LotteriesAvailable').doc().get().then((docs) => {
    //         docs.forEach(doc => {
    //             //push into array
    //             const lot = new Lottery(
    //                 doc.id,
    //                 doc.data().number,
    //                 doc.data().photoURL,
    //                 doc.data().r,
    //                 doc.data().s,
    //                 doc.data().t
    //             )
    //             lotteryArray.push(lot);
    //         });
    //     })
    //     if(position === "last"){
    //         var j = 3;
    //         var max = 6;
    //     }
    //     else if(position === "front"){
    //         var j = 0;
    //         var max = 3
    //     }
    //     //instant find without any split
    //     else if(position === "whole"){
    //         lotteryArray.forEach(lot => {
    //             let searchingNum = lot.number;
    //             if(findingNum === searchingNum) matchedLotteryArray.push(lot);
    //         }); 
    //     }
    //     //split and find
    //     if(position === "last" || position === "front"){
    //         lotteryArray.forEach(lot => {
    //             const num = lot.number.split("");
    //             let searchingNum = "";
    //             for(let i=j; i<max; i++){
    //                 searchingNum += num[i];
    //             }
    //             if(findingNum === searchingNum) matchedLotteryArray.push(lot);
    //         });
    //     }
    //     res.send(matchedLotteryArray);
    // } catch (error) {
    //     console.log(error);
    // }
}

module.exports = {
    getAllLottery,
    getDetailLottery,
    getSearchNumber
}