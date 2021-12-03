import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/auth';
import { getBasicInfo } from '../../redux/basicInfos';
import Landing from "./landing";
import Collections from "./collections";
import { Row, Col, Button} from 'antd';
import Slider from "./slider";


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
        <div className="text-right p-0 px-xl-5 px-0 py-xl-0">
            <Landing />
            <Collections />
        </div>
    )
}

