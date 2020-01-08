const express = require('express');
const mysql = require('mysql');
const path = require('path');
const parser = require('body-parser');
const hbs = require('handlebars');
var exphbs = require('express-handlebars');
var app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gamecarlist'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Connected to database");
});


app.set('views',path.join(__dirname,'views'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/',(req, res) => {
    let sql = "SELECT * FROM nfsheat";
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.render('index',{
            results: results
        });
    });
});

app.post('/save', (req, res) => {
    let dat = {brand: req.body.brand, make: req.body.make, year: req.body.year};
    let sql = "INSERT INTO nfsheat SET ?";
    let query = db.query(sql, dat,(err, results) => {
        if(err){
            throw err;
        }

        res.redirect('/');
    });
});

app.post('/update', (req, res) => {
    let sql =  "UPDATE nfsheat SET brand='"+req.body.brand+"', make='"+req.body.make+"', year='"+req.body.year+"' WHERE id='"+req.body.id+"'";
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err;
        }

        res.redirect('/');
    });
});

app.post('/delete', (req, res) =>{
    let sql = "DELETE FROM nfsheat WHERE id="+req.body.id+"";
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err;
        }

        res.redirect('/');
    });
});

app.listen(5000, () => {
    console.log('Server is up on port 5000');
});