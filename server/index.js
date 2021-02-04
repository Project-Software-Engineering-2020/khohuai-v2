const express = require('express');
const cors = require('cors');
const bodypParder = require('body-parser');
const config = require('./config')
require('dotenv').config()

//import route
const lotteryRoutes = require('./Routes/Lottery');
const userRouter = require('./Routes/User');

var omise = require('omise')({
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY,
})

// console.log("-------------This is pub key-------------------" + process.env.OMISE_PUBLIC_KEY)

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodypParder.json());

app.use('/api', userRouter);
app.use('/lottery', lotteryRoutes);

app.post('/checkout-credit-card', (req,res,next) => {
  console.log(req)
  // try{
  //   const customer = await omise.customers.create({
  //     email:"bebeoblybe@gmail.com",
  //     description:"John Doe",
  //     card:'tokn_test_5mr8vzzc7y4r8tfl8ys'
  //   })
  //   const charge   = await omise.charges.create({
  //     amount: 10000,
  //     currency: "thb",
  //     customer: customer.id
  //   })
  //   console.log(charge)
  // }
  // catch(error){
  //   console.log(error)
  // }
  next()
})

// http://localhost:3001
app.listen(config.port, () => 
    console.log("Server is running...")
)