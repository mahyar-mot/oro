import {createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {success} from '../../utils/message';
import {
    PEOPLE_VIOLATION_LIST
} from "../../utils/constants";


// Slice

const initialState = {
    violation: {},
    isLoading: false,
    error: undefined,
    isSuccess: false
};


const peopleViolationCreateSlice = createSlice({
    name: "peopleViolationCreate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setPeopleViolation: (state, action) => {
            state.violation = action.payload;
            state.isLoading = false
            state.isSuccess = true
        },
        resetPeopleViolationCreate: state => {
            state.error = undefined;
            state.isLoading = false
            state.isSuccess = false
            state.violation = {}
        },
    },
});


export default peopleViolationCreateSlice.reducer;


// Actions


const {
    startLoading,
    hasError,
    setPeopleViolation,
} = peopleViolationCreateSlice.actions;
export const { resetPeopleViolationCreate } = peopleViolationCreateSlice.actions;


export const createPeopleViolation = (payload) => async dispatch => {
    dispatch(startLoading());
    try {
        await api
            .post(PEOPLE_VIOLATION_LIST, JSON.stringify(payload))
            .then(response => {
                if (response.data.statusCode === 200) {
                    dispatch(setPeopleViolation(true))
                    success(response.data.message)
                }
            });
    } catch (e) {
        console.error(e.message);
        dispatch(hasError(e.message))
    }
}
