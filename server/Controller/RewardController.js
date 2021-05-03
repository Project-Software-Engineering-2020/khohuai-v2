const { firestore, auth } = require('../firebaseDB');

const getRewardLotteryOfUser = async (req, res, next) => {

    let MyReward = [];
    const uid = auth.currentUser.id;

    const docRef = firestore.collection("rewards");
    await docRef.where("uid", "==", uid).orderBy("update_date", "desc")
        .get()
        .then((result) => {
            result.forEach((doc) => {
                MyReward.push(
                    {
                        id: doc.id,
                        lottery: doc.data().lottery,
                        uid: doc.data().userid,
                        success: doc.data().success,
                        win_total: doc.data().win_total,
                        win_chart: doc.data().win_chart,
                        win_amount: doc.data().win_amount,
                        update_date: doc.data().update_date
                    }
                );
            })
            res.status(200).send(MyReward);
        })
        .catch((err) => {
            console.log(err)
        })
}

const getRewardDetail = async (req,res) => {

    const id = req.params.id;
    
    try {
        const id = req.params.id;
        await firestore.collection('rewards').doc(id).get().then((doc) => {
            res.send(doc.data())
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getRewardLotteryOfUser,
    getRewardDetail
}