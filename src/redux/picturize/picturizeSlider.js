import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {VIOLATION_IMAGES} from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    sliderPicturesList: [],
    isLoading: false,
    error: undefined,
    listCount: 0
};


const overseersSlice = createSlice({
    name: "sliderPicturesList",
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
            state.sliderPicturesList = action.payload;
            state.isLoading = false
        },
        resetSliderPicturesList: (state) => {
            state.sliderPicturesList = []
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


const { startLoading, hasError, setPicturesList, resetSliderPicturesList, setListCount } = overseersSlice.actions;


export const getSliderPicturesList = (countryDev,querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(VIOLATION_IMAGES(countryDev), querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setPicturesList(response.data.data ?? []))
                    dispatch(setListCount(response.data.data.length || 0))
                }
                return response;
            });
    }   catch (e){
        console.error(e.message);
        dispatch(hasError(e.message))
        return e;
    }

}


export const cleanSliderPicturesList = () => async dispatch => {
    dispatch(resetSliderPicturesList())
}

