import { combineReducers } from "redux"
import list from "./proceedingsList"
import retrieve from "./proceedingsRetrieve"
import create from "./proceedingsCreate"
// import update from "./categoryUpdate"


const proceedings = combineReducers({
    list,
    retrieve,
    create,
    // update,
})


export default proceedings;
