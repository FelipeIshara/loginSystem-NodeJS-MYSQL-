const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOTS,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    const {name , email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        //if email already in use
        if (results.length > 0) {
            return res.render('register', {
                message: "Email already in use"
            })
        // if password do not match    
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: "Password do not match"
            });
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        db.query('INSERT INTO users SET ?', {
            name: name,
            email : email,
            password: hashedPassword
            }, (error,results) => {
                if (error){
                console.log(error);
            } else {
                return res.render('register', {
                    message: "User registered"
                });
            }
        })
    })
}