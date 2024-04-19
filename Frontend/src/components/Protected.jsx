import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import Cookies from "js-cookie";
import axios from 'axios';
import { Tuple } from '@reduxjs/toolkit';
import { login } from '../store/userSlice';
import AuthPage from './AuthPage';
import { refreshAccessToken } from "../functions/refreshAccessToken"

export default function Protected({ children }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    let accessToken = Cookies.get("accessToken")
    const refreshToken = Cookies.get("refreshToken")

    const runProtector = async () => {
        if (accessToken) {
            setLoader(false)
        } else if (refreshToken) {
            await refreshAccessToken();
            accessToken = Cookies.get("accessToken") // Update the existing variable
            if (accessToken) {
                setLoader(false)
            }
        } else {
            navigate("/auth")
            setLoader(false)
        }
    }

    useEffect(() => {
        runProtector();
    }, []); // Empty dependency array to run only once when the component mounts

    return loader ? <Spinner loading={loader} /> : <>{children}</>;
}
