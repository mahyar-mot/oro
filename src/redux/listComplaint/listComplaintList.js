import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { PROTESTS_LIST } from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    userComplaintsList: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
};


const userComplaintsListSlice = createSlice({
    name: "userComplaintsList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setUserComplaintsList: (state, action) => {
            state.userComplaintsList = action.payload;
            state.isLoading = false
        },
        resetUserComplaintsList: (state) => {
            state.userComplaintsList = []
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        },
    },
});


export default userComplaintsListSlice.reducer;


// Actions


const { startLoading, hasError, setUserComplaintsList, resetUserComplaintsList, setListCount } = userComplaintsListSlice.actions;


export const getUserComplaintsList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(PROTESTS_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setUserComplaintsList(response.data.data.protests))
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


export const cleanUserComplaintsList = () => async dispatch => {
    dispatch(resetUserComplaintsList())
}

