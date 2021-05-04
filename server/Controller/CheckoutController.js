const { firestore,auth } = require('../firebaseDB');
// const FieldValue = firestore.FieldValue;
// const admin = require('firebase-admin')
// const FieldValue = admin.firestore.FieldValue;

const Invoice = require("../Models/Invoice");
const omise = require('omise')({
  'publicKey': "pkey_test_5noeh4lp1k7qqkioftf",
  'secretKey': "skey_test_5mrnjk7xfebmeu7w5o1",
})

const checkoutCreditCard = async (req, res, next) => {
  console.log("เข้ามาแล้ว")
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
  let lottery_instock = [];
  let item_buy = doto;
  let ngud = [];
  

  try {
    const ngudDB = await firestore.collection('ngud').orderBy("end", "desc").get()
        await ngudDB.docs.forEach(doc => {
            ngud.push({
                ngud: doc.id,
                end: doc.data().end.toDate(),
                start: doc.data().start,
                total_onhand: doc.data().total_onhand
            })
        });


    if (charge.status === "successful") {

      // const item_bought = await romoveInStock(Mycart);
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
          }
        );
      });


      let enough = true;

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
      console.log(buy);

      const invoice = firestore.collection("invoices").doc();
      await invoice.set({
        charge_id: charge.id,
        userid: uid,
        lottery: buy,
        date: date,
        totalprice: charge.amount / 100,
        quantity: totalItem,
        ngud: ngud[0].id,
        ngud_date: ngud[0].end
      }).then((res) => {
        console.log("invoice เพิ่มแล้ว")

        //ลบ item ในตะกร้า
        Mycart.map((item) => {
          firestore.collection("users").doc(uid)
            .collection("cart").doc(item.id).delete()
            .then((success) => { console.log("clear ตะกร้าแล้ว") })
            .catch((err) => console.log("ลบไม่ได้", err));
        })
      })
      await firestore.collection("ngud").doc(ngud[0].id).update({total_onhand: ngud.total_onhand - totalItem})
      // await romoveInStock()
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

    console.log(userData);

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
