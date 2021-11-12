import { combineReducers } from "redux"
import list from "./contentsList"
import retrieve from "./contentsRetrieve"
import create from "./contentsCreate"
import update from "./contentsUpdate"


const content = combineReducers({
    list,
    retrieve,
    create,
    update,
})


export default content;
