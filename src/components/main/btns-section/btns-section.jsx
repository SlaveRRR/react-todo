import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './Btns-section.scss'
import { useActions } from "../../../hooks/useActions";
 const Btns = () => {
 const [text,setText] = useState('');
 const {todos} = useSelector(state => state.todos)
  
  const modalRef = useRef()
  const openModal = (e) =>{
    modalRef.current.classList.toggle('modal--opened')
  }
  const {addTodo} = useActions()
  const checkInput = (e) =>{
    console.log(e.target.value)
  }
  const getInput = (e) =>{
    console.log('wokr')
  }
  const handleClick = (e) =>{
    if(e.target == modalRef.current){
      modalRef.current.classList.toggle('modal--opened')
    }
  }
  
    return (
        <section className='btns-section'>
          <div className="container">
          {/* <div ref={modalRef} className="modal" onClick={handleClick}>
            <div className="modal-container">
            <label  htmlFor="todo-add" >Добавить задачу</label>
         <input onChange={e => setText(e.target.value)} type="text" id='todo-add' value={text} />
         <input onClick={() => addTodo({
          payload:text
         })} type="button" id='todo-add' />
            </div>

          </div> */}
      <div className="container-input">
        <label  htmlFor="todo-task" className='visuallyhidden'>Поиск задачи</label>
        <input onChange={e => setText(e.target.value)} value={text} type="text" id='todo-task' className='container-input__todo-task' />
        <label  className="container-input__todo-add-btn" htmlFor="todo-add-task"></label>
        <input onClick={() =>{
          addTodo({title:text,id:todos+10});
          setText('')
        }}  type="button" id='todo-add-task' className='container-input__todo-btn' />
     </div>
          </div>
      </section>
    )
}

export default Btns