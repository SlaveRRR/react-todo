import React from "react"
import Btns from "./btns-section/btns-section"
import Todos from "./todos/todos"

const Main = () =>{
    return (
<main className='main'>
        <h1 style={{
            margin:'0 auto',
            fontSize:'1.2rem',
            width:'max-content',
            padding:'.3em'
        }}>Draggable todo-list, touch and move</h1>
      <Btns/>
      <Todos/>
      
    </main>
    )
}

export default Main
