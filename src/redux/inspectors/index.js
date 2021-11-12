import { combineReducers } from "redux"
import list from "./inspectorsList"
import retrieve from "./inspectorDetail"
import create from "./inspectorsCreate"
import update from "./inspectorUpdate"
import file from "./inspectorsFile";
// import listexport from "./inspectorExport";


const inspector = combineReducers({
    list,
    retrieve,
    create,
    update,
    file,
    // listexport
})


export default inspector;
