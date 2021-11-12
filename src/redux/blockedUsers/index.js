import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {
    SUPERVISOR_SUSPEND_LIST, SUPERVISOR_SUSPEND_CANCEL,
    INSPECTOR_SUSPENDED_LIST, INSPECTOR_SUSPENDED_CANCEL
} from '../../utils/constants';
import { success } from "../../utils/message";
import { UrlQuery } from "../../utils/utils";


// Slice


const initialState = {
    blockedUsers: [],
    isLoading: false,
    isSuccess: false,
    listCount: undefined
};


const blockedUsersSlice = createSlice({
    name: "blockedUsers",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true
        },
        setBlockedUsers: (state, action) => {
            state.blockedUsers = action.payload
            state.isLoading = false
            state.isSuccess = false
        },
        activateBlockedUsers: state => {
            state.isLoading = false
            state.isSuccess = true
        },
        cleanBlockedUsers: state => {
            state.isLoading = false
            state.isSuccess = false
            state.blockedUsers = []
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        }
    },
});


export default blockedUsersSlice.reducer;


// Actions

const { setBlockedUsers, startLoading, setListCount, activateBlockedUsers } = blockedUsersSlice.actions;
export const { cleanBlockedUsers } = blockedUsersSlice.actions


export const getBlockedUsers = (query) => async dispatch => {
    dispatch(startLoading())
    try{
        await api
            .get(UrlQuery(SUPERVISOR_SUSPEND_LIST, query))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setBlockedUsers(response.data.data.userProfiles))
                    dispatch(setListCount(response.data.data.totalCount))
                }
            });
    }   catch (e){
            console.error(e.message);
            // dispatch(hasError(e.message))
    }
}

export const activateBlockedUser = (nationalNo) => async dispatch => {
    dispatch(startLoading())
    try{
        await api
            .post(SUPERVISOR_SUSPEND_CANCEL(nationalNo))
            .then( response => {
                if (response.data.statusCode === 200){
                    success(response.data.message)
                    dispatch(activateBlockedUsers())
                }
            });
    }   catch (e){
            console.error(e.message);
            // dispatch(hasError(e.message))
    }
}

export const getBlockedInspectors = (query) => async dispatch => {
    dispatch(startLoading())
    try{
        await api
            .get(UrlQuery(INSPECTOR_SUSPENDED_LIST, query))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setBlockedUsers(response.data.data.userProfiles))
                    dispatch(setListCount(response.data.data.totalCount))
                }
            });
    }   catch (e){
            console.error(e.message);
            // dispatch(hasError(e.message))
    }
}

export const activateBlockedInspector = (nationalNo) => async dispatch => {
    dispatch(startLoading())
    try{
        await api
            .post(INSPECTOR_SUSPENDED_CANCEL(nationalNo))
            .then( response => {
                if (response.data.statusCode === 200){
                    success(response.data.message)
                    dispatch(activateBlockedUsers())
                }
            });
    }   catch (e){
            console.error(e.message);
            // dispatch(hasError(e.message))
    }
}
