import { combineReducers } from "redux"
import list from "./listComplaintList"
import retrieve from "./listComplaintDetail"
// import create from "./userComplaintCreate"
// import update from "./categoryUpdate"


const listComplaints = combineReducers({
    list,
    retrieve,
    // create,
    // update,
})


export default listComplaints;
