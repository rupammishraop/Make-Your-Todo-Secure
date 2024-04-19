// Home.js

import React from 'react';
import {VideoPlayer}  from "../index"
const Home = () => {
    const videoUrl = "../videos/video1.mp4";
    return (
        <div className=" bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl text-black font-bold mb-4">Welcome to Community Chat!</h1>
                        <h3 className="text-2xl text-gray-700 font-bold mb-4">Make your own Community Here!</h3>
                        <p className="text-lg text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor velit quis dolor fringilla, a luctus mauris fermentum. Proin consequat libero at varius sagittis. Cras vestibulum ante eu massa scelerisque suscipit.</p>
                        <a href="/services" className="text-indigo-600 font-medium hover:text-indigo-800">Explore Our Services</a>
                    </div>
                    <div className="text-center">
                        <img className="mx-auto w-full md:max-w-lg rounded-lg shadow-lg" src="https://via.placeholder.com/600x400" alt="Welcome Image" />
                        {/* <div className='h-[400px] w-[600px] mx-auto md:max-w-lg rounded-lg shadow-lg bg-slate-50'>
                            <VideoPlayer className=' h-[400px] w-[600px]  overflow-hidden mx-auto md:max-w-lg rounded-lg ' url={videoUrl} />
                        </div>
                         */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
