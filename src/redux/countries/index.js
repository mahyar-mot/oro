import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {COUNTRY_DIVISIONS,COUNTRY_DETAIL,COUNTRY_DIVISIONS_ALL, COUNTRY_DIVISIONS_ZONES} from '../../utils/constants';

// Slice

const initialState = {
    countries: [],
    allCountries: [],
    isLoading: false,
    error: undefined,
    ostan: undefined,
    shahrestan: undefined,
    bakhsh: undefined,
    shahr: undefined,
    roosta: undefined,
};


const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        startApiCall: state => {
            state.isLoading = true
        },
        setCountries: (state, action) => {
            state.countries = action.payload
            state.isLoading = false
        },
        apiFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        cleanCountries: (state) => {
            state.countries = []
        },
        cleanCountriesStates: state => {
            state.countries = []
            state.allCountries = []
            state.isLoading = false
            state.error = undefined
            state.ostan = undefined
            state.shahrestan = undefined
            state.bakhsh = undefined
            state.shahr = undefined
            state.roosta = undefined
        },
        setAllCountries: (state, action) => {
            state.isLoading = false
            state.allCountries = action.payload
        },
        setCountriesDivisions: (state, action) => {
            state.isLoading = false
            switch (action.payload.index){
                case 1:
                    state.ostan = action.payload.response
                    // state.shahrestan = undefined
                    // state.bakhsh = undefined
                    // state.shahr = undefined
                    // state.roosta = undefined
                    break;
                case 2:
                    state.shahrestan = action.payload.response
                    // state.bakhsh = undefined
                    // state.shahr = undefined
                    // state.roosta = undefined
                    break;
                case 3:
                    state.bakhsh = action.payload.response
                    // state.shahr = undefined
                    // state.roosta = undefined
                    break;
                case 4:
                    state.shahr = action.payload.response
                    // state.roosta = undefined
                    break;
                case 5:
                    state.roosta = action.payload.response
                    break;
            }
        }
    },
});


export default countriesSlice.reducer;


// Actions

const { startApiCall, setCountries, apiFail, setCountriesDivisions, setAllCountries } = countriesSlice.actions;

export const { cleanCountries, cleanCountriesStates } = countriesSlice.actions;


export const getCountries = (parentId) => async dispatch => {
    dispatch(startApiCall())
    try{
        await api
            .get(COUNTRY_DIVISIONS(parentId))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setCountries(response.data.data))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(apiFail(e.message))
    }
}

export const getCountriesWithZones = (parentId) => async dispatch => {
    dispatch(startApiCall())
    try{
        await api
            .get(COUNTRY_DIVISIONS_ZONES(parentId))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setCountries(response.data.data))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(apiFail(e.message))
    }
}

export const getCountriesDivisionsWithZone = (countryCodes) => async dispatch => {
    countryCodes.forEach((element, index) => {
        if (index > 0) dispatch(getSingleCountryZone(element, index))
    });
}


export const getSingleCountryZone = (id, index) => async dispatch => {
    dispatch(startApiCall())
    try{
        await api
        .get(COUNTRY_DETAIL(id))
        .then( response => {
            if (response.data.statusCode === 200){
                    dispatch(setCountriesDivisions({index, response: response.data.data}))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(apiFail(e.message))
    }
}


export const getCountriesDivisions = (countryCodes) => async dispatch => {
    countryCodes.forEach((element, index) => {
        if (index > 0) dispatch(getSingleCountry(element, index))
    });
}


export const getSingleCountry = (id, index) => async dispatch => {
    dispatch(startApiCall())
    try{
        await api
        .get(COUNTRY_DETAIL(id))
        .then( response => {
            if (response.data.statusCode === 200){
                    dispatch(setCountriesDivisions({index, response: response.data.data}))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(apiFail(e.message))
    }
}


export const getAllCountries = (parentId) => async dispatch => {
    dispatch(startApiCall())
    try{
        await api
            .get(COUNTRY_DIVISIONS_ALL(parentId))
            .then( response => {
                if (response.data.statusCode === 200){
                    dispatch(setAllCountries(response.data.data))
                }
            });
    }   catch (e){
            console.error(e.message);
            dispatch(apiFail(e.message))
    }
}
