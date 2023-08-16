
import React, { useCallback, useEffect, useRef, useState } from "react";
import './TodoItem.scss'
import classNames from "classnames";
import { useActions } from "../../../../hooks/useActions";
import { Transition, CSSTransition } from "react-transition-group";

const TodoItem = ({ id, title, maxValue: { current: maxValue } }) => {
    const [item, setItem] = useState(null);

    let spn = useRef();
    let elemRef = useRef();
    let maxVal = useRef();
    let dropElem = useRef();
    let shift = useRef();
    let deltaY = useRef({ y1: 0, y2: 0 });
    const { changeOrderTodo } = useActions();

    const [moved, setMoved] = useState(false);
    const [over, setOver] = useState(false);
    const [removed, setRemoved] = useState(false);

    const PointerDown = (e) => {
        spn.current.classList.toggle('hov--grabbing')
        setItem(true);
    }


    const checkTask = (e) => {
        setRemoved(!removed)
        e.target.classList.toggle('btn-container__label--checked')
    }
    const onTouchStart = e => {
        
        setMoved(true)
        const { clientY, pageY } = e.targetTouches[0]

        maxVal.current = elemRef.current.getBoundingClientRect().y - elemRef.current.offsetHeight / 5;
        shift.current = clientY - elemRef.current.getBoundingClientRect().y;

        const value = pageY - shift.current
        // console.log(clientY)
        // console.log(pageY)
        // console.log(elemRef.current.getBoundingClientRect().y)
        // console.log(shift.current)
        elemRef.current.style.top = `${value}px`
        deltaY.current.y1 = value;
    }
    const onTouchEnd = (e) => {
        
        setMoved(false)
        const dropElemId = Number(dropElem.current)
        if (dropElemId  && dropElemId !== id) {
            changeOrderTodo({
                ownId: id,
                dropId: dropElemId,
                delta:deltaY.current.y2-deltaY.current.y1
            })
            // changeOrderTodo(elemRef.current.id,dropElem.current)
        }
    }

    const onTouchMove = (e) => {
       
        const { pageY, pageX, clientY } = e.targetTouches[0]



        const value = pageY - shift.current
        
        const elem = document.elementFromPoint(elemRef.current.getBoundingClientRect().width/2,value)

        console.log(elem)
        dropElem.current = elem?.id ? elem.id : null
        

        if (value > maxValue) {
            deltaY.current.y2 = value;
            elemRef.current.style.top = `${value}px`
        }
    }
  

    return (

        <div ref={elemRef}
            id={id}
            className={classNames("todo-container__item", "item", { 'moved': moved, 'removed': removed })} >
            <div className="item__btn-container btn-container">
                <input type="checkbox" className="btn-container__input" id={id} />
                <label onClick={e => checkTask(e)} htmlFor={id} className="btn-container__label"></label>
            </div>
            <p className="item__task-name">{title}</p>
            <div className="item__btns-container btns-container">
                <button id="drag-task" className="btns-container__drag-task  drag-task"></button>
                <label onTouchEnd={(e) => onTouchEnd(e)} onTouchStart={e => onTouchStart(e)} onTouchMove={(e) => onTouchMove(e)} htmlFor="drag-task" className="btns-container__label-drag label-drag"><span ref={spn} onPointerDown={PointerDown} className="label-drag__hov"></span></label>
                <button id="remove-task" className="btns-container__remove-task remove-task"></button>
                <label htmlFor="remove-task" className="btns-container__label-remove label-remove"></label>
            </div>
        </div>
    )
}

export default TodoItem