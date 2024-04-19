import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        throw new apiError(500, "Something went wrong while generating a access and refresh token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    // res.status(200).json({
    //     message : "ok",
    //     tittle : "rupam mishra"
    // })

    const { fullName, email, username, password } = req.body
    if (
        [fullName, email, username, password].some((field) => (
            field?.trim() === ""
        ))
    ) {
        throw new apiError(400, "All Field are required")
    }

    const userExist = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (userExist) {
        throw new apiError(409, "Email and username already Exits")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImgLocalPath = req.files?.coverImage[0]?.path;

    let coverImgLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImgLocalPath = req.files?.coverImage[0]?.path;
    }

    if (!avatarLocalPath) {
        throw new apiError(400, "avatar file are required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImgLocalPath);



    if (!avatar) {
        throw new apiError(400, "avatar file are required")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || "",

    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new apiError(500, "something went wrong while registering a user")
    }

    return res.status(201).json(
        new apiResponse(201, createdUser, "User registered successfully")
    )


})

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!(username || email)) {
        throw new apiError(400, "username or email is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new apiError(404, "user does not exits")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new apiError(404, "Password Incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


    const options = {
        httpOnly: true,
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User Logged In Successfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new apiResponse(200, {}, "User LoggedOut Successfully")
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
    }
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new apiError(401, "unauthorized Access")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decodedToken?._id).select('-password');
        if (!user) {
            throw apiError(401, "invalid refresh Token")
        }

        if (user?.refreshToken !== incomingRefreshToken) {
            throw new apiError(401, 'Invalid Token')
        }
        //Setting New Tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new apiResponse(
                    200,
                    { accessToken, refreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new apiError("400", "invalid refresh Token in catch box ")
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const decodedToken = req.decodedToken;
    const user = await User.findById(decodedToken._id).select("-password -refreshToken")

    return res
        .status(200)
        .json(
            new apiResponse(200, user, "Fetch User Details Successfully")
        )
})

const addTodo = asyncHandler(async (req, res) => {
    const decodedToken = req.decodedToken;
    const { todoId, todoMessage } = req.body
    const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    if (!user) {
        throw new apiError('404', 'No User Found from add todo');
    }
    // user.refreshToken = refreshToken;
    const todo = {
        todoId,
        todoMessage
    }
    user.todos.unshift(todo)
    const newTodo = await user.save({ validateBeforeSave: false })
    if (!newTodo) {
        throw new apiError(500, "Something went wrong while adding the Todo");
    }
    return res
        .status(201)
        .json(
            new apiResponse(201, newTodo, "Todo add successfully")
        )

})

const deleteTodo = asyncHandler(async (req, res) => {
    const decodedToken = req.decodedToken;
    const { key } = req.body

    const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    const newOne = user.todos.filter((todo) => (todo.todoId !== key))
    user.todos = newOne;
    const newTodo = await user.save({ validateBeforeSave: false })
    if (!newTodo) {
        throw new apiError(500, "Something went wrong while deleting the Todo");
    }
    return res
        .status(201)
        .json(
            new apiResponse(201, newTodo, "Delete todo successfully")
        )

})

export {
    registerUser,
    logoutUser,
    loginUser,
    refreshAccessToken,
    getCurrentUser,
    addTodo,
    deleteTodo
}