import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {CARTS_LIST} from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    cartsList: [],
    isLoading: false,
    error: undefined,
    listCount: 0
};


const cartsSlice = createSlice({
    name: "cartsList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setCartsList: (state, action) => {
            state.cartsList = action.payload;
            state.isLoading = false
        },
        resetCartsList: (state) => {
            state.cartsList = []
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default cartsSlice.reducer;


// Actions


const { startLoading, hasError, setCartsList, resetCartsList, setListCount } = cartsSlice.actions;


export const getCartsList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(CARTS_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setCartsList(response.data.data.users))
                    dispatch(setListCount(response.data.data.totalCount))
                }
                return response;
            });
    }   catch (e){
        console.error(e.message);
        dispatch(hasError(e.message))
        return e;
    }

}


export const cleanCartsList = () => async dispatch => {
    dispatch(resetCartsList())
}

