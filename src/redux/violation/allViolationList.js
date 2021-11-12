import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { VIOLATION_LIST } from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    violationList: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
};


const allViolationsListSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setList: (state, action) => {
            state.violationList = action.payload;
            state.isLoading = false
        },
        resetList: (state) => {
            state.violationList = []
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        },
    },
});


export default allViolationsListSlice.reducer;


// Actions


const { startLoading, hasError, setList, resetList, setListCount } = allViolationsListSlice.actions;


export const getAllViolationsList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(VIOLATION_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setList(response.data.data.violationList))
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


export const cleanList = () => async dispatch => {
    dispatch(resetList())
}

