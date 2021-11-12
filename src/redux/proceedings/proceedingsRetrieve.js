import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { PROCEEDINGS_DETAIL, PROCEEDINGS_FILES } from "../../utils/constants";


// Slice

const initialState = {
    proceeding: {},
    proceedingFiles: [],
    isLoading: false,
    error: false,
};


const proceedingsRetrieveSlice = createSlice({
    name: "proceedingsDetail",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setProceeding: (state, action) => {
            state.proceeding = action.payload;
            state.isLoading = false
        },
        setProceedingFiles: (state, action) => {
            state.proceedingFiles = action.payload
            state.isLoading = false
        },
        clearProceeding: (state) =>{
            state.proceeding = {}
            state.isLoading = false
            state.error = undefined
        }
    },
});


export default proceedingsRetrieveSlice.reducer;


// Actions


const { startLoading, hasError, setProceeding, setProceedingFiles } = proceedingsRetrieveSlice.actions;
export const { clearProceeding } = proceedingsRetrieveSlice.actions;


export const getProceeding = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(PROCEEDINGS_DETAIL(id))
            .then( response => {
                    dispatch(setProceeding(response.data.data))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const getProceedingFiles = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(PROCEEDINGS_FILES(id))
            .then( response => {
                    dispatch(setProceedingFiles(response.data.data))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}
