import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const fetchDataThunk = createAsyncThunk(
    "contacts/fetchData",
    async (_, thunkApi) => {
        try {
            const { data } = await axios.get("/contacts");
            console.log("Данні API:", data);
            return data;
        } catch (error) {
            console.error("Помилка при запиті:", error.message);
            return thunkApi.rejectWithValue(error.message);
        }
    }
);


export const deleteContactThunk = createAsyncThunk(
    "contacts/deleteContact",
    async (id, thunkApi) => {
        try {
            const { data } = await axios.delete(`/contacts/${id}`);
            return data;
        } catch (error) {
            console.error("Помилка при видаленні контакту:", error.message);
            return thunkApi.rejectWithValue(error.message);
        }
    }
);


export const addContactThunk = createAsyncThunk(
    "contacts/addContact",
    async (body, thunkApi) => {
        try {
            const { data } = await axios.post("/contacts", body);
            return data;
        } catch (error) {
            console.error("Помилка при додаванні контакту:", error.message);
            return thunkApi.rejectWithValue(error.message);
        }
    }
);


export const updateContactThunk = createAsyncThunk(
    "contacts/updateContact",
    async ({ id, body }, thunkApi) => {
        try {
            const { data } = await axios.patch(`/contacts/${id}`, body);
            return data;
        } catch (error) {
            console.error("Помилка при оновленні контакту:", error.message);
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
