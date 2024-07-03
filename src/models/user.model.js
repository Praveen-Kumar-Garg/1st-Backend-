import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
//jwt is bearertoken
import bcrypt from "bcrypt"

//use prehook of middleware just before data is saved

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
        //if we want to make any field searching then index true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //claudinary url like aws service
        required: true,

    },
    avatar: {
        type: String,


    },
    watchHistory: [
        {
            //make array of watch history contain id of videos which has beeen watched
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is req']
    },
    refreshToken: {
        type: String
    }

}, { timestamps: true })

//use prehook of middleware just before data is saved

userSchema.pre("save", async function (next) {
    //not save password everytime  if it is modified then only save again
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
    //10 means 10 round hash
})
//we are checking the password(methods from middleware is used)
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
    //bcrypt also compare the password
}
//method for generating access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
          

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}



//use callback with function and use next middleware

export const User = mongoose.model("User", userSchema)
//bcrypt (helps to encrypt a password)
//json webtoken ( made from crypto used for encryption)