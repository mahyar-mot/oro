import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {INSPECTOR_DETAIL} from "../../utils/constants";


// Slice

const initialState = {
    inspectorDetail: {},
    isLoading: false,
    error: false,
};


const inspectorDetailSlice = createSlice({
    name: "inspectorDetail",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setInspectorDetail: (state, action) => {
            state.inspectorDetail = action.payload;
            state.isLoading = false
        },
        setInspectorStatus: (state, action) => {
            switch (action.payload.status){
                case 5:
                    state.inspectorDetail.profileStatusDto[0].statusType = 5
                    break;
                case 6:
                    // state.inspectorDetail.profileStatusDto[0].statusType = 6
                    state.inspectorDetail.profileStatusDto[0].actionDescription = action.payload.description
                    break;
                case 7:
                    state.inspectorDetail.stateType = 3
                    state.inspectorDetail.profileStatusDto[0].statusType = 7
                    break
            }
        },
        cleanInspectorDetail: (state, action) =>{
            state.inspectorDetail = {}
            state.isLoading = false
            state.error = undefined
        }
    },
});


export default inspectorDetailSlice.reducer;


// Actions


const { startLoading, hasError, setInspectorDetail } = inspectorDetailSlice.actions;
export const { setInspectorStatus, cleanInspectorDetail } = inspectorDetailSlice.actions;


export const getInspector = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(INSPECTOR_DETAIL(id))
            .then( response => {
                if (response.data.statusCode === 200){
                    let payload = response.data.data;
                    let countryDivisions = payload.countryDivisions;
                    if (countryDivisions.length){
                        countryDivisions.shift()
                        for (let i=0; i < countryDivisions.length; i++){
                           payload[`cityDiv-${i}`] = countryDivisions[i].name
                        }
                    }
                    dispatch(setInspectorDetail(response.data.data))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}
