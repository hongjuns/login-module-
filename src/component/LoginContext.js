import React , { useReducer, createContext, useContext, useRef, useEffect, useState } from 'react';
import { post } from 'axios';

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

  
const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null
        };
      default:
        return state;
    }
  };

const TodoStateContent = createContext();


export function TodoProvider ({children}){
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || null)
        const token = JSON.parse(localStorage.getItem('token') || null)
        console.log("user"+user);
        console.log("token"+token);
        if(user && token){
          dispatch({
            type: 'LOGIN',
            payload: {
              user,
              token
            }
          })
        }
    }, [])
    
   return (
        <TodoStateContent.Provider value ={state}>
             {children}
        </TodoStateContent.Provider>
    );
}

export function useTodoState () {
    const context = useContext(TodoStateContent);

    if (!context){
        throw new Error ('Cannot find Provider');
    }
    return context;
}

export function useTodoDispatch (){

    const context = useContext(TodoDispatchContext);
    if (!context){
        throw new Error ('Cannot find Provider');
    }
    return context;
}

export function useTodoNextId (){
    const context = useContext(TodNextIdContext);
    if (!context){
        throw new Error ('Cannot find Provider');
    }
    return context;
}
