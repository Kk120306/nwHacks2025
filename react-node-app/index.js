const express = require("express")
const ysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})
app.post('/login', (req,res) => {
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
    const values = [
        req.body.email,
        req.body.password
    ]
})

db.query(sql, [values],(err,data) => {
    if(err) return res.json("Login Failed");
    return res.json(data);
})
app.get("/api", (req, res) => {
    res.json ({fruits: ["apple", "orange"]})
})

app.listen (8081, () => {
    console.log (`Server listening on 8081`);
});

