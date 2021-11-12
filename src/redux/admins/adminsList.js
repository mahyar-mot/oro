import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { ADMINS_LIST, ROLES_LIST } from "../../utils/constants";
import { UrlQuery } from "../../utils/utils";


// Slice

const initialState = {
    adminsList: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
    rolesList: [],
};


const adminsListSlice = createSlice({
    name: "adminsList",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setAdminsList: (state, action) => {
            state.adminsList = action.payload;
            state.isLoading = false
        },
        resetAdminsList: (state) => {
            state.adminsList = []
            state.isLoading = false
            state.error = undefined
            state.rolesList = []
        },
        setRolesList: (state, action) => {
            state.rolesList = action.payload
            state.isLoading = false
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        },
    },
});


export default adminsListSlice.reducer;


// Actions


const { startLoading, hasError, setAdminsList, resetAdminsList, setListCount, setRolesList } = adminsListSlice.actions;


export const getAdminsList = (querys) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(UrlQuery(ADMINS_LIST, querys))
            .then( response => {
                if (response.data.statusCode === 200 && response.data.data){
                    dispatch(setAdminsList(response.data.data))
                    dispatch(setListCount(response.data.data.length))
                }
                return response;
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
        return e;
    }

}


export const getRolesList = () => async dispatch => {
    dispatch(startLoading())
    try{
        await api
            .get(ROLES_LIST)
            .then( res => {
                if (res.data.statusCode === 200){
                    let result = []
                    if (res.data.data.data.roles.length){
                        result = res.data.data.data.roles.map( item => ({...item, label: item.displayName, value: item.name}) )
                    }
                    dispatch(setRolesList(result))
                }
            })
    }catch {

    }
}


export const cleanAdminsList = () => async dispatch => {
    dispatch(resetAdminsList())
}

