import React, { useEffect,  useRef } from "react";
import TodoItem from "./todoItem/todoItem";
import "./Todos.scss"
import { useSelector } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const Todos = () => {
  
    const {todos,error,isLoading} = useSelector(state => state.todos);

    const {getTodos} = useActions();
    
  
 
    
    const elemHeading = useRef();
    const maxValue = useRef();
  
   
    useEffect(() =>{
        getTodos(5)
        maxValue.current = elemHeading.current.nextElementSibling.getBoundingClientRect().top
        
    },[])
   

    return (
        <section className="todo-section">
          
            <div className="todo-container container">
                <h2 ref={elemHeading} className="todo-container__header">Задачи</h2>
                
                {
                 todos.length > 0 ?  <TransitionGroup component={'div'} className={'todo-items'} >{todos.map(({title,id}) => <CSSTransition  key={id+1} classNames={'item'} timeout={500} ><TodoItem maxValue={maxValue}  id={id} title={title} /></CSSTransition>)}</TransitionGroup>  : isLoading ? '' :<p>Добавьте задачи</p>
                }
                
                
                
            </div>
           
        </section>

    )
}

export default Todos