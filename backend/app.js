const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.route')
const connectToDb = require('./db/db')
connectToDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true,}))



app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/user', userRoutes)

module.exports = app;