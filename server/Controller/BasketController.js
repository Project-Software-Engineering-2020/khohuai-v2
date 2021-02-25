const { firestore, firebaseApp } = require('../firebaseDB');


const getMyCart = async (req, res) => {
    try {
        let ArrayL = [];
        let MyCart = [];
        await firestore.collection("users").doc("AaAkI4SPVtefTCE5OGmMdlrcN3k2")
            .collection("cart").get().then((doc) => {
                doc.docs.forEach(element => {
                    ArrayL.push(element.id);
                });
            })

        res.send(ArrayL);
        // ArrayL.forEach(el => {
        //     firestore.collection("LotteriesAvailable").doc(el).get().then((doc) => {
        //         MyCart.push( 
        //             {
        //                 id: doc.id,
        //                 photoURL: doc.data()
        //             });
        //     })
        //     res.send(MyCart)
        // })
        // await firestore.collection("LotteriesAvailable").where(firestore.FieldPath.documentId(), 'in', ["123456"]).get()
        // .then((doc)=> {
        //     doc.docs.forEach(element => { console.log(element) })
        // })
        // myCollection.where(firestore.FieldPath.documentId(), 'in', ["123","456","789"])
    } catch (err) {
        console.log(err);
    }
}

const addMyCart = (req, res) => {

    const uid = "AaAkI4SPVtefTCE5OGmMdlrcN3k2";
    const data = req.body.data;
    try {
        firestore.collection("users").doc(uid).collection("cart").doc().set({
            data
        }).then(
            res.status(200).send("seccess")
        )
    } catch (error) {
        console.log(error);
    }
}











const editMyCart = (req, res) => {

    // try {
    //     firestore.collection("cart").doc("LUpXYzfWsOTkQdVpchXp").update({
    //         items: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
    //     })
    // } catch (error) {
    //     console.log(error)
    // }
}

module.exports = {
    getMyCart,
    addMyCart
} 