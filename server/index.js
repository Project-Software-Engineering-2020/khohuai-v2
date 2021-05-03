const express = require('express');
const cors = require('cors');
const bodyParder = require('body-parser');
const PORT = process.env.PORT || 3001;

//import route
const lotteryRoutes = require('./Routes/Lottery');
const userRouter = require('./Routes/User');
const checkoutCreditCard = require('./Routes/Checkout');
const authentication = require('./Routes/Auth');
const basketRouter = require('./Routes/Basket');
const PurchaseRouter = require('./Routes/Purchase');
const rewardRoute = require('./Routes/Reward');
const gameRouter = require('./Routes/Game');

const app = express();

var passport = require('passport');
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
app.use('/purchase',PurchaseRouter);
app.use('/checkout-credit-card',checkoutCreditCard);
app.use('/reward', rewardRoute);
app.use('/game', gameRouter);

// http://localhost:3001
app.listen(PORT, () =>
    console.log("Server is running...")
)