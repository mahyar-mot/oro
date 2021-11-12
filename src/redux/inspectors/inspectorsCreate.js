import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import {INSPECTOR_DETAIL, SUPERVISOR_EXCEL_VALIDATION, SUPERVISOR_EXCEL_INSERT} from "../../utils/constants";


// Slice

const initialState = {
    inspector: {},
    inspectorsExcel: {},
    isLoading: false,
    error: undefined,
    isSuccess: false
};


const inspectorCreateSlice = createSlice({
    name: "inspectorCreate",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setInspector: (state, action) => {
            state.inspector = action.payload;
            state.isLoading = false
            state.isSuccess = true
        },
        setInspectorsExcel: (state, action) => {
            state.isLoading = false
            state.inspectorsExcel = action.payload
        },
        cleanInspector: (state) => {
            state.inspector = {}
            state.inspectorsExcel = {}
            state.isLoading = false
            state.isSuccess = false
        }
    },
});


export default inspectorCreateSlice.reducer;


// Actions


const { startLoading, hasError, setInspector, setInspectorsExcel } = inspectorCreateSlice.actions;
export const {cleanInspector} = inspectorCreateSlice.actions;

export const createInspector = (nationalNo, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(INSPECTOR_DETAIL(nationalNo), JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setInspector(response.data.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}
export const createOverseerExcel = (countryCode, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(SUPERVISOR_EXCEL_VALIDATION(countryCode), JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setInspectorsExcel(response.data.data))
                    success(response.data.message)
                }
            });
    }   catch (e){
        console.error(e.message);
        dispatch(hasError(e.message))
    }

}

export const InsertOverseerExcel = (countryCode, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(SUPERVISOR_EXCEL_INSERT(countryCode), JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setInspector({}))
                    success(response.data.data)
                }
            });
    }   catch (e){
        console.error(e.message);
        dispatch(hasError(e.message))
    }

}
