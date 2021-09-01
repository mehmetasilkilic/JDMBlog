/* call this from Login.jsx */

import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

/* it determines if there is a login or not */
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

/* to reach initial state for users (steps in Action.js and 
    to dispatch them update the state use Reducer.js ) */
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  /* whenever this state and user changes fire this */
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  /* use this in index.js */
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};