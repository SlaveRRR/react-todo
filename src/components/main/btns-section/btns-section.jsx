import React, {  useState } from "react"
import { useSelector } from "react-redux"
import './Btns-section.scss'
import { useActions } from "../../../hooks/useActions";
import ctx from "../../../context";
import { useContext } from "react";
const Btns = () => {
  const [text, setText] = useState('');
  const { todos } = useSelector(state => state.todos)
  const {setOpenedSnackBar,setErrSnackBar,setMessageSnackBar} = useContext(ctx);

  const snackBarError = () =>{
    setOpenedSnackBar(true)
    setErrSnackBar(true);
    setMessageSnackBar('Please,wrtite text');
    setTimeout(() =>{
      setOpenedSnackBar(false)
    },1500)
  }
  const { addTodo } = useActions()
  
  const handleClick = () => {
    if (text) {
      const lastElem = [...todos].sort((a, b) => b.id - a.id)[0];
      console.log(lastElem)
      const id = lastElem?.id ?? 0
      addTodo({ title: text, id: id+1 })
      return setText('')
    }
    snackBarError()

  }

  return (
    <section className='btns-section'>
      <div className="container">
        <div className="container-input">
          <input onKeyDown={e => e.key == 'Enter' ? handleClick() : ''} onChange={e => setText(e.target.value)} placeholder="Some task.." value={text} type="text" id='todo-task' className='container-input__todo-task' />
          <button onClick={() => handleClick()} className='container-input__add-todo' type="button">Add</button>
        </div>
      </div>
    </section>
  )
}

export default Btns