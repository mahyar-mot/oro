import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {BRANCH_LIST, BRANCH_ROLLCALL_LIST} from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    branchesList: [],
    isLoading: false,
    error: undefined,
    listCount: 0
};


const branchesListSlice = createSlice({
    name: "branchesList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setBranchesList: (state, action) => {
            state.branchesList = action.payload;
            state.isLoading = false
        },
        cleanBranchesList: (state) => {
            state.branchesList = []
            state.isLoading = false
            state.error = undefined
            state.listCount = 0
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default branchesListSlice.reducer;


// Actions


const { startLoading, hasError, setBranchesList, setListCount } = branchesListSlice.actions;
export const { cleanBranchesList } = branchesListSlice.actions;


export const getBranchesList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(BRANCH_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setBranchesList(response.data.data.branches))
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


export const getRollcallList = (nationalNo, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(BRANCH_ROLLCALL_LIST(nationalNo), querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    if (response.data.data){
                        dispatch(setBranchesList(response.data.data.branches))
                        dispatch(setListCount(response.data.data.totalCount))
                    }
                }
                return response;
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }
}
