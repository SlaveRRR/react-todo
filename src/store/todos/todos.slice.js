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
        removeTodo(state,{payload:title}){
            state.todos = state.todos.filter(v => v.title !== title);
          
            
        },
        changeOrderTodo(state,{payload:{ownId,dropId,delta}}){
           
            let dropElem = state.todos.find(e => e.id === dropId);
            let ownElem = state.todos.find(e => e.id === ownId);
            let filtered = state.todos.filter(elem => elem.id != ownElem.id);
           console.log(filtered)
            delta > 0 ? filtered.splice(filtered.indexOf(dropElem),1,...[dropElem,ownElem]) : filtered.splice(filtered.indexOf(dropElem),1,...[ownElem,dropElem])
           
            state.todos = filtered
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


