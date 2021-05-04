const { firestore, auth } = require('../firebaseDB');

const BeforePurchase = async (req, res, next) => {

    const docRef = firestore.collection("invoices");
    let ArrayPurchase = [];
    let uid = "";

    await auth.onAuthStateChanged(function (user) {
        if (user) {
            uid = user.uid;
        }
    });
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
                    lottery: doc.data().lottery,
                    result: doc.data().result
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