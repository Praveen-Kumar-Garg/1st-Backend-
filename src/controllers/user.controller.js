import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user detail from frontend (the data of user )
    //validation( not empty)
    //checkif user already exist: username, email
    //check for images, check for avatar
    //upload them to  cloudinary, avatar
    // create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return respnse
    //taking user detail (it may be in the form of json or url)
    const { fullName, email, username, password } = req.body
    console.log("email:", email);
    //validation (by takinmg one all parameters in array and using property "some")
    if ([fullName, email, username, password].some((field) =>
        field?.trim() === "")
        //if one of the field return true then the field is empty
    ) {
        throw new ApiError(400, "All fields are required")
        //we can check various validation parameters like in email "@"is present or not
    }
    //checking if user exist or not
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
        //'or' is used to check if any of the details of user already exist or not
    })
    if (existedUser) {
        throw new ApiError(409, "User already existing")
    }
    //req.body contain all the data
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    //cover image or avatar contain or not
    //localpath 
    //check for avatar . avatar is mandatory
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    //upload on caludinary from localpath
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
    //creating a user in DB
    const user = await User.create({
        fullName,
        //only we store url in db
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        //we have not checked for cover image , so if coverimage is present '?' then take out url or return empty
        email,
        password,
        username: username.toLowerCase()

    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
        //2 fields password and refresh token will not be present

    )
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
    //return in the form of json and for respone we willuse apiresponse with status code

})

export {
    registerUser,

}