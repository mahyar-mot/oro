import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {BRANCHINSPECTORS_LIST, BRANCHINSPECTORS_BRANCHES_LIST} from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    branchInspectorsList: [],
    branchesList: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
    hasMore: true,
};


const branchInspectorsListSlice = createSlice({
    name: "branchInspectorsList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setBranchInspectorsList: (state, action) => {
            state.branchInspectorsList = action.payload;
            state.isLoading = false
        },
        setBranchInspectorsBranchesList: (state, action) => {
            state.branchesList = action.payload
            state.isLoading = false
        },
        setBranchInspectorsBranchesListNextPage: (state, action) => {
            state.branchesList = [...state.branchesList, ...action.payload]
            state.isLoading = false
        },
        setHasMore: state => {
            state.hasMore = false
        },
        cleanBranchInspectorList: (state) => {
            state.branchInspectorsList = []
            state.branchesList = []
            state.isLoading = false
            state.error = undefined
            state.hasMore = true
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default branchInspectorsListSlice.reducer;


// Actions


const { startLoading, hasError, setBranchInspectorsList, setListCount, setBranchInspectorsBranchesList, setBranchInspectorsBranchesListNextPage, setHasMore } = branchInspectorsListSlice.actions;
export const { cleanBranchInspectorList } = branchInspectorsListSlice.actions;


export const getBranchInspectorsList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(BRANCHINSPECTORS_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setBranchInspectorsList(response.data.data.userProfiles))
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


export const getBranchInspectorsAllowedBranches = (nationalNo, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(BRANCHINSPECTORS_BRANCHES_LIST(nationalNo), querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    if (response.data.data){
                        dispatch(setBranchInspectorsBranchesList(response.data.data.branches))
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


export const getAllowedBranchesNextPage = (nationalNo, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(BRANCHINSPECTORS_BRANCHES_LIST(nationalNo), querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    if (response.data.data){
                        dispatch(setBranchInspectorsBranchesListNextPage(response.data.data.branches))
                        if( response.data.data.branches.length < 100 ) dispatch(setHasMore())
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
