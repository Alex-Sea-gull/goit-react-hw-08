import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "https://connections-api.goit.global/";

export const goitApi = axios.create({
    baseURL: "https://connections-api.goit.global/",
});

const setAuthHeader = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (credentials, thunkApi) => {
        try {
            const { data } = await goitApi.post("/users/signup", credentials);
            const { token } = data;
            localStorage.setItem('token', token);
            setAuthHeader(data.token);
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
            const { data } = await goitApi.post("/users/login", credentials);
            const { token } = data;
            localStorage.setItem('token', token);
            setAuthHeader(data.token);
            console.log(data);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);


export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, thunkApi) => {
        try {
            await axios.post('/users/logout');
            localStorage.removeItem("token");
            delete goitApi.defaults.headers.common["Authorization"];
            return;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);


export const refreshUserThunk = createAsyncThunk(
    'auth/refresh',
    async (_, thunkApi) => {
        const token = thunkApi.getState().auth.token;
        if (token === null) {
            return thunkApi.rejectWithValue('token is not exist');
        }

        setAuthHeader(token);
        // console.log(token);

        try {
            const { data } = await goitApi.get('/users/current');
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);