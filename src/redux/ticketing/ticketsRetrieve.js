import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { TICKETS_DETAIL } from "../../utils/constants";


// Slice

const initialState = {
    ticket: {},
    isLoading: false,
    error: false,
};


const ticketRetrieveSlice = createSlice({
    name: "ticketDetail",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setTicket: (state, action) => {
            state.ticket = action.payload;
            state.isLoading = false
        },
        clearTicket: (state) =>{
            state.ticket = {}
            state.isLoading = false
            state.error = undefined
        }
    },
});


export default ticketRetrieveSlice.reducer;


// Actions


const { startLoading, hasError, setTicket } = ticketRetrieveSlice.actions;
export const { clearTicket } = ticketRetrieveSlice.actions;


export const getTicket = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(TICKETS_DETAIL(id))
            .then( response => {
                    dispatch(setTicket(response.data.data))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}

