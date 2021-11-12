import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { CATEGORIES_LIST } from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    categoriesList: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
};


const categoriesListSlice = createSlice({
    name: "categoriesList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setCategoriesList: (state, action) => {
            state.categoriesList = action.payload;
            state.isLoading = false
        },
        resetCategoriesList: (state) => {
            state.categoriesList = []
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        },
    },
});


export default categoriesListSlice.reducer;


// Actions


const { startLoading, hasError, setCategoriesList, resetCategoriesList, setListCount } = categoriesListSlice.actions;


export const getCategoriesList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(CATEGORIES_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setCategoriesList(response.data.data))
                    // dispatch(setListCount(response.data.data.totalCount))
                }
                return response;
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }

}


export const cleanCategoriesList = () => async dispatch => {
    dispatch(resetCategoriesList())
}

