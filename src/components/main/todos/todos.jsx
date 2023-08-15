import React, { useEffect, useMemo, useRef, useState } from "react";
import TodoItem from "./todoItem/todoItem";
import "./Todos.scss"
import { useSelector } from "react-redux";
const Todos = () => {
    // const changeOrder = (ownId, dropId) => {
    //     setTodos(prev => {
    //         let filtered = prev.filter(elem => elem != prev[ownId])
    //         return [...filtered.slice(0,dropId),prev[ownId],...filtered.slice(dropId)]
    //     })

    // }
    const {todos} = useSelector(state => state);

    const elemHeading = useRef();
    const maxValue = useRef();
  
   
    useEffect(() =>{
        maxValue.current = elemHeading.current.nextElementSibling.getBoundingClientRect().top - 10
        console.log(maxValue)
    },[])
   

    return (
        <section className="todo-section">
            <div className="todo-container container">
                <h2 ref={elemHeading} className="todo-container__header">Задачи</h2>
                
                {
                todos.length > 0 ? todos.map((e, i) => <TodoItem maxValue={maxValue}   key={i + 1} id={i} text={e} />) : <p>Добавьте задачи</p>
                }
                
                
                
            </div>
        </section>

    )
}

export default Todos