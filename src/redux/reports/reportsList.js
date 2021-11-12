import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { OVERSEER_REPORTS } from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    reportsList: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
};


const reportsListSlice = createSlice({
    name: "reportsList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setReportsList: (state, action) => {
            state.reportsList = action.payload;
            state.isLoading = false
        },
        resetReportsList: (state) => {
            state.reportsList = []
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        },
    },
});


export default reportsListSlice.reducer;


// Actions


const { startLoading, hasError, setReportsList, resetReportsList, setListCount } = reportsListSlice.actions;


export const getReportsList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(OVERSEER_REPORTS, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setReportsList(response.data.data.userApprovedAndRejectedReportsDto))
                    dispatch(setListCount(response.data.data.totalCount))
                }
                return response;
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }

}


export const cleanReportsList = () => async dispatch => {
    dispatch(resetReportsList())
}

