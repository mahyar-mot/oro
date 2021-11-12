import { combineReducers } from "redux";
import list from "./headOverseersList";
import retrieve from "./headOverseerDetail"
import create from "./headOverseerCreate";
// import update from "./branchesUpdate"
// import listexport from "./overseerExport";


const headOverseer = combineReducers({
    list,
    retrieve,
    create,
    // update,
    // listexport
})


export default headOverseer;
