import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/auth';
import { getBasicInfo } from '../../redux/basicInfos';
import {Button} from 'antd'
import Slider from "./slider"


export default function Home(props) {

    const dispatch = useDispatch();
    const {isLoggedIn, nationalNumber, userProfile} = useSelector( state => state.auth );

    const history = useHistory()

    React.useEffect( () => {
        if (isLoggedIn){
            dispatch(getUserProfile(nationalNumber))
            dispatch(getBasicInfo())
        }
    },[])

    React.useEffect( () => {
        if (Object.keys(userProfile).length){
            switch (userProfile.stateType) {
                case 1:
                    setTimeout( () => history.push("/waitinguser"), 1000)
                    break;
                case 2:
                    if (userProfile.profileStatusDto.length && userProfile.profileStatusDto[0].statusType === 5){
                        setTimeout( () => history.push("/cartable"), 1000)
                    }else if (userProfile.profileStatusDto.length > 1 && userProfile.profileStatusDto[1].statusType === 5){
                        setTimeout( () => history.push("/cartable"), 1000)
                    }
                    else{
                        setTimeout( () => history.push("/waitinguser"), 1000)
                    }
                    break;
                case 3:
                    history.push("/notfound")
                    break;
                // case 4:
                //     history.push("/waitinguser")
                //     break;
                // case 5:
                //     setTimeout( () => history.push("/overseers"), 1000)
                //     break;
                // case 6:
                //     history.push("/waitinguser")
                //     break;
                default:
                    setTimeout( () => history.push("/"), 1000)
                    break;
            }
        }
    },[userProfile])

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "300px"}}>
            <h3> <Button type="primary">دنیای اورو رو کشف کن</Button></h3>
            dddd
            <Slider />
        </div>
    )
}

