
import React, { useRef, useState } from "react";
import './TodoItem.scss'
import classNames from "classnames";
import { useActions } from "../../../../hooks/useActions";



const TodoItem = ({ id, title, maxValue: { current: maxValue } }) => {



    let elemRef = useRef();
    let dropElem = useRef();
    let shift = useRef();
    let deltaY = useRef({ y1: 0, y2: 0 });

    const { changeOrderTodo, removeTodo } = useActions();


    const [moved, setMoved] = useState(false);

    const [lastOverId, setLastOverId] = useState(0);




    const onTouchStart = e => {

        setMoved(true);

        const { clientY, pageY } = e.targetTouches[0]

       
        shift.current = clientY - elemRef.current.getBoundingClientRect().top;

        const value = pageY - shift.current


        elemRef.current.style.top = `${value}px`
        deltaY.current.y1 = value;
    }
    const onTouchEnd = (e) => {
        document.querySelectorAll('.todo-container__item').forEach(v => {
            v.classList.remove('item--up');
            v.classList.remove('item--down');
        })
        setMoved(false)

        const dropElemId = Number(dropElem.current) || lastOverId;


        if (dropElemId && dropElemId !== id) {
            changeOrderTodo({
                ownId: id,
                dropId: dropElemId,
                delta: deltaY.current.y2 - deltaY.current.y1
            })
            setLastOverId(id)

        }
    }
    const prevSiblings = elem => {
      
        if(!elem){
            return
        }
        if( Number(elem.id) !== id){
            elem.classList.remove('item--down')
            elem.classList.add('item--up')
        }
        elem?.previousElementSibling && prevSiblings(elem.previousElementSibling)
        
        

    }
    const nextSiblings = elem => {
        if(!elem){
            return
        }
        if( Number(elem.id) !== id){
            elem.classList.remove('item--up')
            elem.classList.add('item--down')
        }
        elem?.nextElementSibling && nextSiblings(elem.nextElementSibling)

    }

    const onTouchMove = (e) => {

        const { pageY } = e.targetTouches[0]



        const value = pageY - shift.current

        const elem = document.elementFromPoint(elemRef.current.getBoundingClientRect().width / 2, value);


        if (elem && elem.classList.contains('todo-container__item')) {
            console.log(deltaY.current.y2 - deltaY.current.y1)
            if (deltaY.current.y2 - deltaY.current.y1 > 0) {
                elem.classList.remove('item--down');
                elem.classList.add('item--up');
            }
            else {
                elem.classList.remove('item--up');
                elem.classList.add('item--down');
            }
            prevSiblings(elem?.previousElementSibling)
            nextSiblings(elem?.nextElementSibling)
            setLastOverId(Number(elem.id))
        
        }

        dropElem.current = elem?.id ? elem.id : elem?.tagName == 'P' ? elem.parentElement.id : null


        if (value > maxValue) {
            deltaY.current.y2 = value;
            elemRef.current.style.top = `${value}px`
        }
    }


    return (

        <div ref={elemRef}
            id={id}
            className={classNames("todo-container__item", "item", { 'item--moved': moved })} >
            <div className="item__btn-container btn-container">
                <input type="checkbox" className="btn-container__input" id={id} />
                <label onClick={e => removeTodo(title)} htmlFor={id} className="btn-container__label"></label>
            </div>
            <p className="item__task-name">{title}</p>
            <div className="item__btns-container btns-container">
                <button id="drag-task" className="btns-container__drag-task  drag-task"></button>
                <label onTouchEnd={(e) => onTouchEnd(e)} onTouchStart={e => onTouchStart(e)} onTouchMove={(e) => onTouchMove(e)} htmlFor="drag-task" className="btns-container__label-drag label-drag"><span className="label-drag__hov"></span></label>
            </div>
        </div>
    )
}

export default TodoItem