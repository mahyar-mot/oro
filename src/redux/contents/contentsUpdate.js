import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import {CONTENTS_DETAIL} from "../../utils/constants";


// Slice

const initialState = {
    content: {},
    isLoading: false,
    error: undefined,
    isSuccess: false
};


const contentUpdateSlice = createSlice({
    name: "contentUpdate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        updateContent: (state, action) => {
            state.content = action.payload;
            state.isLoading = false
            state.isSuccess = true
        },
        resetUpdate: state => {
            state.content = {}
            state.isLoading = false
            state.error = undefined
            state.isSuccess = false
        }
    },
});


export default contentUpdateSlice.reducer;


// Actions


const { startLoading, hasError, updateContent } = contentUpdateSlice.actions;
export const { resetUpdate } = contentUpdateSlice.actions;


export const contentUpdate = (id, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .put(CONTENTS_DETAIL(id), JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(updateContent(response.data.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}
