import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { ADMIN_EXPORT, ADMIN_PDF_EXPORT} from "../../utils/constants";
import { success } from "../../utils/message";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    adminExport: false,
    isLoading: false,
    error: undefined,
    listCount: 0
};


const adminsFileSlice = createSlice({
    name: "adminsFile",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setAdminExport: (state, action) => {
            state.adminExport = action.payload;
            state.isLoading = false
        },
        cleanAdminsFile: (state) => {
            state.adminExport = false
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default adminsFileSlice.reducer;


// Actions


const { startLoading, hasError, setAdminExport } = adminsFileSlice.actions;
export const { cleanAdminsFile } = adminsFileSlice.actions;



export const getAdminsExport = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(ADMIN_EXPORT, querys))
            .then( response => {
                if (response.status === 200) {
                    // const href = URL.createObjectURL(response.data)
                    dispatch(setAdminExport("href"))
                    success(response.data.data)
                    // dispatch(setListCount(response.data.data.totalCount))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }

}


export const getAdminsPDFExport = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(ADMIN_PDF_EXPORT, querys))
            .then( response => {
                if (response.status === 200) {
                    // const href = URL.createObjectURL(response.data)
                    dispatch(setAdminExport("href"))
                    success(response.data.data)
                    // dispatch(setListCount(response.data.data.totalCount))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }

}