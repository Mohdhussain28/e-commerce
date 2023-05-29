const express = require("express")
const bodyParser = require("body-parser")
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

//Route imports
const product = require("./routes/productsRoute")

app.use("/api/v1", product)

module.exports = app