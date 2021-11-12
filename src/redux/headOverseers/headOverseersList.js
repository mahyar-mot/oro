import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {HEADSUPERVISOR_LIST, HEADSUPERVISOR_BRANCHES_LIST} from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    headOverseersList: [],
    branchesList: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
    hasMore: true,
};


const headOverseersListSlice = createSlice({
    name: "headOverseersList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setHeadOverseersList: (state, action) => {
            state.headOverseersList = action.payload;
            state.isLoading = false
        },
        setHeadOverseerBranchesList: (state, action) => {
            state.branchesList = action.payload
            state.isLoading = false
        },
        setHeadOverseerBranchesListNextPage: (state, action) => {
            state.branchesList = [...state.branchesList, ...action.payload]
            state.isLoading = false
        },
        setHasMore: state => {
            state.hasMore = false
        },
        cleanHeadOverseersList: (state) => {
            state.headOverseersList = []
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


export default headOverseersListSlice.reducer;


// Actions


const { startLoading, hasError, setHeadOverseersList, setListCount, setHeadOverseerBranchesList, setHeadOverseerBranchesListNextPage, setHasMore } = headOverseersListSlice.actions;
export const { cleanHeadOverseersList } = headOverseersListSlice.actions;


export const getHeadOverseersList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(HEADSUPERVISOR_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setHeadOverseersList(response.data.data.userProfiles))
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


export const getHeadOverseerAllowedBranches = (nationalNo, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(HEADSUPERVISOR_BRANCHES_LIST(nationalNo), querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    if (response.data.data){
                        dispatch(setHeadOverseerBranchesList(response.data.data.branches))
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
            .get(UrlQuery(HEADSUPERVISOR_BRANCHES_LIST(nationalNo), querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    if (response.data.data){
                        dispatch(setHeadOverseerBranchesListNextPage(response.data.data.branches))
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
