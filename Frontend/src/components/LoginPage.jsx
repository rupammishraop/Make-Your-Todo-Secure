import React, { useReducer, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import axios from "axios"
import { useDispatch } from 'react-redux'
import { login, logout } from "../store/userSlice"
import { useNavigate } from 'react-router-dom';
import { localLogin } from '../store/authAction';
import Cookies from "js-cookie"
import { showPopUP } from '../store/userSlice';



const Login = () => {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [authStatus, setAuthStatus] = useState(false)


    const dispatch = useDispatch()
    const navigate = useNavigate();
    let accessToken = Cookies.get("accessToken")

    useEffect(() => {

        if (accessToken) {
            setAuthStatus(true)
        }
    }, [accessToken])

    function validateEmail(email) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        setLoading(true)
        // const formData = new FormData();
        const user = {
            email: "",
            username: "",
            password: ""
        }
        if (validateEmail(id)) {
            user.email = id
        } else {
            user.username = id
        }
        user.password = password
        try {
            const response = await axios.post("http://localhost:8000/api/v1/users/login", user)
            // console.log(response.data.data.user)
            if (response) {
                dispatch(showPopUP({
                    message: "Login Successfully"
                }))
                const userData = response.data.data.user;
                const tokens = {
                    accessToken: response.data.data.accessToken,
                    refreshToken: response.data.data.refreshToken
                }
                // const expiryDateForAccessToken = new Date();
                // expiryDateForAccessToken.setMinutes(expiryDateForAccessToken.getMinutes() + 1);
                // const expiryDateForRefreshToken = new Date();

                Cookies.set("accessToken", tokens.accessToken, { expires: 1 });
                Cookies.set("refreshToken", tokens.refreshToken, { expires: 5 });

                // window.location.href = 'http://localhost:5173/user';

                navigate("/user")



            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }


        // setLoading(false)

    };

    return authStatus ? navigate("/user") : <div className="flex  justify-center bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 rounded shadow p-4 m-2">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="id" className="sr-only">Username or Email</label>
                        <input
                            id="id"
                            name="id"
                            type="text"
                            autoComplete="username"
                            required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username or Email"
                            value={id}
                            onChange={(event) => (setId(event.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => (setPassword(event.target.value))} />
                    </div>
                </div>
                <div className="flex flex-col justify-start ">
                    <div className='flex items-start justify-start mb-2 '>
                        <Link to="/auth/forgatepass" className="text-sm w-full text-indigo-600 hover:text-indigo-500 items-start">
                            Forgot your password?
                        </Link>
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                        <Spinner loading={loading} />
                    </div>
                </div>
            </form>
        </div>
    </div>
};

export default Login;
