import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {success} from "../../utils/message";
import { COMPLAINTS_COMMENTS, PROTEST_COMMENT } from "../../utils/constants";


// Slice

const initialState = {
    comments: [],
    isLoading: false,
    error: false,
    isSuccess: false
};


const complaintCommentsSlice = createSlice({
    name: "complaintComments",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setComplaintComplaint: (state, action) => {
            state.comments = action.payload;
            state.isLoading = false
        },
        cleanComplaintComment: (state) =>{
            state.comments = []
            state.isLoading = false
            state.error = undefined
            state.isSuccess = false
        },
        createComment: (state) => {
            state.isSuccess = true
        }
    },
});


export default complaintCommentsSlice.reducer;


// Actions


const { startLoading, hasError, setComplaintComplaint, cleanComplaintComment, createComment } = complaintCommentsSlice.actions;


export const getComplaintComments = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(COMPLAINTS_COMMENTS(id))
            .then( response => {
                    dispatch(setComplaintComplaint(response.data.data.comments))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const resetComplaintComments = () => async dispatch => {
    dispatch(cleanComplaintComment());
}


export const createComplaintComment = (payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(PROTEST_COMMENT, payload)
            .then( response => {
                if (response.data.isSuccess){
                    dispatch(createComment())
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}

