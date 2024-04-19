// Navbar.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { showPopUP } from "../store/userSlice"
import axios from "axios"
import Spinner from './Spinner';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [authStatus, setAuthStatus] = useState(true)
    const [loading, setLoading] = useState(false)


    let accessToken = Cookies.get("accessToken")
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const LogoutUser = async () => {
        setLoading(true)
        const accessToken = Cookies.get("accessToken")
        const data = {
            accessToken
        }

        try {
            const response = await axios.post("http://localhost:8000/api/v1/users/logout", data)

            if (response) {
                dispatch(showPopUP({
                    message: "Logout Successfully"
                }))
                Cookies.remove("accessToken")
                Cookies.remove("refreshToken");

                // navigate("/")
                window.location.href = 'http://localhost:5173/';
            }
            console.log(response)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }


    useEffect(() => {

        if (accessToken) {
            setAuthStatus(false)
        }
    }, [accessToken])

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleLogin = () => {
        // Perform login action (e.g., authenticate user)
        // Set loggedIn and userName states accordingly
        setLoggedIn(true);
        setUserName('John Doe');
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <img className="h-8 w-8" src="https://via.placeholder.com/40" alt="Logo" />
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-baseline space-x-4">
                            {authStatus ? <Link to="/auth" className="  text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link> : null

                            }

                            {authStatus ? null : <button
                                className="  text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={LogoutUser}
                            >
                                Logout
                            </button>}



                            <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/services" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</Link>
                            <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                            <Link to="/user" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profie</Link>


                            {/* Add more tabs here */}
                        </div>
                    </div>
                    <div className="block md:hidden">
                        <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {authStatus ? null :
                            <Link to="/auth" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login </Link>
                        }
                        <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link to="/services" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</Link>
                        <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>

                        {/* Add more tabs here */}

                    </div>
                    <Spinner loading={loading} />
                </div>

            )}
        </nav>
    );
};

export default Navbar;
