import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import { localLogout } from '../store/authAction';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import Cookies from 'js-cookie';
import { getCurrentUser } from '../functions/getCurrentUser';
import { showPopUP } from "../store/userSlice"
import { useNavigate } from 'react-router-dom';
import { TodoForm } from './TodoForm';
import { AddTodo } from "../index"
import { TodoItems } from "../index.js"


const UserDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [addTodoPopup, setaddTodoPopup] = useState(false)


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [userData, setUserData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const getUserData = async () => {

        try {
            const data = await getCurrentUser();
            setUserData(data)
            console.log("data", data)

        } catch (error) {
            console.log("Error getting user data", error)

        }
    }

    useEffect(() => {
        getUserData();
    }, [])


    

    return (
        <div className="flex    bg-gray-100">
            {/* Menu Bar (for mobile) */}
            

            {/* Sidebar */}
        

            {/* Main Content */}
            <div className=" w-full flex-1 overflow-hidden">
                <div className="p-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className='w-full relative '>
                                <img src={userData?.coverImage} alt="Cover" className="w-full h-40 object-cover mb-4 rounded-lg shadow-md relative top-4" />

                                <img src={userData?.avatar} alt="Profile" className="w-20 rounded-full absolute bottom-1" />
                            </div>


                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">{userData?.fullName}</h2>
                            <p className="text-gray-600">@{userData?.username}</p>
                        </div>

                        <div className="flex items-center text-gray-600 mb-2">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            <p>Joined {userData?.createdAt}</p>
                        </div>
                        <div>
                            {addTodoPopup ? <AddTodo popUp={addTodoPopup} setPop={setaddTodoPopup} /> : null}

                            <button
                                onClick={() => setaddTodoPopup(true)}

                                className=' p-3  rounded text-white hover:bg-blue-500 bg-slate-600'>Add Todo</button>
                        </div>

                    </div>

                    <div className=' flex justify-center' >
                        <TodoItems todos={userData.todos} />
                    </div>
                </div>
            </div>

            {/* /// Introduce Todo */}


        </div>
    );
};

export default UserDashboard;
