// AuthPage.js

import React, { useState } from 'react';
import Login from './LoginPage';
import SignUp from './SignUp';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleToLogin = () => {
        setIsLogin(true);
    };

    const toggleToSignUp = () => {
        setIsLogin(false);
    };

    return (
        <div className=" min-h-screen bg-gray-50 flex flex-col mt-2 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome!</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={isLogin ? toggleToSignUp : toggleToLogin} className="font-medium text-indigo-600 hover:text-indigo-500">
                            {isLogin ? "Sign up" : "Log in"}
                        </button>
                    </p>
                </div>
            </div>

            {isLogin ? <Login /> : <SignUp />}
        </div>
    );
};

export default AuthPage;
