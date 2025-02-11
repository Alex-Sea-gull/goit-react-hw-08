import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, refreshUserThunk, registerThunk } from "./operations";
import { updateContactThunk } from "../contacts/operations";


const initialState = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
};

const slice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerThunk.pending, (state, action) => {
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })



            .addCase(loginThunk.pending, (state, action) => {
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })



            .addCase(logoutThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(logoutThunk.fulfilled, () => {
                return initialState;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })



            .addCase(refreshUserThunk.pending, state => {
                state.isRefreshing = true;
            })
            .addCase(refreshUserThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshUserThunk.rejected, (state, action) => {
                state.user = null;
                state.isLoggedIn = false;
                state.isRefreshing = false;
            });

    },

});

export const authReducer = slice.reducer;
