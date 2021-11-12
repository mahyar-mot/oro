import { combineReducers } from "redux"
import list from "./candidatesList"
import retrieve from "./candidatesRetrieve"
// import create from "./categoriesCreate"
import update from "./candidatesUpdate"


const candidates = combineReducers({
    list,
    retrieve,
    // create,
    update,
})


export default candidates;
