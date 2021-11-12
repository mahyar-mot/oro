import { combineReducers } from "redux"
import list from "./cartsList"
import printList from "./print"
// import retrieve from "./overseerDetail"
// import create from "./overseersCreate"
// import update from "./overseerUpdate"
// import listexport from "./overseerExport";


const overseer = combineReducers({
    list,
    printList,
    // retrieve,
    // create,
    // update,
    // listexport
})


export default overseer;
