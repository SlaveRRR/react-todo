
import './App.scss'
import Main from './components/main/main'
import { Transition,CSSTransition } from 'react-transition-group'
import {UiSnackBar,UiLoader} from './components/UI/index';
import ctx from './context';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const App = () =>{
  const [isOpenedSnackBar,setOpenedSnackBar] = useState(false);

  const [isErrSnackBar,setErrSnackBar] = useState(false);
  const [messageSnackBar,setMessageSnackBar] = useState('');
  const {isLoading} = useSelector(state => state.todos)
  return (
    <>
    <ctx.Provider value={{setOpenedSnackBar,setErrSnackBar,setMessageSnackBar}}>
    <Main/>
      <div className="ui-container">
        <Transition
        in={isOpenedSnackBar}
        timeout={500}
        >
            {state => <UiSnackBar mixClass={[state]}  err={isErrSnackBar} message={messageSnackBar} />}
        </Transition>
        <CSSTransition
        
        in={isLoading} classNames={"loader"} timeout={500}
        unmountOnExit
        >
        <UiLoader/>
        </CSSTransition>
       
       
      </div>
    </ctx.Provider>
     
    </>
   
  )
}

export default App
