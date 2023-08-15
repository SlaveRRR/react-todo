import {combineReducers, configureStore} from '@reduxjs/toolkit'
import todoReducer from './todos/todos.slice'


const rootReducer = combineReducers({
    todos:todoReducer
})

export const store = configureStore({
    reducer:rootReducer
})

