const express = require("express")

const app = express();

app.get("/api", (req, res) => {
    res.json ({fruits: ["apple", "orange"]})
})

app.listen (8080, () => {
    console.log (`Server listening on 8080`);
});

