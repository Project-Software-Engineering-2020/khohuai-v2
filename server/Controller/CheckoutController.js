const { firestore } = require('../firebaseDB');
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
                lottery: lottery_each_number
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

  console.log("สลากที่ซื้อ", Mycart);

  try {
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
                    lottery: lottery_each_number
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
        nguad: 15,
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
      // await romoveInStock()
    }
  } catch (err) {
    console.log(err)
  }
}
// const createinvoice = async (data,doto,idUser) => {
//   const charge = data;
//   const Mycart = doto;
//   const uid = idUser;
//   console.log("charge +++++++++++++++++++++", charge)
//   try{
//     if(charge.status === "successful"){
//       console.log("เข้ามานะ")
//       const invoice = firestore.collection("invoices").doc(charge.id);
//       await invoice.set({
//         invoiceid: charge.id,
//         userid:uid,
//         lottery:Mycart.cart
//       })

//       Mycart.cart.map((item) => {
//         firestore.collection("users").doc(uid)
//         .collection("cart").doc(item.id).delete()
//         .then((success) => {console.log("clear ตะกร้าแล้ว")})
//         .catch((err) => console.log("ลบไม่ได้",err));
//       })
//     }
//   }catch(err){
//     console.log(err)
//   }
// }



module.exports = {
  checkoutCreditCard,
  createinvoice,
  romoveInStock
}
