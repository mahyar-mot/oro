import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {USER_REGISTRATION, USER_PROFILE, PROTEST_CREATE} from '../../utils/constants';
import { success } from '../../utils/message'

// Slice

const initialState = {
    newUser: {},
    isLoading: false,
    error: undefined,
    isSuccess: false,
    protestTrackCode: undefined
};


const newUserSlice = createSlice({
    name: "newUser",
    initialState,
    reducers: {
        startApiCall: state => {
            state.isLoading = true
        },
        setUser: (state, action) => {
            state.newUser = action.payload
            state.isLoading = false
        },
        updateUser: (state, action) => {
            state.isLoading = false
            state.newUser = action.payload
            state.isSuccess = true
        },
        apiFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        resetUser: (state, action) => {
            state.isLoading = false
            state.newUser = {}
            state.isSuccess = false
            state.protestTrackCode = undefined
        },
        setUserProtestTrackCode: (state, action) => {
            state.isLoading = false
            state.protestTrackCode = action.payload
        }
    },
});


export default newUserSlice.reducer;


// Actions

const { startApiCall, setUser, apiFail, updateUser, setUserProtestTrackCode } = newUserSlice.actions;
export const { resetUser } = newUserSlice.actions


export const getNewUser = (nationalNo) => async dispatch => {
    dispatch(startApiCall());
    try{
        await api
            .get(USER_PROFILE(nationalNo))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setUser(response.data.data));
                }
            });
    }   catch (e){
            console.error("Error", e.message);
            dispatch(apiFail(e.message))
    }
}


export const updateCurrentUser = (nationalNo, payload) => async dispatch => {
    dispatch(startApiCall());
    try{
        await api
            .put(USER_REGISTRATION(nationalNo), payload)
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(updateUser(response.data.data));
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error("Error", e.message);
            dispatch(apiFail(e.message))
    }
}


export const sendUserProtest = (payload) => async dispatch => {
    dispatch(startApiCall());
    try{
        await api
            .post(PROTEST_CREATE, payload)
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setUserProtestTrackCode(response.data.data));
                    success(response.data.message)
                }
            });
    }   catch (e){
            console.error("Error", e.message);
            dispatch(apiFail(e.message))
    }
}
