const { firestore } = require('../firebaseDB');


const getMyCart = async (req, res) => {
    try {
        await firestore.collection("carts").doc("LUpXYzfWsOTkQdVpchXp").get().then((doc) => {
            res.status(200).send(doc.data());
        });
    }catch(err) {
        console.log(err);
    }
}
const editMyCart = (req,res) => { 

    // try {
    //     firestore.collection("cart").doc("LUpXYzfWsOTkQdVpchXp").update({
    //         items: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
    //     })
    // } catch (error) {
    //     console.log(error)
    // }
}

module.exports = {
    getMyCart
} 