import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from '../models/user.model.js';


const options = {
    httpOnly: true,
    secure: true
};
const generate_AccessToken_And_RefreshToken = async ( userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave:false });
    
        return { accessToken, refreshToken }
    
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
};

const registerUser = asyncHandler( async (req, res) => {
    console.log(req?.body);
    /*
    if (
        [username,email,password,fullName].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    };

    const existedUser  = await User.findOne({
        $or:[{username},{email}]
    });

    if (existedUser) {
        throw new ApiError(401, "User already register with is email id Or username ")
    };

    const user = await User.create({
        username:username,
        email:email,
        password,
        fullName
        });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(555, "Something went wrong while registering the user")
    };
*/
    return res
    .status(200)
    .json( new ApiResponse (201, "User registered Successfully"))

});

const loginUser = asyncHandler( async (req,res) => {
    const { username, email, password } = req.body;

    if (!(username || email)) {
        throw new ApiError(402, "username or email is required")
    };
    const user = await User.findOne({
        $or:[{username},{email}]
    });
    if (!user) {
        throw new ApiError(401, "User does not exist")
    };
    const isPasswordValid = await user.isPasswordCorrect(password);

    if ( !isPasswordValid ) {
        throw new ApiError(403, ":: Password incorrect ::")
    };

    const { accessToken, refreshToken } = await generate_AccessToken_And_RefreshToken(user._id);

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
        201, 
        {user:loggedUser, accessToken,refreshToken},
        "User Login successfully")
    );

});
const logoutUser = asyncHandler( async (req,res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {new:true});

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(201,{},"User Logout successfully")
    );

});



export { 
    registerUser,
    loginUser,
    logoutUser
};