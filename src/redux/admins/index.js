import { combineReducers } from "redux"
import list from "./adminsList"
import retrieve from "./adminRetrieve"
import create from "./adminsCreate"
import file from "./adminsExport"
// import update from "./categoryUpdate"


const candidates = combineReducers({
    list,
    retrieve,
    create,
    file
    // update,
})


export default candidates;
