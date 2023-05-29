const express = require("express");
const { getAllProucts, createProduct } = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProucts)
router.route("/createProduct").post(createProduct)

module.exports = router;