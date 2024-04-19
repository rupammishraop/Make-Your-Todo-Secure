import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken, getCurrentUser, addTodo, deleteTodo } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// register router
router.route("/register").post(

    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

// router.route("/login") -> login route

router.route("/login").post(loginUser)

// logout router
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/getuser").post(verifyJWT, getCurrentUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/add-todo").post(verifyJWT, addTodo)
router.route("/delete-todo").post(verifyJWT, deleteTodo)

export default router