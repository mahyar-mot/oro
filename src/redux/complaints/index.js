import { combineReducers } from "redux"
import userList from "./userComplaintsList"
import retrieve from "./userComplaintRetrieve"
import create from "./userComplaintCreate"
import attachments from "./attachments"
import comments from "./comments"
// import update from "./categoryUpdate"


const complaints = combineReducers({
    userList,
    retrieve,
    create,
    attachments,
    comments,
    // update,
})


export default complaints;
