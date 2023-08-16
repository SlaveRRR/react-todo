import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux"
import { actions } from "../store/todos/todos.slice";
import * as asyncActions from "../store/todos/todos.actions"

const rootActions = {
    ...actions,
    ...asyncActions
}

export const useActions = () =>{
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(rootActions,dispatch) ,[dispatch])
}

