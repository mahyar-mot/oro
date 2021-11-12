import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {HEADSUPERVISOR_SEARCH, HEADSUPERVISOR_BRANCHES_LIST} from "../../utils/constants";
import { error } from "../../utils/message";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    headOverseerDetail: [],
    headOverseerBranchesList: [],
    isLoading: false,
    error: undefined,
    listCount: 0
};


const headOverseerDetailSlice = createSlice({
    name: "headOverseerDetail",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setHeadOverseerDetail: (state, action) => {
            state.headOverseerDetail = action.payload;
            state.isLoading = false
        },
        setHeadOverseerBranchesList: (state, action) => {
            state.headOverseerBranchesList = action.payload
            state.isLoading = false
        },
        cleanHeadOverseerDetail: (state) => {
            state.headOverseerDetail = []
            state.headOverseerBranchesList = []
            state.isLoading = false
            state.error = undefined
        },
    },
});


export default headOverseerDetailSlice.reducer;


// Actions


const { startLoading, hasError, setHeadOverseerDetail, setHeadOverseerBranchesList } = headOverseerDetailSlice.actions;
export const { cleanHeadOverseerDetail } = headOverseerDetailSlice.actions;


export const getHeadOverseer = (countryCode, querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(HEADSUPERVISOR_SEARCH(countryCode), querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    if (response.data.data){
                        dispatch(setHeadOverseerDetail(response.data.data.userProfiles))
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


export const getHeadOverseerBranches = (nationalNo, querys) => async dispatch => {
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
