import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {MEDIA_URL, IMAGE_UPLOAD, INSPECTOR_REPORT_EXCEL, INSPECTOR_REPORT_PDF} from "../../utils/constants";
import { success } from "../../utils/message";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    inspectorNationalImage: undefined,
    inspectorExcelExport: false,
    isLoading: false,
    error: undefined,
    listCount: 0
};


const inspectorsFileSlice = createSlice({
    name: "inspectorsFile",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setInspectorExcelExport: (state, action) => {
            state.inspectorExcelExport = action.payload;
            state.isLoading = false
        },
        setInspectorNationalImage: (state, action) => {
            state.inspectorNationalImage = action.payload
            state.isLoading = false
        },
        cleanInspectorsFile: (state) => {
            state.inspectorNationalImage = undefined
            state.inspectorExcelExport = false
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default inspectorsFileSlice.reducer;


// Actions


const { startLoading, hasError, setInspectorExcelExport, setInspectorNationalImage } = inspectorsFileSlice.actions;
export const { cleanInspectorsFile } = inspectorsFileSlice.actions;


export const getInspectorsExport = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(INSPECTOR_REPORT_EXCEL, querys))
            .then( response => {
                if (response.status === 200) {
                    // const href = URL.createObjectURL(response.data)
                    dispatch(setInspectorExcelExport("href"))
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


export const getInspectorsPDFExport = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(INSPECTOR_REPORT_PDF, querys))
            .then( response => {
                if (response.status === 200) {
                    // const href = URL.createObjectURL(response.data)
                    dispatch(setInspectorExcelExport("href"))
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


export const uploadNationalImage = (nationalNo, data) => async dispatch => {
    dispatch(startLoading());
    try {
        let url= MEDIA_URL + IMAGE_UPLOAD(nationalNo);
        await api.post(url, data)
            .then(response => {
                if (response.data.statusCode === 200) {
                    dispatch(setInspectorNationalImage(response.data.data));
                    success(response.data.message)
                }
            });
    } catch (e) {
        console.error("Error", e.message);
        dispatch(hasError(e.message))
    }
}

