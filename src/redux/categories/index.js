import { combineReducers } from "redux"
import list from "./categoriesList"
import retrieve from "./categoryRetrieve"
import create from "./categoriesCreate"
import update from "./categoryUpdate"


const category = combineReducers({
    list,
    retrieve,
    create,
    update,
})


export default category;
