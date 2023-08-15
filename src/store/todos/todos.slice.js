import { createSlice } from "@reduxjs/toolkit"




const todoSlice = createSlice({
    name:"todos",
    initialState:[],
    reducers:{
        addTodo(state,{payload:text}){
            console.log('work',text)
            state.push(text)
            
        },
        removeTodo(state,action){
            state.todos.splice(state.todos.findIndex(e => e['id'] == action.payload.id),1)
        },
        changeOrderTodo(state,{payload:{ownId,dropId = -1}}){
            console.log(ownId,dropId)
            let filtered = state.filter(elem => elem != state[ownId])
            return  [...filtered.slice(0,dropId),state[ownId],...filtered.slice(dropId)]
            
        }
    }
})

export const {actions} = todoSlice;

export default todoSlice.reducer


