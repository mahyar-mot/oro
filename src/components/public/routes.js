import Home from "../mainPage/home";
import Collections from "../collections/colectionsList";

import Login from "../login/login";
import SignUp from "../login/signUp";
import Product from "../product/product";
import ProfileSection from "../profile/prfileSection";
import UserOrders from "../profile/orders";


export default [
    { path: "/", name: "خانه", Component: Home, loginRequired: false },
    { path: "/collections/", name: "کالکشن", Component: Collections, loginRequired: false},
    { path: "/login", name: "ورود", Component: Login, loginRequired: false },
    { path: "/signup", name: "ثبت‌نام", Component: SignUp, loginRequired: false },
    { path: "/product", name: "محصول", Component: Product, loginRequired: false },
    // { path: "/overseers", name: "ناظران", Component: OverseersList, loginRequired: true, requiredRoles:["1.1"] },
    { path: "/profile", name: "محصول", Component: ProfileSection, loginRequired: false },
    { path: "/profile/orders", name: "محصول", Component: UserOrders, loginRequired: false },
];
