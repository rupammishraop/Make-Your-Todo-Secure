import React, { useState } from 'react';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showPopUP } from '../store/userSlice';


const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setavatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate =  useNavigate();
    const dispatch  = useDispatch()
    

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setavatar(file);
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        setCoverImage(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        // Prepare form data
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('avatar', avatar);
        formData.append('coverImage', coverImage);

        // Send formData to backend (replace 'api/signup' with actual endpoint)
        fetch('http://localhost:8000/api/v1/users/register', {
            method: 'POST',
            body: formData,
        })
            .then((response) => (
                response.json()))
            .then((data) => {
                // Handle response from backend
                console.log(data);
                navigate("/auth")
                dispatch(showPopUP({
                    message : "Account Created Successfull"
                }))
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => (setLoading(false)));
    };

    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
                        Sign up
                    </h2>
                </div>
                <form className="mt-8 space-y-2" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="fullName" className="sr-only">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="relative border-gray-300 border">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-3/4 px-3 py-2   placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* Show Password Button */}
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center mr-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {/* {showPassword ? (
                                    <svg
                                        className="h-5 w-5 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M15.707 7.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414-1.414l8-8a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 8.707a1 1 0 010-1.414l8-8a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-5 w-5 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm14 5a5 5 0 11-10 0 5 5 0 0110 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )} */}
                                {showPassword ? <p className="h-5 w-5 text-gray-500"> Hide  </p> : <p className="h-5 w-5 text-gray-500"> Show</p>}
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between border border-gray-300 placeholder-gray-500'>
                            <p className='self-center ml-2 '>
                                Select Profile Image
                            </p>
                            <input
                                id="avatar"
                                name="avatar"
                                type="file"
                                required
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="appearance-none relative block w-1/2 px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between border border-gray-300 placeholder-gray-500'>
                            <p className='self-center ml-2 '>
                                Select Cover Image
                            </p>
                            <input
                                id="coverImage"
                                name="coverImage"
                                type="file"
                                accept="image/*"
                                onChange={handleCoverImageChange}
                                className="appearance-none relative block w-1/2 px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign Up
                        </button>
                        <Spinner loading={loading} />
                    </div>
                </form>
            </div >
        </div >
    );
};

export default SignUp;

