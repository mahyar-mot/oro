import { combineReducers } from "redux"
import list from "./branchesList"
import retrieve from "./branchDetail"
import create from "./branchesCreate"
import update from "./branchesUpdate"
import file from "./branchExport";


const branch = combineReducers({
    list,
    retrieve,
    create,
    update,
    file
})


export default branch;
