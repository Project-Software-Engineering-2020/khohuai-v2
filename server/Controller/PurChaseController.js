const { firestore, auth } = require('../firebaseDB');

const BeforePurchase = async (req, res, next) => {
    const docRef = firestore.collection("invoices");
    let ArrayPurchase = [];
    const uid = auth.currentUser.uid;
    const query = await docRef.where("userid", "==", uid)
        .get()
        .then((result) => {
            result.forEach((doc) => {
                ArrayPurchase.push(doc.data());
                console.log(doc.data())
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