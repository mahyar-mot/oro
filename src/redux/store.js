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
import overseer from "./overseers";
import countries from './countries';
import newUser from './newUser';
import basicInfo from './basicInfos';
import pages from "./pages/menu";
import uploadFile from "./uploadFile";
import category from "./categories";
import content from "./contents";
import complaint from "./complaints";
import listComplaint from "./listComplaint";
import candidate from "./candidates";
import reports from "./reports";
import admin from "./admins";
import violation from "./violation";
import monitoring from "./monitoring";
import blockedUsers from "./blockedUsers";
import tickets from "./ticketing";
import downloadFiles from "./downloadFiles"
import inspector from "./inspectors";
import branch from "./branches";
import headOverseer from "./headOverseers";
import carts from "./carts";
import picturize from "./picturize";
import branchInspector from "./branchInspectors";
import proceedings from "./proceedings";


const reducer = combineReducers({
  	// here we will be adding reducers
	auth,
	overseer,
	countries,
	newUser,
	basicInfo,
	pages,
	uploadFile,
	category,
	content,
	complaint,
	listComplaint,
	candidate,
	reports,
	admin,
	violation,
	monitoring,
	blockedUsers,
	tickets,
	downloadFiles,
	inspector,
	branch,
	headOverseer,
	carts,
	picturize,
	branchInspector,
	proceedings,
})


export default configureStore({
  	reducer,
});
