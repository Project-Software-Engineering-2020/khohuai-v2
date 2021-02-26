const { firestore } = require('../firebaseDB');

const getMyCart = async (req, res) => {
    const uid = "AaAkI4SPVtefTCE5OGmMdlrcN3k2";
    let MyCart = []
    try {
        await firestore.collection("users").doc(uid)
        .collection("cart").get()
        .then((doc) => {
            doc.docs.forEach(element => {
                MyCart.push(
                    {
                        id: element.id,
                        photoURL: element.data().photoURL
                    }
                )
            });

            console.log(MyCart)
            res.status(200).send(MyCart)
        })
    } catch (err) {
        console.log(err);
    }
}

const addMyCart = async (req, res) => {
    const uid = "AaAkI4SPVtefTCE5OGmMdlrcN3k2";
    const data = req.body.item;
    let MyCart = []
    try {

        await firestore.collection("users").doc(uid)
            .collection("cart").doc(data.id).set(data);

        await firestore.collection("users").doc(uid)
            .collection("cart").get()
            .then((doc) => {
                doc.docs.forEach(element => {
                    MyCart.push(
                        {
                            id: element.id,
                            photoURL: element.data().photoURL
                        }
                    )
                });

                console.log(MyCart)
                res.status(200).send(MyCart)
            })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getMyCart,
    addMyCart
} 