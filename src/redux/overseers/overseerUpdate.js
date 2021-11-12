import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import {SUPERVISOR_DETAIL, SUPERVISOR_ACTIVATION, SUPERVISOR_RESEND_SMS, SUPERVISOR_MANAGEMENT_APPROVAL} from "../../utils/constants";
import { setOverseerStatus } from "./overseerDetail"


// Slice

const initialState = {
    overseer: {},
    isLoading: false,
    error: undefined,
    isSuccess: false,
    userActivation: false,
    userResendSms: false,
    manageApproval: false,
};


const overseerUpdateSlice = createSlice({
    name: "overseerUpdate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        updateOverseer: (state, action) => {
            state.overseer = action.payload;
            state.isLoading = false
            state.isSuccess = true
        },
        updateOverseerActivation: (state) => {
            state.userActivation = true
            state.isLoading = false
        },
        resendOverseerActivation: (state) => {
            state.userResendSms = true
            state.isLoading = false
        },
        updateOverseerManageApproval: (state) => {
            state.manageApproval = true
            state.isLoading = false
        },
        clearUpdate: state => {
            state.overseer = {};
            state.isLoading = false
            state.isSuccess = false
            state.userActivation = false
            state.userResendSms = false
            state.manageApproval = false
        }
    },
});


export default overseerUpdateSlice.reducer;


// Actions


const { startLoading, hasError, updateOverseer, updateOverseerActivation, resendOverseerActivation, updateOverseerManageApproval } = overseerUpdateSlice.actions;
export const { clearUpdate } = overseerUpdateSlice.actions


export const overseerUpdate = (nationalNo, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .put(SUPERVISOR_DETAIL(nationalNo), JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(updateOverseer(response.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const overseerActivation = (nationalNo, payload) => async dispatch => {
    dispatch(startLoading());
    let url = `${SUPERVISOR_ACTIVATION(nationalNo)}?status=${payload.status}&Description=${payload.description}`
    try{
        await api
            .post(url)
            .then( response => {
                if (response.data.statusCode === 200){
                    success(response.data.message)
                    dispatch(updateOverseerActivation())
                    dispatch(setOverseerStatus(payload))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const overseerResendSms = (nationalNo) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(SUPERVISOR_RESEND_SMS(nationalNo))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(resendOverseerActivation())
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const overseerManagementApproval = (nationalNo, payload) => async dispatch => {
    dispatch(startLoading());
    let url = SUPERVISOR_MANAGEMENT_APPROVAL(nationalNo) + `?approved=${payload.approved}&description=${payload.description}`
    try{
        await api
            .post(url)
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(updateOverseerManageApproval())
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}
