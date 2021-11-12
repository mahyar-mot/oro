import * as actionType from "./actionType";
import {setToken, removeToken} from '../utils/utils';
import {success} from '../utils/message';
// import userManager from '../utils/userService';


export default (state={pageMenu:false}, action) => {
    switch (action.type) {
        case actionType.USER_LOGGED_IN:
            document.cookie = "token=" + action.payload.access_token;
            setToken(action.payload.access_token);
            success('با موفقیت وارد شدید')
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.access_token
            };

        case actionType.USER_LOGGED_OUT:
            removeToken();
            // userManager.clearStaleState();
            success('از حساب خارج شدید')
            return {
                ...state,
                isLoggedIn: false,
                userName: null,
            };

        case actionType.SET_ACTIVE_PROJECT:
            return {
                ...state,
                activeProject: action.payload
            };

        case actionType.SET_ACTIVE_TAG_PROJECT:
            return {
                ...state,
                activeTagProject: action.payload
            };

        case actionType.SET_USER_PROFILE_NAME:

            return {
                ...state,
                userName: action.payload.username,
                groups: action.payload.groups[0],
                // userName: action.payload.first_name + " " + action.payload.last_name
            }

        case actionType.SET_POST_LIST:
            return {
                ...state,
                postList: action.payload
            }

        case actionType.SET_POST:
            return {
                ...state,
                postList: state.postList.map(post => {
                    if (post.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return post;
                    }
                })
            }

        default:
            return state;
    }
};