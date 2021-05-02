const { firestore } = require('../firebaseDB');

const getCart = async (uid) => {

    let MyCart = new Array();
    let Lottery = [];

    try {

        //get item ในตะกร้าของฉัน
        await firestore.collection("users").doc(uid)
            .collection("cart").get()
            .then((doc) => {
                doc.docs.forEach(item => {
                    MyCart.push(
                        {
                            id: item.id,
                            photoURL: item.data().photoURL,
                            qty: item.data().photoURL.length,
                            selected: true,
                            check: true
                        }
                    )
                });


            })

        //จำนวนสลากในระบบ ณ ปัจจุบัน
        await firestore.collection("lottery").get().then((doc) => {
            doc.docs.forEach(item => {
                Lottery.push(
                    {
                        id: item.id,
                        photoURL: item.data().photoURL,
                        qty: item.data().photoURL.length
                    }
                )
            })
        })

        let want_to_check = []

        await MyCart.map(async (item, index) => {

            want_to_check = [];
            want_to_check = Lottery.filter((lotto) => { return lotto.id === item.id })

            if (want_to_check.length > 0) {

                if (item.id === want_to_check[0].id) {

                    console.log("ยังมีเหลืออยู๋");

                    if (item.qty > want_to_check[0].qty) {

                        let newData= {
                            id: item.id,
                            photoURL: want_to_check[0].photoURL,
                            qty: want_to_check[0].qty
                        }

                        MyCart[index] = newData
                        console.log("ลดจำนวนในตระกร้าลง");
                        await firestore.collection("users").doc(uid)
                            .collection("cart").doc(item.id)
                            .update(newData);

                        return MyCart;
                    }
                    else {
                        console.log("สลากในสต็อกเหลืออยู่ มากกว่าจำนวนในตะกร้า");
                        return MyCart;
                    }
                }
            }
            else {

                console.log("สลากใบสุดท้ายถูกซื้อไปแล้ว")
                await firestore.collection("users").doc(uid)
                    .collection("cart").doc(item.id)
                    .delete()
                    .then(MyCart.splice(index, 1))
                    .catch((err) => console.log("ลบไม่ได้ ไม่รู้เป็นไร ดู error เอาเอง", err))

                await MyCart.splice(index, 1);
               
            }
        })

    } catch (err) {
        console.log(err);
    }
    return MyCart
}

const getMyCart = async (req, res) => {
    const uid = "T6NMBO1XbscTWBeUsUCTy9ymrg82";

    const MyCart = await getCart(uid)
    await res.status(200).send({ data: MyCart, message: "ข้อมูลตะกร้าสินค้าของคุณ" })

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

                console.log("ในสต็อกมีอยู่ ", stock, "และในตะกร้าของคุณ ", MyCart.qty);

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
                    const newMyCart = await getCart(uid)
                    await res.status(200).send({ data: newMyCart, message: "ข้อมูลตะกร้าสินค้าของคุณ" })

                }
                else {
                    console.log("จำนวนคงเหลือในสต็อกไม่มีเพียงพอ ให้คุณเพิ่มลงในตะกร้า")
                    res.status(200).send({ data: getCart(uid), message: "จำนวนคงเหลือในสต็อกไม่มีเพียงพอ ให้คุณเพิ่มลงในตะกร้า" })
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
                const newMyCart = await getCart(uid)
                await res.status(200).send({ data: newMyCart, message: "เพิ่มลงตะกร้าสำเจ็จ" })
            }
        }
        else {
            console.log("สลากในสต็อกไม่เพียงพอ")
            const newMyCart = await getCart(uid)
            res.status(200).send({ data: newMyCart, message: "สลากในสต็อกไม่เพียงพอ" })
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

        const newMyCart = await getCart(uid)
        res.status(200).send({ data: newMyCart, message: "ลดจำนวนสินค้าในตะกร้าสำเร็จ" })

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
        const newMyCart = await getCart(uid)
        res.status(200).send({ data:newMyCart, message: "ลบสินค้าในตะกร้าสำเร็จ" })

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