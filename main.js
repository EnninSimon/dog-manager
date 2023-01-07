const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dogs = require('./routes/dogs')
require('dotenv').config()

//middleware
app.use(express.static('./public'))
app.use(express.json());

app.use('/api/v1/dogs', dogs);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const port = 5000;
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();