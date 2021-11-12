import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {CATEGORIES_DETAIL, CATEGORIES_CHILDS} from "../../utils/constants";


// Slice

const initialState = {
    category: {},
    categoryChilds: [],
    isLoading: false,
    error: false,
};


const categoryRetrieveSlice = createSlice({
    name: "categoryDetail",
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
        setCategoryChilds: (state, action) =>{
            state.categoryChilds = action.payload
            state.isLoading = false
        },
        cleanCategory: (state) =>{
            state.category = {}
            state.categoryChilds = []
            state.isLoading = false
            state.error = undefined
        }
    },
});


export default categoryRetrieveSlice.reducer;


// Actions


const { startLoading, hasError, setCategory, cleanCategory, setCategoryChilds } = categoryRetrieveSlice.actions;


export const getCategory = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(CATEGORIES_DETAIL(id))
            .then( response => {
                    dispatch(setCategory(response.data.data))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}

export const getCategoryChilds = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(CATEGORIES_CHILDS(id))
            .then( response => {
                    dispatch(setCategoryChilds(response.data.data))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const resetCategory = () => async dispatch => {
    dispatch(cleanCategory());
}


