import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Modal} from 'antd';
import {NavLink as NavLinkRouter, useLocation} from "react-router-dom";
import ListFilters from './listFilters';
import MyListTable from './myListTable';
import {ReactComponent as AddExcelPic} from "../../assets/icons/post_add_black.svg";
import {AiFillPlusCircle} from "react-icons/ai"
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import { useTokenClaims } from '../public/hooks';
import { QueryUrl } from '../../utils/utils';


function MyTicketsList(props) {
    const [params, serParams] = useState({})
    const [myOverseers] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const { listCount } = useSelector(state => state.tickets.list);
    const {roles = []} = useTokenClaims()

    React.useEffect( () => {
        let querys = location.search !== '' ? QueryUrl(location.search) : {}            
        if (Object.keys(querys).length){
            setTimeout( () => serParams(querys), 500)
        }
    }, [])

    return (
        <div className="mb-5">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
                <div>
                    <span className="square-indicator ">فیلتر تیکت‌ها</span>
                </div>
                <div>
                        {
                            roles.includes("6.2") && (
                                <NavLinkRouter to="/tickets/add">
                                    <Button className="px-2 mb-3 mb-sm-0" size="large" style={{fontSize: ".9rem"}}
                                            type="primary">  <AiFillPlusCircle className="ml-2" />  ثبت تیکت جدید </Button>
                                </NavLinkRouter>
                            )
                        }
                </div>
            </div>
            <div className="d-none d-md-block py-1">
                <ListFilters serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible} resetForm={resetForm}/>
            </div>
            <div className="d-md-none pt-2">
                { (Object.keys(params)?.length > 0) ?
                    <Button className="w-100" type="danger" ghost onClick={() => setResetForm(true)}>
                        حذف فیلتر تیکت‌ها
                    </Button>:
                    <Button className="w-100" type="primary" ghost onClick={() => {
                        setResetForm(false)
                        setIsModalVisible(true)
                    }} >فیلتر
                        تیکت‌ها
                    </Button>
                }
            </div>
            <div className="py-1 mt-3">
                <div className="d-flex justify-content-between">
                    <span className="square-indicator">  
                        لیست تیکت‌های من 
                        { Boolean(listCount) && (<span className="text-muted mr-2 font-size-sm"> تعداد رکوردها : {listCount} </span>)}
                    </span>
                </div>
                <div>
                    <MyListTable params={params} />
                </div>
            </div>
            <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={[]}>
                <ListFilters serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible} resetForm={resetForm} />
            </Modal>
        </div>
    )
}

export default MyTicketsList
