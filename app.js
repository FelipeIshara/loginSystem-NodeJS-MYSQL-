const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'nodejs-login'
})

db.connect((error) => {
    if(error) {
        console.log(error)
    }
    else{
        console.log("MySQL Connected...")
    }
})

app.get('/', (req,res) => {
    res.send('hello world')
});

app.listen(3000);