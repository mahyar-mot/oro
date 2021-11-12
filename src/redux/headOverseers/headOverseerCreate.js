import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import {HEADSUPERVISOR_CREATE} from "../../utils/constants";


// Slice

const initialState = {
    headOverseer: {},
    isLoading: false,
    error: undefined,
    isSuccess: false
};


const headOverseerCreateSlice = createSlice({
    name: "headOverseerCreate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setHeadOverseer: (state, action) => {
            state.headOverseer = action.payload;
            state.isLoading = false
            state.isSuccess = true
        },
        cleanHeadOverseer: (state) => {
            state.headOverseer = {}
            state.isLoading = false
            state.isSuccess = false
        }
    },
});


export default headOverseerCreateSlice.reducer;


// Actions


const { startLoading, hasError, setHeadOverseer } = headOverseerCreateSlice.actions;
export const {cleanHeadOverseer} = headOverseerCreateSlice.actions;

export const createHeadOverseer = (payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(HEADSUPERVISOR_CREATE, JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setHeadOverseer(response.data.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}
