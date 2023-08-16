import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk('getTodos', async (count, thunkApi) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if(response.status == 500){
            throw new Error('Ошибка сервера!')
        }
        const todos = await response.json();
        return todos.slice(0,count)
    } catch (error) {
        thunkApi.rejectWithValue(error);
    }

})