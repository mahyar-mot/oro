import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import {CATEGORIES_LIST} from "../../utils/constants";


// Slice

const initialState = {
    category: {},
    isLoading: false,
    error: undefined,
};


const categoryCreateSlice = createSlice({
    name: "categoryCreate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
            state.isLoading = false
        },
    },
});


export default categoryCreateSlice.reducer;


// Actions


const { startLoading, hasError, setCategory } = categoryCreateSlice.actions;


export const createCategory = (payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(CATEGORIES_LIST, JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setCategory(response.data.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const cleanCategory = () => async dispatch => {
    dispatch(setCategory({}))
}