import { createSlice } from "@reduxjs/toolkit"
import { getTodos } from "./todos.actions"




const todoSlice = createSlice({
    name:"todos",
    initialState:{
        todos:[],
        isLoading:false,
        error:false
    },
    reducers:{
        addTodo(state,{payload:todo}){
           
            state.todos.push(todo)
            
        },
        removeTodo(state,action){
            state.todos.splice(state.todos.findIndex(e => e['id'] == action.payload.id),1)
        },
        changeOrderTodo(state,{payload:{ownId,dropId,delta}}){
            console.log(state.todos[ownId].id,state.todos[dropId].id)
            let filtered = state.todos.filter(elem => elem.id != state.todos[ownId].id);
           
            delta > 0 ? filtered.splice(filtered.findIndex(e => e.id === state.todos[dropId].id),1,...[state.todos[dropId],state.todos[ownId]]) : filtered.splice(filtered.findIndex(e => e.id === state.todos[dropId].id),1,...[state.todos[ownId],state.todos[dropId]])
           
            state.todos = filtered
        //     console.log(filtered)
        //     // console.log(ownId,dropId)
        //    console.log(filtered.splice(dropId,1,{id:'xui'},{id:'lole'}))
        //     // // state.todos =  [...filtered.slice(0,dropId),state.todos[ownId],...filtered.slice(dropId)]
        //     // console.log(filtered)
        //     // delta > 0 ? filtered.splice(dropId,1,...[state.todos[dropId],state.todos[ownId]]) : filtered.splice(dropId,1,...[state.todos[ownId],state.todos[dropId]])
        //     console.log(filtered)
        //     for(let i of filtered){
        //         console.log(i['id'])
        //     }
            // state.todos = filtered;
        }
    },
    extraReducers: builder =>{
        builder
        .addCase(getTodos.pending,state =>{
            state.isLoading = true;
        })
        .addCase(getTodos.fulfilled,(state,{payload}) =>{
            state.isLoading = false;
            state.todos = payload;
            console.log(state.todos)
        })
        .addCase(getTodos.rejected,(state,{payload}) =>{
            state.isLoading = true;
            state.error = payload;
        })
       
    }
})

export const {actions} = todoSlice;

export default todoSlice.reducer


