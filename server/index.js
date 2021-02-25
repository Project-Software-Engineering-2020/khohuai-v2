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

// http://localhost:3001
app.listen(config.port, () =>
    console.log("Server is running...")
)