import { combineReducers } from "redux"
import list from "./overseersList"
import retrieve from "./overseerDetail"
import create from "./overseersCreate"
import update from "./overseerUpdate"
import listexport from "./overseerExport";


const overseer = combineReducers({
    list,
    retrieve,
    create,
    update,
    listexport
})


export default overseer;
