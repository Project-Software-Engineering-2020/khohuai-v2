const { firestore } = require('../firebaseDB');

const Invoice = require("../Models/Invoice");
const omise = require('omise')({
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY,
})

const checkoutCreditCard = async (req, res, next) => {
  // console.log("เข้ามาแล้ว")
    const { email, uid ,amount,token,buyItem } = req.body;
    console.log("email" , email)
    console.log("uid" , uid)
    console.log("amount" , amount)
    console.log("token" , token)
    console.log("buyItem" , buyItem);
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
      createinvoice(charge,buyItem,uid)
      console.log("Charge ========> " , charge)
      res.send({
        amount : charge.amount,
        status: charge.status,
      })
      
    } catch (err) {
      console.log("ตรงนี้")
      console.log(err)
    }
    next()
}
const createinvoice = async (data,doto,idUser) => {
  const charge = data;
  const Mycart = doto;
  const uid = idUser; 

  console.log("charge", charge);
  console.log("mycart", Mycart)
  console.log("uid", uid);

  const d = new Date();
  
  console.log("สลากที่ซื้อ", Mycart);

  try{
    if(charge.status === "successful"){
      console.log("เข้ามานะ")
      const invoice = firestore.collection("invoices").doc(charge.id);
      await invoice.set({
        invoiceid: charge.id,
        userid:uid,
        lottery:Mycart.cart,
        date:d,
        totalprice:charge.amount / 100,
        quantity:Mycart.length,
        nguad:15,
      }).then((res) => {
        console.log("invoice เพิ่มแล้ว")

        //ลบ item ในตะกร้า
        Mycart.map((item) => {
          firestore.collection("users").doc(uid)
          .collection("cart").doc(item.id).delete()
          .then((success) => {console.log("clear ตะกร้าแล้ว")})
          .catch((err) => console.log("ลบไม่ได้",err));
        })
      })
    }
  }catch(err){
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
    createinvoice
}