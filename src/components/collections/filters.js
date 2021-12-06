import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/auth';
import { getBasicInfo } from '../../redux/basicInfos';
import { Slider, Switch, Button, Checkbox, Input, Collapse} from 'antd';

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
                <h6>دسته‌بندی</h6>
                <div className="d-flex flex-column">
                    <Checkbox >النگوی طلا</Checkbox>
                    <Checkbox >انگشتر طلا</Checkbox>
                    <Checkbox >حیوانات</Checkbox>
                    <Checkbox >هدیه</Checkbox>
                </div>
                <Collapse className="bg-white p-0" bordered={false} ghost collapsible="header" >
                    <Collapse.Panel className="p-0" showArrow={false} header={<small className="text-goldRoyal d-flex justify-content-center p-0">بیشتر</small>} key="1">
                        <div className="d-flex flex-column p-0">
                            <Checkbox >النگوی طلا</Checkbox>
                            <Checkbox >انگشتر طلا</Checkbox>
                            <Checkbox >حیوانات</Checkbox>
                            <Checkbox >هدیه</Checkbox>
                        </div>
                    </Collapse.Panel>
                </Collapse>
            </div>
            <div className="border border-rounded shadow-sm p-3 my-3 font-weight-bold">
                <h6>محدوده قیمت  </h6>
                <Slider range />
            </div>
            <div className="border border-rounded shadow-sm p-3 my-3 font-weight-bold">
                <h6>رنگ  </h6>
                <div className="d-flex flex-column">
                    <Checkbox >رزگلد</Checkbox>
                    <Checkbox >زرد</Checkbox>
                    <Checkbox >سفید</Checkbox>
                </div>
                <Collapse className="bg-white p-0" bordered={false} ghost collapsible="header" >
                    <Collapse.Panel className="p-0" showArrow={false} header={<small className="text-goldRoyal d-flex justify-content-center p-0">بیشتر</small>} key="1">
                        <div className="d-flex flex-column p-0">
                            <Checkbox >رزگلد</Checkbox>
                            <Checkbox >زرد</Checkbox>
                            <Checkbox >سفید</Checkbox>
                        </div>
                    </Collapse.Panel>
                </Collapse>
            </div>
            <div className="border border-rounded shadow-sm p-3 my-3">
              <Switch /> فقط کالاهای موجود در انبار
            </div>
        </div>
    )
}

