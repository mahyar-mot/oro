import { combineReducers } from "redux"
import list from "./ticketsList"
import retrieve from "./ticketsRetrieve"
import create from "./ticketsCreate"
// import update from "./categoryUpdate"


const tickets = combineReducers({
    list,
    retrieve,
    create,
    // update,
})


export default tickets;
