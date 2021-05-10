const { firestore, auth } = require('../firebaseDB');
// const FieldValue = firestore.FieldValue;
// const admin = require('firebase-admin')
// const FieldValue = admin.firestore.FieldValue;

const Invoice = require("../Models/Invoice");
const omise = require('omise')({
  'publicKey': "pkey_test_5noeh4lp1k7qqkioftf",
  'secretKey': "skey_test_5mrnjk7xfebmeu7w5o1",
})

const checkoutCreditCard = async (req, res, next) => {
  console.log("เข้ามาแล้ว");

  const { email, uid, amount, token, buyItem, totalItem } = req.body;

  try {
    const customer = await omise.customers.create({
      email,
      description: uid,
      card: token,
    })
    const charge = await omise.charges.create({
      amount,
      currency: "thb",
      customer: customer.id
    })

    createinvoice(charge, buyItem, uid, totalItem)
    // console.log("Charge ========> " , charge)
    res.send({
      amount: amount,
      status: charge.status,
    })

  } catch (err) {
    console.log("ตรงนี้")
    console.log(err)
  }
  next()
}

const romoveInStock = async (item_buy) => {

  console.log(item_buy);

  let lottery_instock = [];
  // let item_buy = [];
  let cut_stock = [];

  //ดึงข้อมูล stock
  const instock = await firestore.collection("lottery").get()
  instock.docs.forEach(item => {
    lottery_instock.push(
      {
        number: item.id,
        lottery_img: item.data().photoURL,
        ngud: item.data().ngud
      }
    );
  });



  let enough = true;

  let buy = [];


  let lottery_each_number = [];
  for (i = 0; i < item_buy.length; i++) {

    for (j = 0; j < lottery_instock.length; j++) {

      if (item_buy[i].id === lottery_instock[j].number) {

        lottery_each_number = lottery_instock[j].lottery_img;

        if (lottery_instock[j].lottery_img.length >= item_buy[i].qty) {

          let target_lottery = [];

          let img = [];
          let buff = [];

          for (k = 1; k <= item_buy[i].qty; k++) {

            target_lottery = lottery_instock[j].lottery_img[k]

            img.push(target_lottery);

            console.log(lottery_each_number);

            lottery_each_number.pop(target_lottery);

            await firestore.collection("lottery").doc(lottery_instock[j].number)
              .update({
                photoURL: lottery_each_number
              })
          }

          buy.push(
            {
              number: item_buy[i].id,
              lottery: img,
              qty: item_buy[i].qty,
              status: false,
              prize: ""
            }
          );

        }
        else {

        }
      }
      continue;
    }
    continue;
  }
  console.log(buy)
  return buy;
}


const createinvoice = async (data, doto, idUser, totalItem) => {

  const charge = data;
  const Mycart = doto;
  const uid = idUser;
  const date = new Date();
  let item_buy = doto;
  let ngud = [];
  let ngud_id_buy = "";

  try {
    await firestore.collection("ngud")
      .where("open", "==", true)
      .get().then(docs => {
        docs.forEach((doc) => {
          ngud.push({
            ngud: doc.id,
            end: doc.data().end,
            start: doc.data().start,
            total_onhand: doc.data().total_onhand
          })
          ngud_id_buy = doc.id;
        })
      });

    if (charge.status === "successful") {

      let userData = [];

      await firestore.collection("users").doc(uid).get().then((doc) => {
        userData.push({
          book_name: doc.data().book_name,
          book_number: doc.data().book_number,
          book_provider: doc.data().book_provider,
          firstname: doc.data().firstname,
          lastname: doc.data().lastname
        })
      })

      let lottery_instock = [];

      //ดึงข้อมูล stock
      const instock = await firestore.collection("lottery").get()
      instock.docs.forEach(item => {
        lottery_instock.push(
          {
            number: item.id,
            lottery_img: item.data().photoURL,
          }
        );
      });

      let buy = [];

      console.log(lottery_instock)
      let lottery_each_number = [];
      for (i = 0; i < item_buy.length; i++) {

        for (j = 0; j < lottery_instock.length; j++) {


          if (item_buy[i].id === lottery_instock[j].number) {

            lottery_each_number = lottery_instock[j].lottery_img;

            if (lottery_instock[j].lottery_img.length >= item_buy[i].qty) {

              let target_lottery = [];

              let img = [];
              let buff = [];

              for (k = 1; k <= item_buy[i].qty; k++) {

                target_lottery = lottery_instock[j].lottery_img[k]

                img.push(target_lottery);


                lottery_each_number.pop(target_lottery);

                console.log(lottery_each_number.length);
                console.log(lottery_instock[j].number)

                if (lottery_each_number.length == 0) {
                  await firestore.collection("lottery").doc(lottery_instock[j].number).delete()
                }
                else {
                  await firestore.collection("lottery").doc(lottery_instock[j].number)
                    .update({
                      photoURL: lottery_each_number
                    })
                }
              }

              buy.push(
                {
                  number: item_buy[i].id,
                  lottery: img,
                  qty: item_buy[i].qty,
                  status: false,
                  prize: [""]
                }
              );
            }
            else {

            }
          }
          continue;
        }
        continue;
      }

      console.log("ngud ", ngud)

      let datainsert = {
        charge_id: charge.id,
        userid: uid,
        lottery: buy,
        date: date,
        totalprice: charge.amount / 100,
        quantity: totalItem,
        ngud: ngud[0].ngud,
        ngud_date: ngud[0].end,
        book_name: userData[0].book_name,
        book_number: userData[0].book_number,
        book_provider: userData[0].book_provider,
        firstname: userData[0].firstname,
        lastname: userData[0].lastname
      }

      console.log("dataInsrt  ", datainsert);

      const invoice = await firestore.collection("invoices").doc().set(datainsert).then((res) => {
        console.log("invoice เพิ่มแล้ว")

        //ลบ item ในตะกร้า
        Mycart.map((item) => {
          firestore.collection("users").doc(uid)
            .collection("cart").doc(item.id).delete()
            .then((success) => { console.log("clear ตะกร้าแล้ว") })
            .catch((err) => console.log("ลบไม่ได้", err));
        })
      })
      let _onhand = ngud[0].total_onhand
      _onhand = _onhand - totalItem;

      await firestore.collection("ngud").doc(ngud[0].ngud).update({ total_onhand: _onhand })

    }
  } catch (err) {
    console.log(err)
  }
}

const checkCompleteProfile = async (req, res) => {

  let uid = "";

  await auth.onAuthStateChanged(function (user) {
    if (user) {
      uid = user.uid;
    }
  });

  let userData = {};
  let complete = true;

  try {
    await firestore.collection('users').doc(uid).get().then((doc) => {

      userData = {
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        phone: doc.data().phone,
        bank_name: doc.data().book_name,
        bank_number: doc.data().book_number,
        bank_provider: doc.data().book_provider
      }
    })

    if (userData.firstname === "" || userData.firstname === undefined || userData.firstname === null) { complete = false }
    if (userData.lastname === "" || userData.lastname === undefined || userData.lastname === null) { complete = false }
    if (userData.phone === "" || userData.phone === undefined || userData.phone === null) { complete = false }
    if (userData.bank_name === "" || userData.bank_name === undefined || userData.bank_name === null) { complete = false }
    if (userData.bank_number === "" || userData.bank_number === undefined || userData.bank_number === null) { complete = false }
    if (userData.bank_provider === "" || userData.bank_provider === undefined || userData.bank_provider === null) { complete = false }

    res.send(complete);

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  checkoutCreditCard,
  createinvoice,
  romoveInStock,
  checkCompleteProfile
}
