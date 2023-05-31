const express = require("express");
const {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct
} = require("../controllers/productController");

const router = express.Router();

router.route("/product").get(getAllProduct)

router.route("/product/new").post(createProduct)

router.route("/product/:id").delete(deleteProduct).patch(updateProduct).get(getSingleProduct)

module.exports = router;