import { combineReducers } from "redux"
import allViolationList from "./allViolationList"
import myViolationList from "./myViolationList"
import peopleViolationList from "./peopleViolationList"
import retrieve from "./violationRetrieve"
import create from "./violationCreate"
import peopleViolationCreate from "./peopleViolationCreate";
import peopleViolationRetrieve from "./peopleViolationRetrieve";
import inspectorViolationList from "./inspectorViolationList";
// import update from "./categoryUpdate"


const violation = combineReducers({
    allViolationList,
    myViolationList,
    peopleViolationList,
    inspectorViolationList,
    retrieve,
    create,
    peopleViolationCreate,
    peopleViolationRetrieve,
    // update,
})


export default violation;
