import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { PROTESTS_DETAIL } from "../../utils/constants";


// Slice

const initialState = {
    complaint: {},
    isLoading: false,
    error: false,
};


const listComplaintRetrieveSlice = createSlice({
    name: "listComplaintDetail",
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
        },
        cleanComplaint: (state) =>{
            state.complaint = {}
            state.isLoading = false
            state.error = undefined
        }
    },
});


export default listComplaintRetrieveSlice.reducer;


// Actions


const { startLoading, hasError, setComplaint, cleanComplaint } = listComplaintRetrieveSlice.actions;


export const getUserComplaint = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(PROTESTS_DETAIL(id))
            .then( response => {
                    dispatch(setComplaint(response.data.data))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const resetComplaint = () => async dispatch => {
    dispatch(cleanComplaint());
}


