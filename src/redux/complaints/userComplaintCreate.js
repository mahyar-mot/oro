import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import {COMPLAINTS_CREATE, PROTEST_SETSTATUS} from "../../utils/constants";


// Slice

const initialState = {
    complaint: {},
    isLoading: false,
    error: undefined,
    isSuccess: false
};


const complaintCreateSlice = createSlice({
    name: "complaintCreate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setComplaint: (state, action) => {
            state.complaint = action.payload;
            state.isLoading = false
            state.isSuccess = true
        },
        resetComplaint: (state) => {
            state.isSuccess = false
            state.complaint = {}
            state.isLoading = false
        },
        setComplaintsStatus: state => {
            state.isSuccess = true
            state.isLoading = false
        }
    },
});


export default complaintCreateSlice.reducer;


// Actions


const { startLoading, hasError, setComplaint, resetComplaint, setComplaintsStatus } = complaintCreateSlice.actions;


export const createComplaint = (payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(COMPLAINTS_CREATE, JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setComplaint(response.data.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const cleanComplaint = () => async dispatch => {
    dispatch(resetComplaint())
}


export const setComplaintStatus = (id, payload) => async dispatch => {
    dispatch(startLoading());
    let url = PROTEST_SETSTATUS(id) + `?status=${payload.status}&statusDescription=${payload.statusDescription}`
    try{
        await api
            .post(url)
            .then( response => {
                if (response.data.isSuccess){
                    dispatch(setComplaintsStatus())
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}

