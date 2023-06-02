const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
// Register a User 

const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avator: {
            public_id: " this is a sample id",
            url: " profilepicUrl",
        }
    });
    const token = user.getJWTToken()

    res.status(201).json({
        success: true,
        token,
    })
})


module.exports = { registerUser }