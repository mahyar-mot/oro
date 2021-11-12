import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { PEOPLE_VIOLATION_LIST } from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    violationList: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
};


const PeopleViolationsListSlice = createSlice({
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


export default PeopleViolationsListSlice.reducer;


// Actions


const { startLoading, hasError, setList, resetList, setListCount } = PeopleViolationsListSlice.actions;


export const getPeopleViolationsList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(PEOPLE_VIOLATION_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setList(response.data.data.peopleViolationList))
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

