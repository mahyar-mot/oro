import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {setToken, removeToken} from "../../utils/utils";
// import userManager from '../../utils/userService';
import {USER_PROFILE} from '../../utils/constants';


const initialUserState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {
    isLoggedIn: true,
    nationalNumber: undefined,
}

// Slice

const initialState = {
    ...initialUserState,
    countryDivisionCode: undefined,
    roles: [],
    userProfile: {
        assignmentTitle: 1
    },
    apiHasCalled: false
};


const authSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            setToken(action.payload.accessToken)
            state.nationalNumber = action.payload.nationalNumber
            state.countryDivisionCode = action.payload.countryDivisionCode
            state.isLoggedIn = true
            localStorage.setItem('user', JSON.stringify({isLoggedIn: true, nationalNumber: action.payload.nationalNumber}))
        },
        logoutUser: (state) =>{
            localStorage.removeItem('user')
            state.isLoggedIn = false
            state.nationalNumber = undefined
            state.countryDivisionCode = undefined
            state.userProfile = {
                assignmentTitle: 1
            }
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload
            state.apiHasCalled = true
        },
        setTokenClaims: (state, action) => {
            state.countryDivisionCode = action.payload.countryDivisionsCode
            if (action.payload?.role){
                state.roles = action.payload.role
            }
        }
    },
});


export default authSlice.reducer;


// Actions

const { loginUser, setUserProfile } = authSlice.actions;
export const {logoutUser, setTokenClaims} = authSlice.actions


export const setUserToken = (response) => async dispatch => {
    if (response.access_token){
        dispatch(loginUser({
            accessToken: response.access_token,
            nationalNumber: response.profile.national_number,
            countryDivisionCode: response.profile.countryDivisionsCode
        }))
    }
}


export const logOut = () => async dispatch => {
    try {
        // await userManager
        //     .signoutRedirect()
        //     .then( result => {
        //         removeToken()
        //         userManager.clearStaleState()
        //     })
    } catch (e) {
        console.error(e.message);
    }
}


export const getUserProfile = (nationalNo) => async dispatch => {
    try{
        await api
            .get(USER_PROFILE(nationalNo))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setUserProfile(response.data.data))
                }
            });
    }   catch (e){
            console.error(e.message);
            // dispatch(hasError(e.message))
    }
}

export const getTokenClaims = (redirectUser) => async dispatch => {
    try{
        // await userManager
        //     .getUser()
        //     .then( user => 
        //         {
        //             if (user){
        //                 dispatch(setTokenClaims(user.profile))
        //             }else if(redirectUser){
        //                 dispatch(logoutUser())
        //                 setTimeout( () => userManager.signinRedirect(), 500)
        //             }
        //         }
        //     )
    }   catch (e){
            console.error(e.message);
            // dispatch(hasError(e.message))
    }
}
