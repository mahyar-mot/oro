import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {VIOLATION_IMAGE_REPORT} from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    picturesList: [],
    isLoading: false,
    error: undefined,
    listCount: 0
};


const overseersSlice = createSlice({
    name: "picturesList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setPicturesList: (state, action) => {
            state.picturesList = action.payload;
            state.isLoading = false
        },
        resetPicturesList: (state) => {
            state.picturesList = []
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default overseersSlice.reducer;


// Actions


const { startLoading, hasError, setPicturesList, resetPicturesList, setListCount } = overseersSlice.actions;


export const getPicturesList = (countryDev,querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(VIOLATION_IMAGE_REPORT(countryDev), querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setPicturesList(response.data.data))
                    dispatch(setListCount(response.data.data.length))
                }
                return response;
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }

}


export const cleanPicturesList = () => async dispatch => {
    dispatch(resetPicturesList())
}

