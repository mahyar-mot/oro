import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { PROCEEDINGS_LIST, PROCEEDINGS_DETAIL } from "../../utils/constants";
import { success } from "../../utils/message";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    proceedingsList: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
};


const proceedingsListSlice = createSlice({
    name: "proceedingsList",
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
            state.proceedingsList = action.payload;
            state.isLoading = false
        },
        clearProceedingsList: (state) => {
            state.proceedingsList = []
            state.isLoading = false
            state.error = undefined
            state.listCount = 0
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        },
    },
});


export default proceedingsListSlice.reducer;

// Actions


const { startLoading, hasError, setList, setListCount } = proceedingsListSlice.actions;
export const { clearProceedingsList } = proceedingsListSlice.actions


export const getAllProceedingsList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(PROCEEDINGS_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setList(response.data.data.proceedings))
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

export const deleteProceeding = (nationalNo, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .delete(UrlQuery(PROCEEDINGS_DETAIL(nationalNo), querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    success(response.data.data.message)
                }
                return response;
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }
}

