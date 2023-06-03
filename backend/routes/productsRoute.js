const express = require("express");
const {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAllProduct)

router.route("/product/new").post(isAuthenticatedUser, createProduct)

router
    .route("/product/:id")
    .delete(isAuthenticatedUser, deleteProduct)
    .put(isAuthenticatedUser, updateProduct)
    .get(getSingleProduct)

module.exports = router;