import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {BRANCHINSPECTORS_SEARCH, BRANCHINSPECTORS_BRANCHES_LIST} from "../../utils/constants";
import { error } from "../../utils/message";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    branchInspectorDetail: [],
    branchInspectorBranchesList: [],
    isLoading: false,
    error: undefined,
    listCount: 0
};


const branchInspectorDetailSlice = createSlice({
    name: "branchInspectorDetail",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setBranchInspectorDetail: (state, action) => {
            state.branchInspectorDetail = action.payload;
            state.isLoading = false
        },
        setBranchInspectorBranchesList: (state, action) => {
            state.branchInspectorBranchesList = action.payload
            state.isLoading = false
        },
        cleanBranchInspectorDetail: (state) => {
            state.branchInspectorDetail = []
            state.branchInspectorBranchesList = []
            state.isLoading = false
            state.error = undefined
        },
    },
});


export default branchInspectorDetailSlice.reducer;


// Actions


const { startLoading, hasError, setBranchInspectorDetail, setBranchInspectorBranchesList } = branchInspectorDetailSlice.actions;
export const { cleanBranchInspectorDetail } = branchInspectorDetailSlice.actions;


export const getBranchInspector = (countryCode, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(BRANCHINSPECTORS_SEARCH(countryCode), querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    if (response.data.data){
                        dispatch(setBranchInspectorDetail(response.data.data.userProfiles))
                    }else{
                        error("کاربری برای این شعبه پیدا نشد")
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


export const getBranchInspectorBranches = (nationalNo, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(BRANCHINSPECTORS_BRANCHES_LIST(nationalNo), querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    if (response.data.data){
                        dispatch(setBranchInspectorBranchesList(response.data.data.branches))
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
