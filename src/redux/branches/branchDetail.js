import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {BRANCH_DETAIL, BRANCH_ROLLCALL_DETAIL, BRANCH_OVERSEER} from "../../utils/constants";


// Slice

const initialState = {
    branchDetail: {},
    isLoading: false,
    error: false,
};


const branchDetailSlice = createSlice({
    name: "branchDetail",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setBranchDetail: (state, action) => {
            state.branchDetail = action.payload;
            state.isLoading = false
        },
        cleanBranchDetail: (state, action) =>{
            state.branchDetail = {}
            state.isLoading = false
            state.error = undefined
        }
    },
});


export default branchDetailSlice.reducer;


// Actions


const { startLoading, hasError, setBranchDetail } = branchDetailSlice.actions;
export const { setOverseerStatus, cleanBranchDetail } = branchDetailSlice.actions;


export const getBranch = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(BRANCH_DETAIL(id))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setBranchDetail(response.data.data))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const getBranchRollCall = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(BRANCH_ROLLCALL_DETAIL(id))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setBranchDetail(response.data.data))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const getOverseerBranch = (nationalNo) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(BRANCH_OVERSEER(nationalNo))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setBranchDetail(response.data.data))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}
