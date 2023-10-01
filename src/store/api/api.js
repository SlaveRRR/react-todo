import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const rootPath = 'https://jsonplaceholder.typicode.com/todos';
export const api = createApi({
    reducerPath:'api',
    tagTypes:['Todos'],
    baseQuery:fetchBaseQuery({
        baseUrl:rootPath
    }),
    endpoints:builder => ({
        getTodos:builder.query({
            query:() => '/'
        }),
    })


})

export const {useGetTodosQuery} = api