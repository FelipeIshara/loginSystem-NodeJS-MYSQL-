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

//Pegar dados dos forms
app.use(express.urlencoded({extended: false}));
//receber os dados como json
app.use(express.json());

app.set('view engine', 'hbs');

db.connect((error) => {
    if(error) {
        console.log(error)
    }
    else{
        console.log("MySQL Connected...")
    }
})
//Define Routes
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(3000);