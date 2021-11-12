import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {ADMIN_DETAIL, ADMIN_DETAIL_ROLE, ADMIN_DETAIL_SEARCH, USER_ROLES_CREATE} from "../../utils/constants";
import { success } from '../../utils/message';



// Slice

const initialState = {
    admin: {},
    isLoading: false,
    error: false,
    adminRoles: [],
    roleSuccess: false
};


const adminRetrieveSlice = createSlice({
    name: "adminDetail",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setAdmin: (state, action) => {
            state.admin = action.payload;
            state.isLoading = false
        },
        cleanAdmin: (state) =>{
            state.admin = {}
            state.isLoading = false
            state.error = undefined
            state.adminRoles = []
            state.roleSuccess = false
        },
        setRoleSuccess: state => {
            state.isLoading = false
            state.roleSuccess = true
        },
        setAdminRoles: (state, action) => {
            state.isLoading = false
            state.adminRoles = action.payload
        }
    },
});


export default adminRetrieveSlice.reducer;


// Actions


const { startLoading, hasError, setAdmin, cleanAdmin, setAdminRoles, setRoleSuccess } = adminRetrieveSlice.actions;


export const getAdmin = (nationalNo) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(ADMIN_DETAIL_SEARCH(nationalNo))
            .then( response => {
                if (response.data?.data){
                    dispatch(setAdmin(response.data?.data))
                }else{
                    dispatch(setAdmin({}))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const getAdminRole = (nationalNo) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .get(ADMIN_DETAIL_ROLE(nationalNo))
            .then( response => {
                    dispatch(setAdminRoles(response.data.data.data))
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}


export const updateAdmin = (nationalNo, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .put(ADMIN_DETAIL(nationalNo), JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    // dispatch(setAdmin(response.data.data))
                    api.post(USER_ROLES_CREATE(payload.nationalNo), payload.roles).then(
                        res => {
                            if (res.data.statusCode === 200){
                                dispatch(setRoleSuccess())
                                 success(response.data.message)
                            }
                        }
                    ).catch( error => console.error(error))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }

}


export const resetAdmin = () => async dispatch => {
    dispatch(cleanAdmin());
}

