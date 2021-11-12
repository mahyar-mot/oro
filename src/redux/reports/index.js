import { combineReducers } from "redux"
import list from "./reportsList"
// import retrieve from "./categoryRetrieve"
// import create from "./categoriesCreate"
// import update from "./categoryUpdate"


const reports = combineReducers({
    list,
    // retrieve,
    // create,
    // update,
})


export default reports;
