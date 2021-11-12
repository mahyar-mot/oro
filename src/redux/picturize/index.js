import { combineReducers } from "redux"
import picturesList from "./picturesList"
import picturizeSlider from "./picturizeSlider"
// import retrieve from "./overseerDetail"
// import create from "./overseersCreate"
// import update from "./overseerUpdate"
// import listexport from "./overseerExport";


const overseer = combineReducers({
    picturesList,
    picturizeSlider,
    // retrieve,
    // create,
    // update,
    // listexport
})


export default overseer;
