const { firestore } = require('../firebaseDB');

const getCart = async (uid, res) => {

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
                            qty: item.data().photoURL.length
                        }
                    )
                });

                res.send(MyCart)
            })
    } catch (err) {
        console.log(err);
    }
}

const getMyCart = async (req, res) => {
    const uid = "T6NMBO1XbscTWBeUsUCTy9ymrg82"
    getCart(uid, res);

}

const addMyCart = async (req, res) => {

    const uid = "T6NMBO1XbscTWBeUsUCTy9ymrg82";
    const lottery = req.body.item;
    const lottery_number = lottery.id;
    let MyCart = {};
    let newMyCart = [];
    let inStock = false;
    let stock = 0;
    let haveInMyCart = false;
    let photoLotteryBuy = "";

    try {

        //check lottery in stock 
        await firestore.collection("lottery").doc(lottery_number).get()
            .then((doc) => {

                console.log("instock  == ", doc.data().photoURL.length)

                if (doc.data().photoURL.length > 0) {
                    stock = doc.data().photoURL.length;
                    photoLotteryBuy = doc.data().photoURL[0];
                    inStock = true;
                }
            })

        await firestore.collection("users").doc(uid)
            .collection("cart").doc(lottery_number).get()
            .then((doc) => {

                if (doc.data() === undefined) {
                    //first insert
                    haveInMyCart = false;

                }
                else {
                    //havedata
                    haveInMyCart = true;
                    MyCart =
                    {
                        id: doc.id,
                        photoURL: doc.data().photoURL,
                        qty: doc.data().photoURL.length
                    }
                }
            })

        //stock มีเพียงพอ
        if (inStock === true) {

            if (haveInMyCart === true) {

                console.log("ในสต็อกมีอยู่ ", stock, "และในตระกร้าของคุณ ", MyCart.qty);

                if (stock > MyCart.qty) {

                    console.log("จำนวนคงเหลือในสต็อกเพียงพอ ยังสามารถเพิ่มได้อีกเรื่อยๆ");

                    let newData = {
                        number: lottery_number,
                        photoURL: [...MyCart.photoURL, photoLotteryBuy],
                        qty: MyCart.qty + 1
                    }

                    //update item into cart user
                    await firestore.collection("users").doc(uid)
                        .collection("cart").doc(lottery_number)
                        .update(newData);

                    //ดึงข้อมูลตะกร้าล่าสุด
                    await getCart(uid, res);

                }
                else {
                    console.log("จำนวนคงเหลือในสต็อกไม่มีเพียงพอ ให้คุณเพิ่มลงในตะกร้า")
                    res.status(200).send({ data: MyCart, message: "จำนวนคงเหลือในสต็อกไม่มีเพียงพอ ให้คุณเพิ่มลงในตะกร้า" })
                }
            }
            else {

                //first this lottery insert
                console.log("ยังไม่มีสลากใบนี้อยู่ในตระกร้างั้นหรอ ใส่ลงไป")

                await firestore.collection("users").doc(uid)
                    .collection("cart").doc(lottery_number)
                    .set(
                        { number: lottery_number, photoURL: [photoLotteryBuy], qty: 1 }
                    );

                //ดึงข้อมูลตะกร้าล่าสุด
                await getCart(uid.res);
            }
        }
        else {
            console.log("สลากในสต็อกไม่เพียงพอ")
            res.status(200).send({ data: MyCart, message: "สลากในสต็อกไม่เพียงพอ" })
        }

    } catch (error) {
        console.log(error)
    }
}
const decreateItemMyCart = async (req, res) => {

    const uid = "T6NMBO1XbscTWBeUsUCTy9ymrg82";
    const lottery = req.body.item;
    let data = {}
    let newDataPhoto = []

    await firestore.collection("users").doc(uid)
        .collection("cart").doc(lottery.id).get()
        .then((doc) => {

            data = {
                number: doc.data().number,
                photoURL: doc.data().photoURL,
                qty: doc.data().photoURL.length
            }

        })


    newDataPhoto = [...data.photoURL];
    newDataPhoto.pop();

    data = {
        ...data,
        photoURL: newDataPhoto,
        qty: data.qty - 1
    }

    await firestore.collection("users").doc(uid)
        .collection("cart").doc(lottery.id)
        .update(data);

    await getCart(uid, res);

}

const removeMyCart = async (req, res) => {
    const uid = "T6NMBO1XbscTWBeUsUCTy9ymrg82";
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
        getCart(uid, res)

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getMyCart,
    addMyCart,
    decreateItemMyCart,
    removeMyCart
}