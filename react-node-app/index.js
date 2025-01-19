const express = require("express")
const ysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
})

app.get("/api", (req, res) => {
    res.json ({fruits: ["apple", "orange"]})
})

app.listen (8081, () => {
    console.log (`Server listening on 8081`);
});

