const express = require('express');
const cors = require('cors');
const bodypParder = require('body-parser');
const config = require('./config');

const lotteryRoutes = require('./Routes/Lottery');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodypParder.json());

app.use('/api', lotteryRoutes);

app.get('/hello', (req, res) => {
    console.log("hello")
})

// http://localhost:3001
app.listen(config.port, () =>
    console.log("Server is running...")
)



