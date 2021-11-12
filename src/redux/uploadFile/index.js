import {createSlice} from "@reduxjs/toolkit";
// import {api} from "../../utils/api";
import {EXCEL_UPLOAD, IMAGE_UPLOAD, MEDIA_URL} from '../../utils/constants';
import axios from 'axios';
import {getTokenObject} from "../../utils/utils"
import {api} from "../../utils/api";
import {success} from "../../utils/message";
// Slice

const initialState = {
    uploadData: undefined,
    isLoading: false,
    error: undefined,
    attachmentFile: undefined,
    isDone: null
};


const uploadFileSlice = createSlice({
    name: "uploadFile",
    initialState,
    reducers: {
        startApiCall: state => {
            state.isLoading = true
        },
        uploadFile: (state, action) => {
            state.isLoading = false
            state.uploadData = action.payload
        },
        apiFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        cleanUploadFile: state => {
            state.isLoading = false
            state.uploadData = undefined
        },
        setAttachmentFile: (state, action) => {
            state.attachmentFile = action.payload
            state.isDone = true
        },
        clearAttachmentFile: (state) => {
            state.attachmentFile = null
            state.isDone = false
        }
    },
});


export default uploadFileSlice.reducer;


// Actions

export const {startApiCall, apiFail, uploadFile, cleanUploadFile, setAttachmentFile, clearAttachmentFile} = uploadFileSlice.actions;


export const uploadExcel = (data) => async dispatch => {
    dispatch(startApiCall());
    try {
        // console.log("upload",MEDIA_URL + EXCEL_UPLOAD,data)
        let url= MEDIA_URL + EXCEL_UPLOAD;
        let token = getTokenObject()
        await axios({
                    method: 'POST',
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryoRAaXrcAQtSGxtx7",
                        "Authorization" : `Bearer ${token.Authorization}`
                    },
                    data,
                    url
                })
            .then(response => {
                if (response.data.statusCode === 200) {
                    dispatch(uploadFile(response.data.data));
                    success(response.data.message)
                    return response;

                }
            });
    } catch (e) {
        console.error("Error", e.message);
        dispatch(apiFail(e.message))
    }
}


export const uploadImage = (nationalNo, data) => async dispatch => {
    dispatch(startApiCall());
    try {
        let url= MEDIA_URL + IMAGE_UPLOAD(nationalNo);
        let token = getTokenObject()
        await axios({
                    method: 'POST',
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryoRAaXrcAQtSGxtx7",
                        "Authorization" : `Bearer ${token.Authorization}`
                    },
                    data,
                    url
                })
            .then(response => {
                if (response.data.statusCode === 200) {
                    dispatch(uploadFile(response.data.data));
                    success(response.data.message)
                    return response;

                }
            });
    } catch (e) {
        console.error("Error", e.message);
        dispatch(apiFail(e.message))
    }
}


export const downloadAttachment = (url) => async dispatch => {
    dispatch(clearAttachmentFile());
    try{
        await api
            .get(url)
            .then( response => {
                // const href = URL.createObjectURL(response.data)
                dispatch(setAttachmentFile({href: response.data.data, name: url.split("/").pop()}))
            });
    }   catch (e){
            console.error(e.message);
    }
}

