const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const errorMiddlware = require("./middleware/error")

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

//Route imports
const product = require("./routes/productsRoute")

app.use("/api/v1", product)

//Middleware for Error
app.use(errorMiddlware)

module.exports = app