const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path=require('path')

const connectDB = require('./config/db');
const cors=require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

const PORT =  5500;

dotenv.config();

connectDB(); 

app.use(cors({ origin: "*" }));

app.use(express.json());


app.use((req, res, next) => {
  console.log('Received request:', req.url);
  console.log('Request body:', req.body);
  next();
});

//Routes
app.use('/auth', require('./routes/authRoute'));
app.use('/purchase', require('./routes/purchaseRoute'));



app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
