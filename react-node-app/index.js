const express = require("express")
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

app.use(express.json());


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
    db.query(sql, [req.body.email,req.body.password], (err, data) => {
        if(err){
            return res.json("Error");
        }if(data.length > 0){
            return res.json("Success");
        }else {
            return res.json("Failed");
        }
        
    });
})

app.post('/signup', (req,res) => {
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(mysql, [values], (err, data) => {
        if (err) return res.json("Login Failed");
        return res.json(data);
    });
})


app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange"] })
})

app.listen(5173, () => {
    console.log(`Server listening on 5173`);
});

