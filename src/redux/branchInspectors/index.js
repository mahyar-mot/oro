import { combineReducers } from "redux";
import list from "./branchInspectorsList";
import retrieve from "./branchInspectorsDetail"
import create from "./branchInspectorCreate";
// import update from "./branchesUpdate"
// import listexport from "./overseerExport";


const branchInspector = combineReducers({
    list,
    retrieve,
    create,
    // update,
    // listexport
})


export default branchInspector;
