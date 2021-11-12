import {createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {success} from '../../utils/message';
import {
    TICKETS_LIST,
    REPLY_TICKET
} from "../../utils/constants";


// Slice

const initialState = {
    ticket: {},
    isLoading: false,
    error: undefined,
    isSuccess: false
};


const ticketCreateSlice = createSlice({
    name: "ticketCreate",
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
            state.isSuccess = true
        },
        clearTicketCreate: state => {
            state.error = undefined;
            state.isLoading = false
            state.isSuccess = false
            state.ticket = {}
        },
    },
});


export default ticketCreateSlice.reducer;


// Actions


const {
    startLoading,
    hasError,
    setTicket,
} = ticketCreateSlice.actions;
export const { clearTicketCreate } = ticketCreateSlice.actions;


export const createTicket = (payload) => async dispatch => {
    dispatch(startLoading());
    try {
        await api
            .post(TICKETS_LIST, JSON.stringify(payload))
            .then(response => {
                if (response.data.statusCode === 200) {
                    dispatch(setTicket(true))
                    success(response.data.message)
                }
            });
    } catch (e) {
        console.error(e.message);
        dispatch(hasError(e.message))
    }
}


export const replyToTicket = (payload) => async dispatch => {
    dispatch(startLoading());
    try {
        await api
            .post(REPLY_TICKET, JSON.stringify(payload))
            .then(response => {
                if (response.data.statusCode === 200) {
                    dispatch(setTicket(true))
                    success(response.data.message)
                }
            });
    } catch (e) {
        console.error(e.message);
        dispatch(hasError(e.message))
    }
}
