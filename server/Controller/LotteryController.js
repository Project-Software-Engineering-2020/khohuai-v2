const firebaseDB = require('../firebaseDB');
const db = firebaseDB.firestore();

//Model
const Lottery = require("../Models/Lottery");

const getAllLottery = async (req, res, next) => {

    const lotteryArray = [];

    if (lotteryArray != []) {
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
        const number = req.params.number;
        const finding = number.split("");
        let findingNum = "";
        for(let i=0; i<6; i++){
            if(finding[i] === "x") continue;
            findingNum[i] += finding[i];
        }
        await db.collection('LotteriesAvailable').doc().get().then((doc) => {
            res.send(doc.data())
        })

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllLottery,
    getDetailLottery,
    getSearchNumber
}