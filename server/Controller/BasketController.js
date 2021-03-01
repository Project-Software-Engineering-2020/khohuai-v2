const { firestore,auth } = require('../firebaseDB');

const getMyCart = async (req, res) => {
    const uid = auth.currentUser.uid;
    console.log(uid);
    let MyCart = []
    try {
        await firestore.collection("users").doc(uid)
            .collection("cart").get()
            .then((doc) => {
                doc.docs.forEach(item => {
                    MyCart.push(
                        {
                            id: item.id,
                            photoURL: item.data().photoURL,
                            qty: item.data().qty
                        }
                    )
                });

                // console.log(MyCart)
                res.status(200).send(MyCart)
            })
    } catch (err) {
        console.log(err);
    }
}

const addMyCart = async (req, res) => {
    const uid = auth.currentUser.uid;
    const data = req.body.item;
    let MyCart = []
    try {

        await firestore.collection("users").doc(uid)
            .collection("cart").doc(data.id)
            .set(
                { id: data.id, photoURL: data.photoURL, qty: 1 }
            );

        await firestore.collection("users").doc(uid)
            .collection("cart").get()
            .then((doc) => {
                doc.docs.forEach(element => {
                    MyCart.push(
                        {
                            id: element.id,
                            photoURL: element.data().photoURL,
                            qty: 1
                        }
                    )
                });

                // console.log(MyCart)
                res.status(200).send(MyCart)
            })

    } catch (error) {
        console.log(error)
    }
}

const adjustMyCart = async (req, res) => {
    const uid = auth.currentUser.uid;
    const data = req.body.item;

    //เป็น +1 และ -1
    const qty = req.body.qty;
    let MyCart = []

    try {
        //ค้นหาว่ามีสลาใบนี้ยังเหลืออยู่ในระบบหรือไม่
        let inStock;
        await firestore.collection("LotteriesAvailable").doc(data.id)
            .get().then((doc) => { inStock = doc.data() })

        console.log("stock =",inStock.stock ," add", data.qty + qty);
        if ((data.qty + qty) <= inStock.stock) {
            //อัพเดดในตะกร้า
            await firestore.collection("users").doc(uid)
                .collection("cart").doc(data.id)
                .update(
                    { qty: data.qty + qty }
                );
            //ดึงข้อมูลตะกร้าสินค้าล่าสุด
            await firestore.collection("users").doc(uid)
                .collection("cart").get()
                .then((doc) => {
                    doc.docs.forEach(element => {
                        if (element.data().qty > 0) {
                            MyCart.push(
                                {
                                    id: element.id,
                                    photoURL: element.data().photoURL,
                                    qty: element.data().qty
                                }
                            )
                        }
                    });
                    console.log(MyCart)
                    res.status(200).send(MyCart)
                })
        }
        else {
            console.log("ไม่มีสลากใบนี้อยู่")
        }

    } catch (error) {
        console.log(error)
    }
}

const removeMyCart = async (req, res) => {
    const uid = auth.currentUser.uid;
    const id = req.params.id;
    let MyCart = []
    try {
        //ลบ item ในตะกร้า
        await firestore.collection("users").doc(uid)
            .collection("cart").doc(id)
            .delete()
            .then(console.log("ลบออกจากตะกร้าสำเร็จ"))
            .catch((err) => console.log("ลบไม่ได้ ไม่รู้เป็นไร ดู error เอาเอง", err))

        //ดึงข้อมูลล่าสุดมา
        await firestore.collection("users").doc(uid)
            .collection("cart").get()
            .then((doc) => {
                doc.docs.forEach(element => {
                    MyCart.push(
                        {
                            id: element.id,
                            photoURL: element.data().photoURL,
                            qty: element.data().qty
                        }
                    )
                });
                res.status(200).send(MyCart)
            })

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getMyCart,
    addMyCart,
    adjustMyCart,
    removeMyCart
} 