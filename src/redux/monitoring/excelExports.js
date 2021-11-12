import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {MONITORING_REPORT_OVERSEER_EXPORT,
        MONITORING_REPORT_OVERSEER_PDFEXPORT,
        INSPECTOR_MONITORING_REPORT_EXPORT,
        INSPECTOR_MONITORING_REPORT_PDFEXPORT} from "../../utils/constants";
import { success } from "../../utils/message";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    monitoringReportExport: undefined,
    isLoading: false,
    error: undefined,
    listCount: 0
};


const monitoringReportExportSlice = createSlice({
    name: "monitoringReportExport",
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
            state.monitoringReportExport = action.payload;
            state.isLoading = false
        },
        resetOverseersExport: (state) => {
            state.monitoringReportExport = undefined
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default monitoringReportExportSlice.reducer;


// Actions


const { startLoading, hasError, setOverseersExport, resetOverseersExport, setListCount } = monitoringReportExportSlice.actions;


export const getOverseersMonitoringReportExport = (countryCode, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(MONITORING_REPORT_OVERSEER_EXPORT(countryCode), querys))
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

export const getOverseersMonitoringReportPDFExport = (countryCode, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(MONITORING_REPORT_OVERSEER_PDFEXPORT(countryCode), querys))
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

export const getInspectorsMonitoringReportExport = (countryCode, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(INSPECTOR_MONITORING_REPORT_EXPORT(countryCode), querys))
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

export const getInspectorsMonitoringReportPDFExport = (countryCode, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(INSPECTOR_MONITORING_REPORT_PDFEXPORT(countryCode), querys))
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

