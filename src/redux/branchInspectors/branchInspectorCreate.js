import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import { BRANCHINSPECTORS_CREATE } from "../../utils/constants";


// Slice

const initialState = {
    branchInspector: {},
    isLoading: false,
    error: undefined,
    isSuccess: false
};


const branchInspectorCreateSlice = createSlice({
    name: "branchInspectorCreate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setBranchInspector: (state, action) => {
            state.branchInspector = action.payload;
            state.isLoading = false
            state.isSuccess = true
        },
        cleanBranchInspector: (state) => {
            state.branchInspector = {}
            state.isLoading = false
            state.isSuccess = false
        }
    },
});


export default branchInspectorCreateSlice.reducer;


// Actions


const { startLoading, hasError, setBranchInspector } = branchInspectorCreateSlice.actions;
export const {cleanBranchInspector} = branchInspectorCreateSlice.actions;

export const createBranchInspector = (payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(BRANCHINSPECTORS_CREATE, JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setBranchInspector(response.data.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}
