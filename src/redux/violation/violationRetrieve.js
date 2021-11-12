import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {
    VIOLATION_DETAIL,VIOLATION_FILES,VIOLATION_COMMENTS,
    PEOPLE_VIOLATION_COMMENT, PEOPLE_VIOLATION_DETAIL, PEOPLE_VIOLATION_FILES} from "../../utils/constants";


// Slice

const initialState = {
    violation: {},
    files: [],
    comments:[],
    isLoading: false,
    error: false,
};


const violationRetrieveSlice = createSlice({
    name: "allViolationDetail",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setViolation: (state, action) => {
            state.violation = action.payload;
            state.isLoading = false
        },
        setFiles: (state, action) => {
            state.files = action.payload;
            state.isLoading = false
        },
        setComments: (state, action) => {
            state.comments = action.payload;
            state.isLoading = false
        },
        cleanViolation: (state) =>{
            state.violation = {}
            state.isLoading = false
            state.error = undefined
            state.files = []
            state.comments = []
        },
    },
});


export default violationRetrieveSlice.reducer;


// Actions


const { startLoading, hasError, setViolation, cleanViolation,setFiles ,setComments} = violationRetrieveSlice.actions;


export const getViolation = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(VIOLATION_DETAIL(id))
            .then( response => {
                    dispatch(setViolation(response.data.data))
            });
        await api
            .get(VIOLATION_FILES(id))
            .then( response => {
                if (response.data.data){
                    dispatch(setFiles(response.data.data))
                }
            });
        await api
            .get(VIOLATION_COMMENTS(id))
            .then( response => {
                dispatch(setComments(response.data.data.comments))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}
export const postComment = (id,payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(VIOLATION_COMMENTS(id), JSON.stringify(payload))
            .then( response => {
            });
        await api
            .get(VIOLATION_COMMENTS(id))
            .then( response => {
                dispatch(setComments(response.data.data.comments))
            });
        await api
            .get(VIOLATION_DETAIL(id))
            .then( response => {
                dispatch(setViolation(response.data.data))
            });
    }   catch (e){
        console.error(e.message);
        dispatch(hasError(e.message))
    }
}

export const resetViolation = () => async dispatch => {
    dispatch(cleanViolation());
}

export const getPeopleViolation = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(PEOPLE_VIOLATION_DETAIL(id))
            .then( response => {
                    dispatch(setViolation(response.data.data))
            });
        await api
            .get(PEOPLE_VIOLATION_FILES(id))
            .then( response => {
                if (response.data.data){
                    dispatch(setFiles(response.data.data))
                }
            });
        await api
            .get(PEOPLE_VIOLATION_COMMENT(id))
            .then( response => {
                dispatch(setComments(response.data.data.comments))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}

export const postPeopleComment = (id,payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(PEOPLE_VIOLATION_COMMENT(id), JSON.stringify(payload))
            .then( response => {
            });
        await api
            .get(PEOPLE_VIOLATION_COMMENT(id))
            .then( response => {
                dispatch(setComments(response.data.data.comments))
            });
        await api
            .get(PEOPLE_VIOLATION_DETAIL(id))
            .then( response => {
                dispatch(setViolation(response.data.data))
            });
    }   catch (e){
        console.error(e.message);
        dispatch(hasError(e.message))
    }
}
