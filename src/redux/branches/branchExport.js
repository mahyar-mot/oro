import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {BRANCH_EXCEL_EXPORT} from "../../utils/constants";
import { success } from "../../utils/message";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    branchExport: undefined,
    isLoading: false,
    error: undefined,
    listCount: 0
};


const branchExportSlice = createSlice({
    name: "branchExport",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setBranchExport: (state, action) => {
            state.branchExport = action.payload;
            state.isLoading = false
        },
        resetBranchExport: (state) => {
            state.branchExport = undefined
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default branchExportSlice.reducer;


// Actions


const { startLoading, hasError, setBranchExport, resetBranchExport, setListCount } = branchExportSlice.actions;


export const getBranchExport = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(BRANCH_EXCEL_EXPORT, querys))
            .then( response => {
                if (response.status === 200) {
                    // const href = URL.createObjectURL(response.data)
                    dispatch(setBranchExport("href"))
                    success(response.data.data)
                    // dispatch(setListCount(response.data.data.totalCount))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }

}


export const cleanBranchExport = () => async dispatch => {
    dispatch(resetBranchExport())
}

