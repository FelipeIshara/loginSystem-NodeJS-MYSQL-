const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path')


dotenv.config({ path: './.env'})

const db = mysql.createConnection({
    host: process.env.DATABASE_HOTS,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

app.set('view engine', 'hbs');

db.connect((error) => {
    if(error) {
        console.log(error)
    }
    else{
        console.log("MySQL Connected...")
    }
})

app.get('/', (req,res) => {
    res.render('index')
});

app.listen(3000);