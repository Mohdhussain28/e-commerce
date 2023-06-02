const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const errorMiddlware = require("./middleware/error")

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

//Route imports
const product = require("./routes/productsRoute")
const user = require("./routes/userRoutes");


app.use("/api/v1", product);
app.use("/api/v1", user);

//Middleware for Error
app.use(errorMiddlware)

module.exports = app