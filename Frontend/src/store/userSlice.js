import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: JSON.parse(localStorage.getItem('userData')) || {},
    PopVisible: {
        isOpened: false,
        message: ""
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.userData;
        },
        logout: (state, action) => {
            state.userData = null;
        },
        showPopUP: (state, action) => {
            state.PopVisible.isOpened = true;
            state.PopVisible.message = action.payload.message;
            console.log("i am in showPopUP")
        },
        closePopUP: (state, action) => {
            state.PopVisible.isOpened = false;
            state.PopVisible.message = "";
        }
    }
});

export const { login, logout, closePopUP, showPopUP } = userSlice.actions
export const userReducer = userSlice.reducer;