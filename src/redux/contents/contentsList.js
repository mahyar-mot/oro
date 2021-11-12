import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { CONTENTS_LIST ,CONTENTS_COUNT} from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    contentsList: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
    hasContent:false
};


const contentsListSlice = createSlice({
    name: "contentsList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setContentsList: (state, action) => {
            state.contentsList = action.payload;
            state.isLoading = false
        },
        resetContentsList: (state) => {
            state.contentsList = []
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
            state.isLoading = false
        },
        setHasContent: (state, action) => {
            state.hasContent = action.payload
            state.isLoading = false
        },
    },
});


export default contentsListSlice.reducer;


// Actions


const { startLoading, hasError, setContentsList, resetContentsList, setListCount,setHasContent } = contentsListSlice.actions;


export const getContentsList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(CONTENTS_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setContentsList(response.data.data.data))
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

export const getContentsCount = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(CONTENTS_COUNT, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setHasContent(response.data.data))

                }
                return response;
            });
    }   catch (e){
        console.error(e.message);
        dispatch(hasError(e.message))
        return e;
    }

}
export const cleanContentsList = () => async dispatch => {
    dispatch(resetContentsList())
}



