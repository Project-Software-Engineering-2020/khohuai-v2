const express = require('express');
const cors = require('cors');
const bodyParder = require('body-parser');
const config = require('./config')
require('dotenv').config()

//import route
const lotteryRoutes = require('./Routes/Lottery');
const userRouter = require('./Routes/User');
const checkoutCreditCard = require('./Routes/Checkout');
const authentication = require('./Routes/Auth');
const basketRouter = require('./Routes/Basket');

const app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

app.use(session({
    secret: 'khohuai',
    resave: false,
    saveUninitialized: true
}))

app.get("*",function(req,res,next){
    res.locals.user = req.user || null;
    next();
  })

app.use(cors());
app.use(express.json());
app.use(bodyParder.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/auth', authentication);
app.use('/lottery', lotteryRoutes);
app.use('/cart', basketRouter);
app.use(checkoutCreditCard)


// app.post('/checkout-credit-card', async (req, res, next) => {
//   const { email, name, amount, token } = req.body;
//   console.log(amount)
//   try {
//     const customer = await omise.customers.create({
//       email,
//       description: name,
//       card: token,
//     })
//     const charge = await omise.charges.create({
//       amount,
//       currency: "thb",
//       customer: customer.id
//     })
//     console.log("Charge ========> " , charge)
//     res.send({
//       amount : charge.amount,
//       status: charge.status,
//     })
//   } catch (err) {
//     console.log("ตรงนี้")
//     console.log(err)
//   }
//   next()
// })

// http://localhost:3001
app.listen(config.port, () =>
    console.log("Server is running...")
)