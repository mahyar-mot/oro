// import React, {createContext, useReducer} from "react";
// import AppReducer from "./reducer";
// import {Token} from "../utils/utils";

// const getInitialState = () => {
//     return {
//         isLoggedIn: Boolean(Token()),
//         userName: null,
//         postList: [],
//     };
// }

// const store = createContext(getInitialState());


// const StateProvider = ( {children} ) => { 

//     const [state, dispatch] = useReducer( AppReducer, getInitialState());

//     return <store.Provider value={{...state, dispatch }}>{children}</store.Provider>
// };

// export { store, StateProvider };

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import auth from "./auth";
// import overseer from "./overseers";
import basicInfo from './basicInfos';



const reducer = combineReducers({
  	// here we will be adding reducers
	auth,
	
	basicInfo,
})


export default configureStore({
  	reducer,
});
