// Footer.js

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center space-x-4">
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <img src="/linkedin-logo.png" alt="LinkedIn" className="h-6 w-6 text-gray-300 hover:text-gray-400" />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <img src="/instagram-logo.png" alt="Instagram" className="h-6 w-6 text-gray-300 hover:text-gray-400" />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <img src="/twitter-logo.png" alt="Twitter" className="h-6 w-6 text-gray-300 hover:text-gray-400" />
                    </a>
                </div>
                <p className="mt-2 text-center text-gray-300">&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
