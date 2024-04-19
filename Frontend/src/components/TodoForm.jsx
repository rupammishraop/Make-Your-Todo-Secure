import React from 'react'
import { useState } from 'react'
import axios from "axios"
import Cookies from "js-cookie"
import Spinner from './Spinner'

export const TodoForm = () => {

    const [input, setInput] = useState("")
    const [loader, setLoader] = useState(false);

    const handleAddBtn = async () => {
        setLoader(true)
        const accessToken = Cookies.get("accessToken")
        let todoInfo = {
            accessToken,
            todoId: Date.now(),
            todoMessage: input
        }
        if (input === "") {
            alert("Empty todo not allowed")
        } else {
            try {
                const response = await axios.post("http://localhost:8000/api/v1/users/add-todo", todoInfo)
                console.log("response form add todo ", response)
                if(response){
                    setLoader(false)
                }
                window.location.href = 'http://localhost:5173/user';
            } catch (error) {
                console.log(" Error in adding the todo", error);
                setLoader(false)
            }
        }
        setInput('')
    }

    return (
        <div className='border w-full my-7 bg-gray-100  rounded '>
            <div className='w-full md:w-full border-cyan-100 flex flex-wrap justify-center p-2 '>
                <input
                    className='w-full md:w-full outline-none rounded p-4 text-black text-2xl shadow bg-transparent'
                    type="text"
                    spellCheck="false"
                    placeholder='Enter todo'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className='w-full  md:w-1/2 mt-2 h-10 md:mt-0 bg-blue-700 hover:bg-blue-300 mx-0 md:mx-5 text-white hover:text-black border-yellow '
                    onClick={handleAddBtn}
                >
                    Add
                </button>
            </div>
            <Spinner loading={loader}></Spinner>
        </div>

    )
}

