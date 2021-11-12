import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {SUPERVISOR_EXPORT, SUPERVISOR_EXPORT_PDF} from "../../utils/constants";
import { success } from "../../utils/message";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    overseersExport: undefined,
    isLoading: false,
    error: undefined,
    listCount: 0
};


const overseersExportSlice = createSlice({
    name: "overseersExport",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setOverseersExport: (state, action) => {
            state.overseersExport = action.payload;
            state.isLoading = false
        },
        resetOverseersExport: (state) => {
            state.overseersExport = undefined
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default overseersExportSlice.reducer;


// Actions


const { startLoading, hasError, setOverseersExport, resetOverseersExport, setListCount } = overseersExportSlice.actions;


export const getOverseersExport = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(SUPERVISOR_EXPORT, querys))
            .then( response => {
                if (response.status === 200) {
                    // const href = URL.createObjectURL(response.data)
                    dispatch(setOverseersExport("href"))
                    success(response.data.data)
                    // dispatch(setListCount(response.data.data.totalCount))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }
}


export const getOverseersPDFExport = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(SUPERVISOR_EXPORT_PDF, querys))
            .then( response => {
                if (response.status === 200) {
                    // const href = URL.createObjectURL(response.data)
                    dispatch(setOverseersExport("href"))
                    success(response.data.data)
                    // dispatch(setListCount(response.data.data.totalCount))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }
}


export const cleanOverseersExport = () => async dispatch => {
    dispatch(resetOverseersExport())
}

