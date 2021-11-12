import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { getTokenClaims } from '../../redux/auth';


export function useTokenClaims(redirectUser=true){

    const dispatch = useDispatch()
    const {countryDivisionCode, roles,nationalNumber} = useSelector(state => state.auth)

    const [state, setState] = useState({countryDivisionCode: countryDivisionCode, roles: [],nationalNumber:nationalNumber});

    useEffect(() => {
        if (!countryDivisionCode){
            dispatch(getTokenClaims(redirectUser))
        }if (!roles.length){
            dispatch(getTokenClaims(redirectUser))
        }
        if (!nationalNumber){
            dispatch(getTokenClaims(redirectUser))
        }
        setState({countryDivisionCode: countryDivisionCode, roles: roles,nationalNumber:nationalNumber})
    }, [countryDivisionCode, roles,nationalNumber])

    return state
}
