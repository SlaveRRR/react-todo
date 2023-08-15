
import React, { useCallback, useEffect, useRef, useState } from "react";
import './TodoItem.scss'
import classNames from "classnames";
import { useActions } from "../../../../hooks/useActions";
import { Transition, CSSTransition } from "react-transition-group";

const TodoItem = ({ id, text, maxValue: { current: maxValue } }) => {
    const [item, setItem] = useState(null);

    let spn = useRef();
    let elemRef = useRef();
    let maxVal = useRef();
    let dropElem = useRef();
    let shift = useRef();
    let coordsObj = useRef({ x: 0, y: 0 });
    const { changeOrderTodo } = useActions();

    const [moved, setMoved] = useState(false);
    const [over, setOver] = useState(false);
    const [removed, setRemoved] = useState(false);

    const PointerDown = (e) => {
        spn.current.classList.toggle('hov--grabbing')
        setItem(true);
    }


    const checkTask = (e) => {
        console.log('work check')
        e.target.classList.toggle('btn-container__label--checked')
    }
    const onDown = e => {
        
        setMoved(true)
        const { clientY, pageY } = e

        maxVal.current = elemRef.current.getBoundingClientRect().y - elemRef.current.offsetHeight / 5;
        shift.current = clientY - elemRef.current.getBoundingClientRect().y;
        // console.log(clientY)
        // console.log(pageY)
        // console.log(elemRef.current.getBoundingClientRect().y)
        // console.log(shift.current)
        elemRef.current.style.top = `${pageY - shift.current}px`
    }
    const onTouchEnd = (e) => {
        e.stopPropagation()
        setMoved(false)
        if (dropElem.current && dropElem.current !== elemRef.current.id) {
        
            changeOrderTodo({
                ownId: elemRef.current.id,
                dropId: dropElem.current
            })
            // changeOrderTodo(elemRef.current.id,dropElem.current)
        }
    }

    const onMove = (e) => {
        e.stopPropagation()
        const { pageY, pageX, clientY } = e



        const value = pageY - shift.current

        const elem = document.elementFromPoint(elemRef.current.getBoundingClientRect().width / 2, value);

        console.log(elem)

        dropElem.current = elem?.id ? elem.id : null
        
        if (value > maxValue) {
            console.log(maxValue)
            console.log(value)
            elemRef.current.style.top = `${value}px`
        }
    }
    const onTouchTodo = (e) => {
        const { clientY, clientX, pageY, pageX } = e.targetTouches[0]
        setMoved(true)
        coordsObj.current.y = clientY - elemRef.current.getBoundingClientRect().y;
        coordsObj.current.x = clientX - elemRef.current.getBoundingClientRect().x;
        
        const valueY = pageY - coordsObj.current.y;
        elemRef.current.style.top = `${valueY}px`

        const valueX = pageX - coordsObj.current.x;
        elemRef.current.style.left = `${valueX}px`;
    }
    const otStopTouchTodo = (e) => {
        elemRef.current.style.left = '0px'
        elemRef.current.style.top = '0px'
        setMoved(false)
    }
    const onMoveTodo = e => {

        const { pageX, pageY } = e.targetTouches[0]

        const valueX = pageX - coordsObj.current.x;
        // const valueY = pageY - coordsObj.current.y;
        if (!removed && valueX > 0) {
            console.log(valueX)
            console.log('Последнй вызов')
            elemRef.current.style.left = `${valueX}px`;
            console.log(elemRef.current.getBoundingClientRect())
            console.log(screen.width / elemRef.current.getBoundingClientRect().x)

            if (screen.width / elemRef.current.getBoundingClientRect().x <= 1.5) {
                setRemoved(true);
                setMoved(false)
                return
            }
        }
        if(valueX < 0){
            elemRef.current.style.left = `${valueX}px`;
            console.log(elemRef.current.getBoundingClientRect())
            if (screen.width / elemRef.current.getBoundingClientRect().right >= 2) {
                setRemoved(false);
                setMoved(false)
                return
            }
        }
       

    }

    return (

        <div ref={elemRef}
            onTouchStart={(e) => onTouchTodo(e)}
            onTouchEnd={(e) => otStopTouchTodo(e)}
            onTouchMove={(e) => onMoveTodo(e)}
            id={id}
            className={classNames("todo-container__item", "item", { 'moved': moved, 'removed': removed })} >
            <div className="item__btn-container btn-container">
                <input type="checkbox" className="btn-container__input" id={id} />
                <label onClick={checkTask} htmlFor={id} className="btn-container__label"></label>
            </div>
            <p className="item__task-name">{text}</p>
            <div className="item__btns-container btns-container">
                <button id="drag-task" className="btns-container__drag-task  drag-task"></button>
                <label onTouchEnd={(e) => onTouchEnd(e)} onPointerDown={e => onDown(e)} onPointerMove={(e) => onMove(e)} htmlFor="drag-task" className="btns-container__label-drag label-drag"><span ref={spn} onPointerDown={PointerDown} className="label-drag__hov"></span></label>
                <button id="remove-task" className="btns-container__remove-task remove-task"></button>
                <label htmlFor="remove-task" className="btns-container__label-remove label-remove"></label>
            </div>
        </div>
    )
}

export default TodoItem