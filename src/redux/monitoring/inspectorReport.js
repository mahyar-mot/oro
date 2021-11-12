import {createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {INSPECTOR_MONITORING_REPORT} from "../../utils/constants";
import {UrlQuery} from "../../utils/utils";


// Slice

const initialState = {
    total: {},
    listMonitoring: [],
    isLoading: false,
    error: undefined,
    listCount: 0,
};


const inspectorReportListSlice = createSlice({
    name: "inspectorReport",
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


export default inspectorReportListSlice.reducer;


// Actions


const {startLoading, hasError, setList, setListCount,setTotal} = inspectorReportListSlice.actions;
export const { resetList } = inspectorReportListSlice.actions;


export const getMonitoringInspectorReport = (countryCode, querys) => async dispatch => {
    // dispatch(resetList())
    dispatch(startLoading());
    try {
        await api
            .get(UrlQuery(INSPECTOR_MONITORING_REPORT(countryCode), querys))
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
