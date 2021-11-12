import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { success } from '../../utils/message';
import {ADMINS_CREATE, USER_ROLES_CREATE} from "../../utils/constants";


// Slice

const initialState = {
    admin: {},
    isLoading: false,
    error: undefined,
    adminSuccess: false,
    roleSuccess: false,
};


const adminsCreateSlice = createSlice({
    name: "adminCreate",
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
            // state.isLoading = false
            state.adminSuccess = true
        },
        setRole: state => {
            state.roleSuccess = true
            state.isLoading = false
        },
        resetAdmin: state => {
            state.admin = {}
            state.isLoading = false
            state.adminSuccess = false
            state.roleSuccess = false
        }
    },
});


export default adminsCreateSlice.reducer;


// Actions


const { startLoading, hasError, setAdmin, resetAdmin, setRole } = adminsCreateSlice.actions;


export const createAdmin = (countryCode, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(ADMINS_CREATE(countryCode), JSON.stringify(payload))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setAdmin(response.data.data))
                    api.post(USER_ROLES_CREATE(payload.nationalNo), payload.roles).then(
                        res => {
                            if (res.data.statusCode === 200){
                                 success(response.data.message)
                                 dispatch(setRole())
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


export const assignAdminRole = (nationalNo, payload) => async dispatch => {
    dispatch(startLoading());
    try{
        await api
            .post(USER_ROLES_CREATE(nationalNo), JSON.stringify(payload))
            .then( response => { dispatch(setRole()) } )
        }
        catch (e){
            console.error(e.message);
            dispatch(hasError(e.message))
    }
}

export const cleanAdmin = () => async dispatch => {
    dispatch(resetAdmin())
}

