import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { COMPLAINTS_ATTACHMENTS, COMPLAINTS_CREATE_ATTACHMENT } from "../../utils/constants";
import { success } from "../../utils/message";


// Slice

const initialState = {
    attachments: [],
    isLoading: false,
    error: false,
    isSuccess: false,
};


const complaintAttachmentsSlice = createSlice({
    name: "complaintAttachments",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setComplaintAttachments: (state, action) => {
            state.attachments = action.payload;
            state.isLoading = false
        },
        cleanComplaint: (state) =>{
            state.attachments = []
            state.isLoading = false
            state.error = undefined
            state.isSuccess = false
        },
        createAttachment: (state) => {
            state.isSuccess = true
        }
    },
});


export default complaintAttachmentsSlice.reducer;


// Actions


const { startLoading, hasError, setComplaintAttachments, cleanComplaint, createAttachment } = complaintAttachmentsSlice.actions;


export const getComplaintAttachments = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(COMPLAINTS_ATTACHMENTS(id))
            .then( response => {
                    dispatch(setComplaintAttachments(response.data.data.attachments))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const resetComplaintAttachments = () => async dispatch => {
    dispatch(cleanComplaint());
}


export const createComplaintAttachment = (payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(COMPLAINTS_CREATE_ATTACHMENT, payload)
            .then( response => {
                if (response.data.isSuccess){
                    dispatch(createAttachment(response.data.data.attachments))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}
