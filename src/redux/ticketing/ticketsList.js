import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { TICKETS_LIST, MYTICKETS_LIST } from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    ticketsList: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
};


const ticketsListSlice = createSlice({
    name: "ticketsList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setList: (state, action) => {
            state.ticketsList = action.payload;
            state.isLoading = false
        },
        clearTicketsList: (state) => {
            state.ticketsList = []
            state.isLoading = false
            state.error = undefined
            state.listCount = 0
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        },
    },
});


export default ticketsListSlice.reducer;

// Actions


const { startLoading, hasError, setList, setListCount } = ticketsListSlice.actions;
export const { clearTicketsList } = ticketsListSlice.actions


export const getAllTicketsList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(TICKETS_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setList(response.data.data.tickets))
                    dispatch(setListCount(response.data.data.totalCount))
                }
                return response;
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }
}

export const getMyTicketsList = (nationalNo, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(MYTICKETS_LIST(nationalNo), querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setList(response.data.data.tickets))
                    dispatch(setListCount(response.data.data.totalCount))
                }
                return response;
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }
}

