import { combineReducers } from "redux"
import overseer from "./overseer"
import overseerReport from "./overseerReport"
import contents from "./content"
import violation from "./violation"
import inspectorReport from "./inspectorReport";
import excelExports from "./excelExports";
// import retrieve from "./contentsRetrieve"
// import create from "./contentsCreate"
// import update from "./contentsUpdate"


const content = combineReducers({
    overseer,
    overseerReport,
    contents,
    violation,
    inspectorReport,
    excelExports,
    // retrieve,
    // create,
    // update,
})


export default content;
