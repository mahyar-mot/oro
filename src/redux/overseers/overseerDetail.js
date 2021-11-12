import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {SUPERVISOR_DETAIL} from "../../utils/constants";


// Slice

const initialState = {
    overseerDetail: {},
    isLoading: false,
    error: false,
};


const overseerDetailSlice = createSlice({
    name: "overseerDetail",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setOverseerDetail: (state, action) => {
            state.overseerDetail = action.payload;
            state.isLoading = false
        },
        setOverseerStatus: (state, action) => {
            switch (action.payload.status){
                case 5:
                    state.overseerDetail.profileStatusDto[0].statusType = 5
                    break;
                case 6:
                    // state.overseerDetail.profileStatusDto[0].statusType = 6
                    state.overseerDetail.profileStatusDto[0].actionDescription = action.payload.description
                    break;
                case 7:
                    state.overseerDetail.stateType = 3
                    state.overseerDetail.profileStatusDto[0].statusType = 7
                    break
            }
        },
        cleanOverseerDetail: (state, action) =>{
            state.overseerDetail = {}
            state.isLoading = false
            state.error = undefined
        }
    },
});


export default overseerDetailSlice.reducer;


// Actions


const { startLoading, hasError, setOverseerDetail, cleanOverseerDetail } = overseerDetailSlice.actions;
export const { setOverseerStatus } = overseerDetailSlice.actions;


export const getOverseer = (id) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(SUPERVISOR_DETAIL(id))
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
                    dispatch(setOverseerDetail(response.data.data))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const cleanOverseer = () => async dispatch => {
    dispatch(cleanOverseerDetail());
}


