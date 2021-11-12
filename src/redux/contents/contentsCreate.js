import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import {CONTENTS_CREATE} from "../../utils/constants";


// Slice

const initialState = {
    content: {},
    isLoading: false,
    error: undefined,
};


const contentCreateSlice = createSlice({
    name: "contentCreate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setContent: (state, action) => {
            state.content = action.payload;
            state.isLoading = false
        },
    },
});


export default contentCreateSlice.reducer;


// Actions


const { startLoading, hasError, setContent } = contentCreateSlice.actions;


export const createContent = (payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(CONTENTS_CREATE, JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setContent(response.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const cleanContent = () => async dispatch => {
    dispatch(setContent({}))
}