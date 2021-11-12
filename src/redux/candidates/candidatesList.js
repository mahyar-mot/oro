import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { CANDIDATES_LIST } from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    candidatesList: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
};


const candidatesListSlice = createSlice({
    name: "candidatesList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setCandidatesList: (state, action) => {
            state.candidatesList = action.payload;
            state.isLoading = false
        },
        resetCandidatesList: (state) => {
            state.candidatesList = []
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        },
    },
});


export default candidatesListSlice.reducer;


// Actions


const { startLoading, hasError, setCandidatesList, resetCandidatesList, setListCount } = candidatesListSlice.actions;


export const getCandidatesList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(CANDIDATES_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setCandidatesList(response.data.data.candidates))
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


export const cleanCandidatesList = () => async dispatch => {
    dispatch(resetCandidatesList())
}

