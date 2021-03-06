import React from 'react';
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken, setTokenClaims, logoutUser } from "../../redux/auth"
import {Querys} from '../../utils/utils';
import { FaUserCircle } from "react-icons/fa";
// import userManager from '../../utils/userService';
import { useLocation, useHistory } from 'react-router';


export default function Login(props) {

    const dispatch = useDispatch();
    const params = useLocation()
    const history = useHistory()

    const { isLoggedIn } = useSelector( state => state.auth )

    const [user, setUser] = React.useState(null);

    // const getUser = () => {
    //     let user = null;
    //     (async () => { 
    //         user = await userManager.getUser()
    //     })()
    //     return user
    // }

    React.useEffect( () => {
        // userManager.clearStaleState()
        // if (!user){
        //     userManager.getUser().then( r => {
        //         if (r !== null){
        //             if ( r.expires_at - (Date.now() / 1000 | 0) > 0 ){
        //                 setUser(r.profile)
        //                 dispatch(setUserToken(r))
        //                 dispatch(setTokenClaims(r.profile))
        //                 setTimeout( () => history.push("/"), 3000)
        //             }else{
        //                 userManager.removeUser().then( res =>  attemptLogin() ).catch( er => console.log("PPPP",er))
        //             }
        //         }else{
        //             dispatch(logoutUser())
        //             setTimeout( () => attemptLogin(), 500)
        //         }
        //     }).catch( err => {
        //         console.log("#$##@$$", err);
        //     })
        // }else{
        //     setTimeout( () => history.push("/"), 3000)
        // }
    }, [])

    // React.useEffect(() => {
    //     // Check if user is invited by queryStrings
    //     let querys = Querys(params.search)

    //     if ('nationalNo' in querys && 'randomStr' in querys){
    //         // set it in localstorage
    //     }
    // }, [])

    const attemptLogin = () =>{
        // userManager.signinRedirectCallback()
        // .then(userResponse => {
        //     if (userResponse){
        //         dispatch(setUserToken(userResponse))
        //         if (userResponse.profile.national_number){ // check user profile
        //             setUser(userResponse.profile)
        //             dispatch(setTokenClaims(userResponse.profile))
        //             setTimeout( () => history.push("/"), 3000)
        //         }else{
        //             console.log("<<???????")
        //             // props.history.push("/dashboard")
        //         }
        //     }
        // })
        // .catch(error => {
        //     console.log("ERROR ATTEMPT LOGIN", error);
        //     if (String(error.message) === "No state in response" || String(error.message) === "No matching state found in storage"){
        //         if (!user){
        //             dispatch(logoutUser())
        //             setTimeout( () => userManager.signinRedirect(), 500)
        //         }
        //     }
        // });
    }

    // React.useEffect( () => {
    //     let isUser = getUser()
    //     console.log("HEEER222", isUser);
    //     userManager.signinRedirectCallback()
    //     .then(user => {
    //         window.history.replaceState({},
    //             window.document.title,
    //             window.location.origin + window.location.pathname
    //         );
    //         if (user){
    //             dispatch(setUserToken(user))
    //             if (user.profile.national_number){ // check user profile
    //                 props.history.push("/")
    //             }else{
    //                 // props.history.push("/dashboard")
    //             }
    //         }
    //     })
    //     .catch(error => {
    //         console.log("HEEER33333", error.message);
    //         if (String(error.message) === "No state in response" || String(error.message) === "No matching state found in storage"){
    //             if (!isUser){
    //                 userManager.signinRedirect()
    //             }
    //         }
    //     });
    // }, [])

    return (
        <div className="container-fluid">
            <div className="row justify-content-center my-5 py-5">
                <div className="col-lg-4 col-md-6 text-center login-card p-0 border border-rounded shadow-sm">
                    <div className="text-center position-relative">
                        <FaUserCircle size="4rem" className="position-absolute" style={{top: "-45px", right: "43%"}} />
                    </div>
                    <div className="login-body py-3 mx-auto">
                        <p className="text-bold font-gray-color">
                            ???????? ???? ???????? ????????????
                        </p>
                        <Form
                            name="login"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                            initialValues={{ remember: true }}
                            // onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="?????????? ????????????"
                                name="username"
                                rules={[{ required: true, message: '???????? ?????????? ???????????? ???? ???????? ????????' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="??????????????"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Form>
                        <small className="my-3 text-right pr-3 d-block">?????????????? ?????? ????????</small>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Button size="large" className=" ml-3 px-3" type="secondary" >?????????? ???????? ????????????</Button>
                <Button size="large" type="primary" className="px-3" >???????? ???? ????????</Button>
            </div>
        </div>
    )
}

Login.displayName="Login";
