import React, { useEffect, useMemo, useRef, useState } from "react";
import TodoItem from "./todoItem/todoItem";
import "./Todos.scss"
import { useSelector } from "react-redux";
import { useActions } from "../../../hooks/useActions";
const Todos = () => {
  
    const {todos,isLoading,error} = useSelector(state => state.todos);

    const {getTodos} = useActions();
    
 
    
    const elemHeading = useRef();
    const maxValue = useRef();
  
   
    useEffect(() =>{
        console.log(getTodos(5))
        maxValue.current = elemHeading.current.nextElementSibling.getBoundingClientRect().top - 10
        console.log(maxValue)
    },[])
   

    return (
        <section className="todo-section">
            <div className="todo-container container">
                <h2 ref={elemHeading} className="todo-container__header">Задачи</h2>
                
                {
                isLoading ? <h1>Загрузка...</h1> :  todos.length > 0 ? todos.map(({title},i) => <TodoItem maxValue={maxValue}   key={i+1} id={i} title={title} />) : <p>Добавьте задачи</p>
                }
                
                
                
            </div>
        </section>

    )
}

export default Todos