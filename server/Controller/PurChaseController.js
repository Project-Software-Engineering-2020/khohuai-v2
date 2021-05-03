const { firestore, auth } = require('../firebaseDB');

const BeforePurchase = async (req, res, next) => {

    const docRef = firestore.collection("invoices");
    let ArrayPurchase = [];
    const uid = await auth.currentUser.uid;
    await docRef.where("userid", "==", uid).orderBy("date", "desc")
        .get()
        .then((result) => {
            result.forEach((doc) => {
                ArrayPurchase.push({
                    date: doc.data().date.toDate(),
                    nguad: doc.data().nguad,
                    totalprice: doc.data().totalprice,
                    invoiceid: doc.id,
                    quantity: doc.data().quantity,
                    lottery: doc.data().lottery
                });
            })
            res.send(ArrayPurchase);
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    BeforePurchase
}