const Product = require("../models/productModel")


// Create Products
const createProduct = async (req, res, next) => {
    const product = req.body

    await Product.create(product);
    try {
        res.status(201).json({ success: true, product })
    } catch (err) {
        res.json({ msg: err })
    }

}

const getAllProucts = (req, res) => {
    res.status(200).json({ message: "Route is working" })
}


module.exports = { getAllProucts, createProduct }