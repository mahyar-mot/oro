import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {INSPECTOR_LIST} from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    inspectorsList: [],
    isLoading: false,
    error: undefined,
    listCount: 0
};


const inspectorsListSlice = createSlice({
    name: "inspectorsList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setInspectorsList: (state, action) => {
            state.inspectorsList = action.payload;
            state.isLoading = false
        },
        resetInspectorsList: (state) => {
            state.inspectorsList = []
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default inspectorsListSlice.reducer;


// Actions


const { startLoading, hasError, setInspectorsList, setListCount } = inspectorsListSlice.actions;
export const { resetInspectorsList } = inspectorsListSlice.actions


export const getInspectorsList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(INSPECTOR_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setInspectorsList(response.data.data.userProfiles))
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

