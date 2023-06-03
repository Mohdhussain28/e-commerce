const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

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
    sendToken(user, 201, res);
})

// Login User

const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter email or password", 400))
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Please Enter email or password", 401))
    }

    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    const token = user.getJWTToken();

    sendToken(user, 200, res);

})

// Log out

const logoutUser = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Successfully Logout"
    })


})


module.exports = { registerUser, loginUser, logoutUser }