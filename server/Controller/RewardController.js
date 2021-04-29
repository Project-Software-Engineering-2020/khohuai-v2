const { firestore, auth } = require('../firebaseDB');

const getRewardLotteryOfUser = async (req, res, next) => {

    let MyReward = [];
    const uid = "T6NMBO1XbscTWBeUsUCTy9ymrg82";

    const docRef = firestore.collection("rewards");
    await docRef.where("uid", "==", uid).orderBy("update_date", "desc")
        .get()
        .then((result) => {
            result.forEach((doc) => {
                MyReward.push(doc.data());
            })
            res.status(200).send(MyReward);
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    getRewardLotteryOfUser
}