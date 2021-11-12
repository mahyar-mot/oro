import {createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {success} from '../../utils/message';
import {PROCEEDINGS_LIST} from "../../utils/constants";


// Slice

const initialState = {
    proceeding: {},
    isLoading: false,
    error: undefined,
    isSuccess: false
};


const proceedingsCreateSlice = createSlice({
    name: "proceedingsCreate",
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
            state.isSuccess = true
        },
        clearProceedingCreate: state => {
            state.error = undefined;
            state.isLoading = false
            state.isSuccess = false
            state.proceeding = {}
        },
    },
});


export default proceedingsCreateSlice.reducer;


// Actions


const {
    startLoading,
    hasError,
    setProceeding,
} = proceedingsCreateSlice.actions;
export const { clearProceedingCreate } = proceedingsCreateSlice.actions;


export const createProceeding = (payload) => async dispatch => {
    dispatch(startLoading());
    try {
        await api
            .post(PROCEEDINGS_LIST, JSON.stringify(payload))
            .then(response => {
                if (response.data.statusCode === 200) {
                    dispatch(setProceeding(true))
                    success(response.data.message)
                }
            });
    } catch (e) {
        console.error(e.message);
        dispatch(hasError(e.message))
    }
}
