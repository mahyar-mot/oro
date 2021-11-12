import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { USER_COMPLAINTS_DETAIL } from "../../utils/constants";


// Slice

const initialState = {
    complaint: {},
    isLoading: false,
    error: false,
};


const userComplaintRetrieveSlice = createSlice({
    name: "userComplaintDetail",
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


export default userComplaintRetrieveSlice.reducer;


// Actions


const { startLoading, hasError, setComplaint, cleanComplaint } = userComplaintRetrieveSlice.actions;


export const getUserComplaint = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(USER_COMPLAINTS_DETAIL(id))
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


