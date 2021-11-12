import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import {BRANCH_UPDATE, BRANCH_ROLLCALL_UPDATE} from "../../utils/constants";


// Slice

const initialState = {
    branch: {},
    isLoading: false,
    error: undefined,
    isSuccess: false,
};


const branchUpdateSlice = createSlice({
    name: "branchUpdate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        updateBranch: (state, action) => {
            state.branch = action.payload;
            state.isLoading = false
            state.isSuccess = true
        },
        clearUpdate: state => {
            state.branch = {};
            state.isLoading = false
            state.isSuccess = false
        }
    },
});


export default branchUpdateSlice.reducer;


// Actions


const { startLoading, hasError, updateBranch } = branchUpdateSlice.actions;
export const { clearUpdate } = branchUpdateSlice.actions


export const branchUpdate = (nationalNo, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .put(BRANCH_UPDATE(nationalNo), JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(updateBranch(response.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const branchRollCallUpdate = (payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(BRANCH_ROLLCALL_UPDATE, JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(updateBranch(response.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}

