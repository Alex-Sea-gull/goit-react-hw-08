import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (credentials, thunkApi) => {
        try {
            const { data } = await axios.post("/users/signup", credentials);
            const { token } = data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log(data);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);


export const loginThunk = createAsyncThunk(
    "auth/login",
    async (credentials, thunkApi) => {
        try {
            const { data } = await axios.post("/users/login", credentials);
            const { token } = data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log(data);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);