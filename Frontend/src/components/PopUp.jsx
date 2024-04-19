// Popup.js
import React, { useEffect } from 'react';

const Popup = ({ message }) => {

    return (
        <>

            <div className="fixed bottom-3 right-0 m-4 p-4 bg-gray-800 text-white rounded-lg animate-fade-in" >
                <p>{message}</p>
            </div>

        </>
    );
};

export default Popup;
