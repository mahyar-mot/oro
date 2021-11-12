import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {CONTENTS_DETAIL, CONTENTS_VIEWER } from "../../utils/constants";
import { success } from "../../utils/message";


// Slice

const initialState = {
    content: {},
    isLoading: false,
    error: false,
    viewerApiCalled: [],
    contentViewersList: [],
    attachmentFile: null,
    isDone: false
};


const contentRetrieveSlice = createSlice({
    name: "contentDetail",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setContent: (state, action) => {
            state.content = action.payload;
            state.isLoading = false
        },
        cleanContent: (state) =>{
            state.content = {}
            state.isLoading = false
            state.error = undefined
            state.attachmentFile = null
            state.isDone = false
        },
        setViewerApi: (state, action) => {
            state.viewerApiCalled = [...state.viewerApiCalled, action.payload]
        },
        setContentViewerList: (state, action) => {
            state.isLoading = false
            state.contentViewersList = action.payload
        },
        cleanContentViewerList: state => {
            state.contentViewersList = []
        },
        getAttachmentFile: (state, action) => {
            state.attachmentFile = action.payload
            state.isDone = true
        },
        clearAttachmentFile: (state) => {
            state.attachmentFile = null
            state.isDone = false
        }
    },
});


export default contentRetrieveSlice.reducer;


// Actions


const { 
    startLoading, 
    hasError, 
    setContent, 
    cleanContent, 
    setViewerApi, 
    setContentViewerList, 
    cleanContentViewerList, 
    getAttachmentFile, 
    // clearAttachmentFile: resetAttachment 
} = contentRetrieveSlice.actions;
export const { clearAttachmentFile } = contentRetrieveSlice.actions


export const getContent = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(CONTENTS_DETAIL(id))
            .then( response => {
                    dispatch(setContent(response.data.data))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const resetContent = () => async dispatch => {
    dispatch(cleanContent());
}


export const setContentViewer = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(CONTENTS_VIEWER(id))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setViewerApi(id))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const getContentViewer = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(CONTENTS_VIEWER(id))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setContentViewerList(response.data.data.data))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const resetContentViewerList = () => async dispatch => {
    dispatch(cleanContentViewerList());
}


export const deleteContent = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .delete(CONTENTS_DETAIL(id))
            .then( response => {
                   success("محتوا غیر فعال شد")
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const downloadAttachment = (url) => async dispatch => {
    dispatch(clearAttachmentFile());
    try{
        await api
            .get(url)
            .then( response => {
                // const href = URL.createObjectURL(response.data)
                dispatch(getAttachmentFile({href: response.data.data, name: url.split("/").pop()}))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}
