const omise = require('omise')({
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY,
})

const checkoutCreditCard = async (req, res, next) => {
  // console.log("เข้ามาแล้ว")
    const { email, name, amount, token } = req.body;
    console.log(amount)
    try {
      const customer = await omise.customers.create({
        email,
        description: name,
        card: token,
      })
      const charge = await omise.charges.create({
        amount,
        currency: "thb",
        customer: customer.id
      })
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

module.exports = {
    checkoutCreditCard
}