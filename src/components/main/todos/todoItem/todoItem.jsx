
import React, {  useRef, useState } from "react";
import './TodoItem.scss'
import classNames from "classnames";
import { useActions } from "../../../../hooks/useActions";



const TodoItem = ({ id, title, maxValue: { current: maxValue } }) => {
    

  
    let elemRef = useRef();
    let maxVal = useRef();
    let dropElem = useRef();
    let shift = useRef();
    let deltaY = useRef({ y1: 0, y2: 0 });

    const { changeOrderTodo,removeTodo } = useActions();
   
   
    const [moved, setMoved] = useState(false);
   
    const [overElems,setOver] = useState([])
    


  
    const onTouchStart = e => {
        
        setMoved(true);
     
        const { clientY, pageY } = e.targetTouches[0]

        maxVal.current = elemRef.current.getBoundingClientRect().y - elemRef.current.offsetHeight / 5;
        

        shift.current = clientY - elemRef.current.getBoundingClientRect().top;
        
        const value = pageY - shift.current

      
        elemRef.current.style.top = `${value}px`
        deltaY.current.y1 = value;
    }
    const onTouchEnd = (e) => {
        overElems.forEach(el => el.classList.remove('item--shaked'));
        setOver([])
        setMoved(false)
       
        const dropElemId = Number(dropElem.current);
       
        if (dropElemId  && dropElemId !== id) {
            changeOrderTodo({
                ownId: id,
                dropId: dropElemId,
                delta:deltaY.current.y2-deltaY.current.y1
            })
          
        }
    }

    const onTouchMove = (e) => {
       
        const { pageY } = e.targetTouches[0]



        const value = pageY - shift.current
        
        const elem = document.elementFromPoint(elemRef.current.getBoundingClientRect().width/2,value);


        if(elem && elem.classList.contains('todo-container__item')){
            elem.classList.add('item--shaked');
            setOver(prev => [...prev,elem])
           
        }
 
        dropElem.current = elem?.id ? elem.id : elem?.tagName == 'P' ?  elem.parentElement.id : null


        if (value > maxValue) {
            deltaY.current.y2 = value;
            elemRef.current.style.top = `${value}px`
        }
    }
    

    return (
        
        <div ref={elemRef}
            id={id}
            className={classNames("todo-container__item", "item", {'item--moved': moved})} >
            <div className="item__btn-container btn-container">
                <input type="checkbox" className="btn-container__input" id={id} />
                <label onClick={e => removeTodo(title)} htmlFor={id} className="btn-container__label"></label>
            </div>
            <p className="item__task-name">{title}</p>
            <div className="item__btns-container btns-container">
                <button id="drag-task" className="btns-container__drag-task  drag-task"></button>
                <label onTouchEnd={(e) => onTouchEnd(e)} onTouchStart={e => onTouchStart(e)} onTouchMove={(e) => onTouchMove(e)} htmlFor="drag-task" className="btns-container__label-drag label-drag"><span  className="label-drag__hov"></span></label>
            </div>
        </div>
    )
}

export default TodoItem