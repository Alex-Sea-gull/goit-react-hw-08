import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearContacts } from "../contacts/slice";
import { fetchDataThunk } from "../contacts/operations";

// axios.defaults.baseURL = "https://connections-api.goit.global/";

export const goitApi = axios.create({
    baseURL: "https://connections-api.goit.global/",
});

const setAuthHeader = token => {
    goitApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
            thunkApi.dispatch(fetchDataThunk());
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
            await goitApi.post('/users/logout');
            localStorage.removeItem("token");
            delete goitApi.defaults.headers.common["Authorization"];
            thunkApi.dispatch(clearContacts());
            localStorage.removeItem("token");
            return;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);


export const refreshUserThunk = createAsyncThunk(
    'auth/refresh',
    async (_, thunkApi) => {
        let token = thunkApi.getState().auth.token;
        if (!token) {
            token = localStorage.getItem("token");
        }

        if (!token) {
            return thunkApi.rejectWithValue("Token не найден");
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