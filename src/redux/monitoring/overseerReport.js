import {createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {MONITORING_REPORT_OVERSEER} from "../../utils/constants";
import {UrlQuery} from "../../utils/utils";


// Slice

const initialState = {
    total: {},
    listMonitoring: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
};


const overseerListSlice = createSlice({
    name: "overseerReport",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setList: (state, action) => {
            state.listMonitoring = action.payload;
            state.isLoading = false
        },
        setTotal: (state, action) => {
            state.total = action.payload;
            state.isLoading = false
        },
        resetList: (state) => {
            state.listMonitoring = []
            state.total ={}
            state.isLoading = false
            state.error = undefined
        },
        setListCount: (state, action) => {
            state.listCount = action.payload
        },
    },
});


export default overseerListSlice.reducer;


// Actions


const {startLoading, hasError, setList, resetList, setListCount,setTotal} = overseerListSlice.actions;


export const getMonitoringOverseerReport = (countryCode, querys) => async dispatch => {
    // dispatch(resetList())
    dispatch(startLoading());
    try {
        await api
            .get(UrlQuery(MONITORING_REPORT_OVERSEER(countryCode), querys))
            .then(response => {
                if (response.data.statusCode === 200) {
                    dispatch(setList(response.data.data.selectItems))
                    dispatch(setListCount(response.data.data.totalCount))
                    dispatch(setTotal(response.data.data))
                }
                // return response;
            });
    } catch (e) {
        console.error(e.message);
        dispatch(hasError(e.message))
        // return e;
    }

}
export const cleanList = () => async dispatch => {
    dispatch(resetList())
}



