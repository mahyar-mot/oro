import {createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import { DASHBOARD } from "../../utils/constants";


let initialState={
    openMenu:false,
    activeSelectedKey:"",
    activeOpenKeys: [""],
    dashboardStatsCallTime: 0,
    dashboardStats: {
        content: false,
        fileStorage: false
    }
}

const menuControl = createSlice({
    name: "menuControl",
    initialState,
    reducers: {
        ChangeMenu: (state,action) => {
         state.openMenu = action.payload;
        },
        ChangeActiveSelectedKey: (state, action) => {
            state.activeSelectedKey = action.payload
            state.activeOpenKeys = [""]
            // sub1
            if (["5", "6"].includes(action.payload)) state.activeOpenKeys = ["sub1"]
            if (["3", "16", "22"].includes(action.payload)) state.activeOpenKeys = ["sub2", "sub2-1"]
            if (["10", "11", "17"].includes(action.payload)) state.activeOpenKeys = ["sub2", "sub2-2"]
            if (["14", "15"].includes(action.payload)) state.activeOpenKeys = ["sub3"]
            if (["21", "23", "24", "25", "26"].includes(action.payload)) state.activeOpenKeys = ["sub4"]
        },
        setDashboardStats: (state, action) => {
            state.dashboardStatsCallTime = Date.now() / 1000 | 0
            state.dashboardStats = action.payload
        }
    },
});


export default menuControl.reducer;
export const { ChangeMenu, ChangeActiveSelectedKey, setDashboardStats } = menuControl.actions;


export const getDashboardStats = () => async dispatch => {
    try{
        await api
            .get(DASHBOARD)
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setDashboardStats(response.data.data))
                }
            });
    }   catch (e){
            console.error(e.message);
            // dispatch(hasError(e.message))
    }

}
