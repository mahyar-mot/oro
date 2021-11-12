import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {SUPERVISOR_LIST} from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    overseersList: [],
    isLoading: false,
    error: undefined,
    listCount: 0
};


const overseersSlice = createSlice({
    name: "overseersList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setOverseersList: (state, action) => {
            state.overseersList = action.payload;
            state.isLoading = false
        },
        resetOverseersList: (state) => {
            state.overseersList = []
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default overseersSlice.reducer;


// Actions


const { startLoading, hasError, setOverseersList, resetOverseersList, setListCount } = overseersSlice.actions;


export const getOverseersList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(SUPERVISOR_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setOverseersList(response.data.data.userProfiles))
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


export const cleanOverseersList = () => async dispatch => {
    dispatch(resetOverseersList())
}

