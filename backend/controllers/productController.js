const ProductDB = require("../models/productModel")

// Create Products
const createProduct = async (req, res, next) => {

    const product = await ProductDB.create(req.body);
    try {
        res.status(201).json({
            _id: product._id,
            success: true,
            product
        })
    } catch (err) {
        return res.json({ msg: err })
    }

}

//Get ALL Product
const getAllProduct = async (req, res) => {
    const allProduct = await ProductDB.find()
    return res.status(200).json({
        success: true,
        allProduct
    })
}

//update Products

const updateProduct = async (req, res) => {
    let product = await ProductDB.findById(req.params.id);

    if (!product) {
        res.status(404).json({
            success: false,
            message: "Product not Found"
        })
    }

    product = await ProductDB.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    return res.status(200).json({
        success: true,
        product,
        message: "Updated"

    })
}

// Delete Product

const deleteProduct = async (req, res) => {

    let product = await ProductDB.findById(req.params.id)
    if (!product) {
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    await ProductDB.deleteOne()
    return res.status(200).json({
        success: true,
        message: "Product is deleted"
    })
}

//get single product detail

const getSingleProduct = async (req, res) => {

    const product = await ProductDB.findById(req.params.id);
    if (!product) {
        res.status(404).json({
            success: false,
            message: "product not found"
        })
    }
    return res.status(200).json({
        success: true,
        product
    })
}



module.exports = { getAllProduct, createProduct, updateProduct, deleteProduct, getSingleProduct }