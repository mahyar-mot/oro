import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {CANDIDATES_DETAIL} from "../../utils/constants";


// Slice

const initialState = {
    candidate: {},
    isLoading: false,
    error: false,
};


const candidateRetrieveSlice = createSlice({
    name: "candidateDetail",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setCandidate: (state, action) => {
            state.candidate = action.payload;
            state.isLoading = false
        },
        cleanCandidate: (state) =>{
            state.candidate = {}
            state.isLoading = false
            state.error = undefined
        }
    },
});


export default candidateRetrieveSlice.reducer;


// Actions


const { startLoading, hasError, setCandidate, cleanCandidate } = candidateRetrieveSlice.actions;


export const getCandidate = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(CANDIDATES_DETAIL(id))
            .then( response => {
                    dispatch(setCandidate(response.data.data))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const resetCandidate = () => async dispatch => {
    dispatch(cleanCandidate());
}

