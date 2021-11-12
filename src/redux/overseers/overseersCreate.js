import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import {SUPERVISOR_DETAIL, SUPERVISOR_EXCEL_VALIDATION, SUPERVISOR_EXCEL_INSERT} from "../../utils/constants";


// Slice

const initialState = {
    overseer: {},
    overseersExcel: {},
    isLoading: false,
    error: undefined,
    isSuccess: false
};


const overseerCreateSlice = createSlice({
    name: "overseerCreate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setOverseer: (state, action) => {
            state.overseer = action.payload;
            state.isLoading = false
            state.isSuccess = true
        },
        setOverseersExcel: (state, action) => {
            state.isLoading = false
            state.overseersExcel = action.payload
        },
        cleanOverseer: (state) => {
            state.overseer = {}
            state.overseersExcel = {}
            state.isLoading = false
            state.isSuccess = false
        }
    },
});


export default overseerCreateSlice.reducer;


// Actions


const { startLoading, hasError, setOverseer, setOverseersExcel } = overseerCreateSlice.actions;
export const {cleanOverseer} = overseerCreateSlice.actions;

export const createOverseer = (nationalNo, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(SUPERVISOR_DETAIL(nationalNo), JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setOverseer(response.data.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}
export const createOverseerExcel = (countryCode, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(SUPERVISOR_EXCEL_VALIDATION(countryCode), JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setOverseersExcel(response.data.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
        console.error(e.message);
        dispatch(hasError(e.message))
    }

}

export const InsertOverseerExcel = (countryCode, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(SUPERVISOR_EXCEL_INSERT(countryCode), JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setOverseer({}))
                    success(response.data.data)
                }
            });
    }   catch (e){
        console.error(e.message);
        dispatch(hasError(e.message))
    }

}
