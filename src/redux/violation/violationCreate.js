import {createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {success} from '../../utils/message';
import {
    VIOLATION_TYPES,
    VIOLATION_LIST,
    UPDATE_VIOLATION,
    VIOLATION_FILES,
    GET_VIOLATION_UPDATE
} from "../../utils/constants";


// Slice

const initialState = {
    violationType: [],
    violationUpdate: [],
    violationFiles: [],
    isLoading: false,
    error: undefined,
    resultCreateViolation: false
};


const complaintsCreateSlice = createSlice({
    name: "complaintCreate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setViolationType: (state, action) => {
            state.violationType = action.payload;
            state.isLoading = false
        },
        setViolationUpdate: (state, action) => {
            state.violationUpdate = action.payload;
            state.isLoading = false
        },
        setViolationFiles: (state, action) => {
            state.violationFiles = action.payload;
            state.isLoading = false
        },
        setCreateViolation: (state, action) => {
            state.resultCreateViolation = action.payload;
            state.isLoading = false
        },
        resetCreateViolation: (state, action) => {
            state.resultCreateViolation = action.payload;
            state.isLoading = false
            state.violationUpdate = []
            state.violationFiles = []
        },
    },
});


export default complaintsCreateSlice.reducer;


// Actions


const {
    startLoading,
    hasError,
    setViolationType,
    setCreateViolation,
    resetCreateViolation,
    setViolationUpdate,
    setViolationFiles
} = complaintsCreateSlice.actions;

export const getViolationType = () => async dispatch => {
    dispatch(startLoading());
    try {
        await api
            .get(VIOLATION_TYPES)
            .then(response => {
                if (response.data.statusCode === 200) {
                    dispatch(setViolationType(response.data.data))
                    // success(response.data.message)
                }
            });
    } catch (e) {
        console.error(e.message);
        dispatch(hasError(e.message))
    }
}
export const getViolationUpdate = (id) => async dispatch => {
    dispatch(startLoading());
    try {
        await api
            .get(GET_VIOLATION_UPDATE(id))
            .then(response => {
                if (response.data.statusCode === 200) {
                    dispatch(setViolationUpdate(response.data.data))
                    // success(response.data.message)
                }
            });
        await api
            .get(VIOLATION_FILES(id))
            .then(response => {
                if (response.data.statusCode === 200) {

                    dispatch(setViolationFiles(response.data.data))
                    // success(response.data.message)
                }
            });
    } catch (e) {
        console.error(e.message);
        dispatch(hasError(e.message))
    }
}

export const createViolation = (payload) => async dispatch => {
    dispatch(startLoading());
    try {
        await api
            .post(VIOLATION_LIST, JSON.stringify(payload))
            .then(response => {
                if (response.data.statusCode === 200) {
                    dispatch(setCreateViolation(true))
                    // success(response.data.message)
                }
            });
    } catch (e) {
        console.error(e.message);
        dispatch(hasError(e.message))
    }
}
export const updateViolation = (id, payload) => async dispatch => {
    dispatch(startLoading());
    try {
        await api
            .put(UPDATE_VIOLATION(id), JSON.stringify(payload))
            .then(response => {
                if (response.data.statusCode === 200) {
                    dispatch(setCreateViolation(true))
                    // success(response.data.message)
                }
            });
    } catch (e) {
        console.error(e.message);
        dispatch(hasError(e.message))
    }
}


export const cleanCreateViolation = () => async dispatch => {
    dispatch(resetCreateViolation(false))
}