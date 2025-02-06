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
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        })

            .addCase(loginThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })

            .addCase(logoutThunk.fulfilled, () => {
                return initialState;
            })

            .addCase(refreshUserThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })

            .addCase(refreshUserThunk.pending, state => {
                state.isRefreshing = true;
            })

            .addCase(refreshUserThunk.rejected, () => initialState)

            .addCase(updateContactThunk.fulfilled, (state, action) => {
                state.contacts.items = state.contacts.items.map(item =>
                    item.id === action.payload.id
                        ? {
                            ...item,
                            name: action.payload.name,
                            number: action.payload.number,
                        }
                        : item
                );
            })
    },

});

export const authReducer = slice.reducer;
