import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {DOWNLOAD_FILES_LIST} from '../../utils/constants';
import { success } from "../../utils/message";
import { UrlQuery } from "../../utils/utils";


// Slice


const initialState = {
    downloadFiles: [],
    isLoading: false,
    isSuccess: false,
    listCount: 0
};


const downloadFilesSlice = createSlice({
    name: "downloadFiles",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true
        },
        setDownloadFiles: (state, action) => {
            state.downloadFiles = action.payload
            state.isLoading = false
            state.isSuccess = false
        },
        cleanDownloadFiles: state => {
            state.isLoading = false
            state.isSuccess = false
            state.downloadFiles = []
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default downloadFilesSlice.reducer;


// Actions

const { setDownloadFiles, startLoading, setListCount } = downloadFilesSlice.actions;
export const { cleanDownloadFiles } = downloadFilesSlice.actions


export const getDownloadFiles = (query) => async dispatch => {
    dispatch(startLoading())
    try{
        await api
            .get(UrlQuery(DOWNLOAD_FILES_LIST, query))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setDownloadFiles(response.data.data.files))
                    dispatch(setListCount(response.data.data.totalCount))
                }
            });
    }   catch (e){
            console.error(e.message);
            // dispatch(hasError(e.message))
    }
}
