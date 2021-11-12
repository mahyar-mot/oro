import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import {CANDIDATES_UPDATE} from "../../utils/constants";


// Slice

const initialState = {
    candidate: {},
    isLoading: false,
    error: undefined,
    isSuccess: false,
};


const candidateUpdateSlice = createSlice({
    name: "candidateUpdate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        updateCandidate: (state, action) => {
            state.candidate = action.payload;
            state.isSuccess = true
            state.isLoading = false
        },
        cleanCandidateUpdate: state => {
            state.candidate = {}
            state.isLoading = false
            state.isSuccess = false
            state.error = undefined
        }

    },
});


export default candidateUpdateSlice.reducer;


// Actions


const { startLoading, hasError, updateCandidate } = candidateUpdateSlice.actions;
export const { cleanCandidateUpdate } = candidateUpdateSlice.actions;


export const candidateUpdate = (payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(CANDIDATES_UPDATE, JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(updateCandidate(response.data.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


// export const candidateDelete = (id) => async dispatch => {
//     dispatch(startLoading());
//     try{
//         await api
//             .delete(CANDIDATES_UPDATE(id))
//             .then( response => {
//                 if (response.data.statusCode === 200){
//                     dispatch(updateCandidate({}))
//                     success(response.data.message)
//                 }
//             });
//     }   catch (e){
//             console.error(e.message);
//             dispatch(hasError(e.message))
//     }
// }
