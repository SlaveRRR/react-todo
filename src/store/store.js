import {combineReducers, configureStore} from '@reduxjs/toolkit'
import todoReducer from './todos/todos.slice'
import { api } from './api/api'



const rootReducer = combineReducers({
    todos:todoReducer,
    [api.reducerPath]:api.reducer
})

export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
    
})

