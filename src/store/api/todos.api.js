import { api } from "./api";

export const todosApi = api.injectEndpoints({
    endpoints:builder => ({
        getTodos:builder.query({
            query:() => '/'
        }),

        createTodos: builder.mutation({
            query: todo => ({
                body:todo,
                url:"/",
                method:"POST"
            })
        })
    })
})