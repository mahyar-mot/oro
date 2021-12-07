import React from 'react';
import { Form, Input, Button, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken, setTokenClaims, logoutUser } from "../../redux/auth"
import {Querys} from '../../utils/utils';
import { FaUserCircle } from "react-icons/fa";
// import userManager from '../../utils/userService';
import { useLocation, useHistory } from 'react-router';


export default function Gallery(props) {

    const dispatch = useDispatch();
    const params = useLocation()
    const history = useHistory()

    const { isLoggedIn } = useSelector( state => state.auth )

    const [user, setUser] = React.useState(null);


    return (
        <div>
            <Row>
                
            </Row>
        </div>
    )
}

