import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/auth';
import { getBasicInfo } from '../../redux/basicInfos';
import { Row, Col, Button, Divider, Input} from 'antd';

import { AiOutlineSearch } from "react-icons/ai";
import Card from "../public/productCard";



export default function Filters(props) {

    const dispatch = useDispatch();
    const {isLoggedIn, nationalNumber, userProfile} = useSelector( state => state.auth );

    const history = useHistory()

    React.useEffect( () => {

    },[])

    return (
        <div className="d-flex flex-column">
            <div className="border border-rounded shadow-sm p-3 my-3 font-weight-bold">
                <h6>جست‌وجو در نتایج  </h6>
                <Input suffix={<AiOutlineSearch />} />
            </div>
            <div className="border border-rounded shadow-sm p-3 my-3 font-weight-bold">
                <h6>دسته‌بندی  </h6>

            </div>
            <div className="border border-rounded shadow-sm p-3 my-3 font-weight-bold">
                <h6>محدوده قیمت  </h6>
                
            </div>
            <div className="border border-rounded shadow-sm p-3 my-3 font-weight-bold">
                <h6>رنگ  </h6>
                
            </div>
            <div className="border border-rounded shadow-sm p-3 my-3">
                
            </div>
        </div>
    )
}

