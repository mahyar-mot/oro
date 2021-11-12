import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import {INSPECTOR_DETAIL, INSPECTOR_ACTIVATION, INSPECTOR_RESEND_SMS, SUPERVISOR_MANAGEMENT_APPROVAL} from "../../utils/constants";
import { setInspectorStatus } from "./inspectorDetail"


// Slice

const initialState = {
    inspector: {},
    isLoading: false,
    error: undefined,
    isSuccess: false,
    userActivation: false,
    userResendSms: false,
    manageApproval: false,
};


const inspectorUpdateSlice = createSlice({
    name: "inspectorUpdate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        updateInspector: (state, action) => {
            state.inspector = action.payload;
            state.isLoading = false
            state.isSuccess = true
        },
        updateInspectorActivation: (state) => {
            state.userActivation = true
            state.isLoading = false
        },
        resendInspectorActivation: (state) => {
            state.userResendSms = true
            state.isLoading = false
        },
        updateInspectorManageApproval: (state) => {
            state.manageApproval = true
            state.isLoading = false
        },
        clearUpdate: state => {
            state.inspector = {};
            state.isLoading = false
            state.isSuccess = false
            state.userActivation = false
            state.userResendSms = false
            state.manageApproval = false
        }
    },
});


export default inspectorUpdateSlice.reducer;


// Actions


const { startLoading, hasError, updateInspector, updateInspectorActivation, resendInspectorActivation, updateInspectorManageApproval } = inspectorUpdateSlice.actions;
export const { clearUpdate } = inspectorUpdateSlice.actions


export const inspectorUpdate = (nationalNo, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .put(INSPECTOR_DETAIL(nationalNo), JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(updateInspector(response.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const inspectorActivation = (nationalNo, payload) => async dispatch => {
    dispatch(startLoading());
    let url = `${INSPECTOR_ACTIVATION(nationalNo)}?status=${payload.status}&Description=${payload.description}`
    try{
        await api
            .post(url)
            .then( response => {
                if (response.data.statusCode === 200){
                    success(response.data.message)
                    dispatch(updateInspectorActivation())
                    dispatch(setInspectorStatus(payload))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const inspectorResendSms = (nationalNo) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(INSPECTOR_RESEND_SMS(nationalNo))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(resendInspectorActivation())
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const inspectorManagementApproval = (nationalNo, payload) => async dispatch => {
    // dispatch(startLoading());
    // let url = SUPERVISOR_MANAGEMENT_APPROVAL(nationalNo) + `?approved=${payload.approved}&description=${payload.description}`
    // try{
    //     await api
    //         .post(url)
    //         .then( response => {
    //             if (response.data.statusCode === 200){
    //                 dispatch(updateInspectorManageApproval())
    //                 success(response.data.message)
    //             }
    //         });
    // }   catch (e){
    //         console.error(e.message);
    //         dispatch(hasError(e.message))
    // }
}
