import React, {useEffect, useState} from 'react';
import {Button, Popconfirm, Modal} from 'antd';
import {NavLink as NavLinkRouter, useLocation} from "react-router-dom";
import ListFilters from './listFilters';
import ListTable from './listTable';
import {ReactComponent as ReportIcon} from "../../assets/icons/description_black_24dp.svg";
import {ReactComponent as AddUserPic} from "../../assets/icons/person_add_alt_1_black.svg";
import classNames from "classnames";
import { getBranchExport, cleanBranchExport } from "../../redux/branches/branchExport";
import {useDispatch, useSelector} from "react-redux";
import { useTokenClaims } from '../public/hooks'


function BranchesList(props) {
    const [params, serParams] = useState({})
    const [myOverseers] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const dispatch = useDispatch();
    const { listCount } = useSelector(state => state.branch.list);

    const { countryDivisionCode,  roles = []} = useTokenClaims();

    React.useEffect( () => {
        return () => dispatch(cleanBranchExport())
    }, [])

    return (
        <div className="mb-5">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
                <div>
                    <span className="square-indicator ">فیلتر شعب</span>

                </div>
                <div>
                    {
                        roles.includes( "7.4" ) && (
                            <NavLinkRouter to="/branches/add">
                                <Button className="px-2 mb-3 mb-sm-0" size="large" style={{fontSize: ".9rem"}}
                                        type="primary">  <AddUserPic />  افزودن کاربر به شعبه </Button>
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
                        حذف فیلتر شعب
                    </Button>:
                    <Button className="w-100" type="primary" ghost onClick={() => {
                        setResetForm(false)
                        setIsModalVisible(true)
                    }} >فیلتر
                        شعب</Button>
                }
            </div>
            <div className="py-1 mt-3">
                <div className="d-flex justify-content-between">
                    <span className="square-indicator">
                        لیست شعب 
                        <span className="text-muted mr-2 font-size-sm"> تعداد رکوردها : {listCount} </span>
                    </span>
                    <div>
                        <Popconfirm
                                    title="آیا از گرفتن گزارش اکسل مطمئن هستید؟"
                                    onConfirm={ () => dispatch(getBranchExport({countryDivisionCode, ...params})) }
                                    okText="بلی"
                                    cancelText="خیر"
                                >
                            <Button type="primary" className="w-100">
                                <span><ReportIcon/></span>
                                <span className="mr-1">دریافت گزارش اکسل</span>
                            </Button>
                        </Popconfirm>
                    </div>
                </div>
                <div>
                    <ListTable params={params} />
                </div>
            </div>
            <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={[]}>
                <ListFilters serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible} resetForm={resetForm} />
            </Modal>
        </div>
    )
}

export default BranchesList
