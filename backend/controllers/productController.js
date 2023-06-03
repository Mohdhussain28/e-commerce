const catchAsyncError = require("../middleware/catchAsyncError");
const ProductDB = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeature");
const ErrorHandler = require("../utils/errorHandler");

// Create Products
const createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id
    const product = await ProductDB.create(req.body);
    res.status(201).json({
        _id: product._id,
        success: true,
        product
    })
})

//Get ALL Product
const getAllProduct = catchAsyncError(async (req, res) => {
    const keyword = req.query
    const resultPerPage = 5;
    const productCount = await ProductDB.count();

    const apiFeatures = new ApiFeatures(ProductDB.find(), keyword)
        .search()
        .filter()
        .pagination(resultPerPage);
    const allProduct = await apiFeatures.query;

    res.status(200).json({
        success: true,
        allProduct,
        productCount
    })
})

//update Products

const updateProduct = catchAsyncError(async (req, res) => {
    let product = await ProductDB.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
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
})

// Delete Product

const deleteProduct = catchAsyncError(async (req, res) => {

    let product = await ProductDB.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    await ProductDB.deleteOne()
    return res.status(200).json({
        success: true,
        message: "Product is deleted"
    })
})

//get single product detail

const getSingleProduct = catchAsyncError(async (req, res, next) => {

    const product = await ProductDB.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    return res.status(200).json({
        success: true,
        product
    })
})



module.exports = { getAllProduct, createProduct, updateProduct, deleteProduct, getSingleProduct }