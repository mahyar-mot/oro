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
    name: "cartsPrint",
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


export const printCartsList = (querys,payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(UrlQuery(CARTS_LIST, querys), JSON.stringify(payload))
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


export const cleanPostCartsList = () => async dispatch => {
    dispatch(resetCartsList())
}

