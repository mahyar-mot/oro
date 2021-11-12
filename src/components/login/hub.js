// import React from 'react';
// import {Spin} from "antd";
// import { useDispatch } from "react-redux";
// import { setUserToken } from "../../redux/auth"
// import {Querys} from '../../utils/utils';
// import userManager from '../../utils/userService';
// import { useLocation } from 'react-router';


// export default function Login(props) {

//     const dispatch = useDispatch();
//     const params = useLocation()

//     const getUser = () => {
//         let user = null;
//         (async () => { user = await userManager.getUser()})()
//         return user
//     }

//     // React.useEffect(() => {
//     //     // Check if user is invited by queryStrings
//     //     let querys = Querys(params.search)

//     //     if ('nationalNo' in querys && 'randomStr' in querys){
//     //         // set it in localstorage
//     //     }
//     // }, [])
//     //
//     React.useEffect( () => {
//         let isUser = getUser()
//         userManager.signinRedirectCallback()
//         .then(user => {
//             window.history.replaceState({},
//                 window.document.title,
//                 window.location.origin + window.location.pathname
//             );
//             if (user){
//                 dispatch(setUserToken(user))
//                 if (user.profile.national_number){ // check user profile
//                     props.history.push("/")
//                 }else{
//                     // props.history.push("/dashboard")
//                 }
//             }
//         })
//         .catch(error => {
//             if (String(error.message) === "No state in response" || String(error.message) === "No matching state found in storage"){
//                 if (!isUser){
//                     userManager.signinRedirect()
//                 }
//             }
//         });
//     }, [])

//     return (
//         <div className="container-fluid">
//         <div className="row justify-content-center my-5 py-5">
//             <div className="col-md-6 text-center login-card p-0">
//                 <div className="login-header text-right">
//                     ورود به سامانه
//                 </div>
//                 <div className="login-body py-3 mx-auto">
//                     <p className="text-bold font-gray-color">
//                         سامانه ناظران
//                     </p>

//                     <Spin spinning={true} size="large" tip="در حال اعتبار سنجی ..." className="link-color"/>

//                 </div>
//             </div>
//         </div>
//         </div>
//     )
// }

// Login.displayName="Login";
