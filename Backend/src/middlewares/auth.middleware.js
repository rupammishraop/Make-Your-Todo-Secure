import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || req.body?.accessToken

        if (!token) {
            throw new apiError(401, "Unauthorized Request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const username = decodedToken.username;
        const user = User.findOne({
            $or: [{ username }]
        }).select("-password -refreshToken")

        if (!user) {
            throw new apiError(401, "Invalid Access Token")
        }
        req.user = user;
        req.decodedToken = decodedToken;
        next();
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid Access Token")
    }
})

export { verifyJWT }