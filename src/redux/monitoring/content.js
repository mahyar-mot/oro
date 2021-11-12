import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { MONITORING_CONTENT} from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    listMonitoring: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
};


const contentListSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setList: (state, action) => {
            state.listMonitoring = action.payload;
            state.isLoading = false
        },
        resetList: (state) => {
            state.listMonitoring = []
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        },
    },
});


export default contentListSlice.reducer;


// Actions


const { startLoading, hasError, setList, resetList, setListCount} = contentListSlice.actions;


export const getMonitoringContent = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(MONITORING_CONTENT, querys))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setList(response.data.data.contentInDivisionsDtos || []))
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
export const cleanList = () => async dispatch => {
    dispatch(resetList())
}



