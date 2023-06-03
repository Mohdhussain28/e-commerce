const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const errorMiddlware = require("./middleware/error")
const cookieparser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(cookieparser())

//Route imports
const product = require("./routes/productsRoute")
const user = require("./routes/userRoutes");


app.use("/api/v1", product);
app.use("/api/v1", user);

//Middleware for Error
app.use(errorMiddlware)

module.exports = app