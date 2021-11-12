import React, {useState} from 'react';
import {Table, Button, Tag, Space, Spin, Tooltip} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import classnames from "classnames";
import {getOverseersList, cleanOverseersList} from '../../redux/overseers/overseersList';
import {getBasicInfo} from '../../redux/basicInfos';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import { FaCheck } from "react-icons/fa"
import {ReactComponent as ApprovePic} from "../../assets/icons/check_circle-24px (1).svg";
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import { useTokenClaims } from '../public/hooks';
import { UrlQuery } from '../../utils/utils';
import { overseerActivation } from '../../redux/overseers/overseerUpdate';

const list = [
    {
        id: 1,
        phoneNumber: "09197030096",
        nationalNo: "0014014467",
        countryDivisionCode: "1.2.56",
        assignmentTitle: 2,
        countryDivisions: [
            {id: 1, value: "1", name: "ایران"},
            {id: 2, value: "1.2", name: "تهران"},
            {id: 3, value: "1.2.56", name: "شهر تهران"},
            {id: 4, value: "1.2.56", name: "مرکز شهر"},
            {id: 5, value: "1.2.56", name: "تهران"},
        ]
    }
]


function ExcelTable(props) {
    const {params = {}} = props;
    const {Column} = Table;
    const [loadingResponsive, setLoadingResponsive] = useState(false)
    const dispatch = useDispatch()

    // const [props.editableUsers, setEditableUsers] = useState([])
    // const [props.errorUsers, setErrorUsers] = useState([])

    const {
        overseersExcel,
        isLoading
    } = useSelector(state => state.overseer.create);

    const {countryDivisionCode} = useTokenClaims();
    const history = useHistory();

    const {status, countryDivisionLevel, apiHasCalled} = useSelector(state => state.basicInfo);

    // React.useEffect(() => {
    //     if (!apiHasCalled) {
    //         dispatch(getBasicInfo())
    //     }
    //     return () => dispatch(cleanOverseersList())
    // }, [])

    // React.useEffect( () => {
    //     if(!isLoading){
    //         if(Object.keys(overseersExcel).length){
    //             setEditableUsers(overseersExcel.notExistUserProfiles)
    //             setErrorUsers([...overseersExcel.imperfectUsers, ...overseersExcel.existUserProfiles])
    //         }
    //     }
    // }, [overseersExcel, isLoading])

    return (
        <div className="mt-2">
            <div className="d-none d-lg-block">
                <Table
                    dataSource={props.editableUsers}
                    pagination={false}
                    className="shadow-sm"
                    loading={isLoading}
                    rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                    bordered
                >
                    <Column title="شماره" key="id" render={(text, record, index) => index + 1 }/>
                    <Column
                        title="سطح فعالیت"
                        dataIndex="assignmentTitle"
                        key="assignmentTitle"
                        render={(text, record, index) => props.countryDivisionLevel.map(item => item.value === record?.assignmentTitle ? item.name : '')}
                    />
                    <Column title="کدملی" dataIndex="nationalNo" key="nationalNo"/>
                    <Column title="تلفن همراه" dataIndex="phoneNumber" key="phoneNumber"/>
                    <Column
                        title="استان"
                        dataIndex="surname"
                        key="action"
                        render={(text, record, index) => record?.parents?.map((item, i) => i === 1 ? item.name : '')}
                    />
                    <Column
                        title="شهرستان"
                        dataIndex="lastName"
                        key="lastName"
                        render={(text, record, index) => record?.parents?.map((item, i) => i === 2 ? item.name : '')}
                    />
                    <Column
                        title="بخش"
                        dataIndex="age"
                        key="age"
                        render={(text, record, index) => record?.parents?.map((item, i) => i === 3 ? item.name : '')}
                    />
                    <Column
                        title="شهر/دهستان"
                        dataIndex="age1"
                        key="age"
                        render={(text, record, index) => record?.parents?.map((item, i) => i === 4 ? item.name : '')}
                    />
                    <Column
                        title="روستا"
                        dataIndex="age2"
                        key="age"
                        render={(text, record, index) => record?.parents?.map((item, i) => i === 5 ? item.name : '')}
                    />

                    <Column
                        title="عملیات"
                        dataIndex="tags"
                        key="tags"
                        render={(text, record, index) => (
                            <Button key={index} className="mb-2" type="secondary" size="small" 
                                disabled={Object.keys(props.selectedUser).length}
                                onClick={e => {
                                    props.onSelectUser(record)
                                }}>ویرایش</Button>
                        )}
                    />
                </Table>
            </div>

            <Spin spinning={loadingResponsive}>
                <TableResponsive >

                    {props.editableUsers.map((item, i) => {
                            let country = props.countryDivisionLevel.filter(t => t.value === item.assignmentTitle)
                            country.length ? (country = country[0]?.name) : (country = "")
                            return <table key={i+1} className="table table-striped border-0">
                                <tbody>
                                <RowResponsive title="شماره "
                                               dataIndex={ i + 1 }
                                               key="number"/>
                                <RowResponsive title="سطح فعالیت"
                                               dataIndex={country}
                                               key="assignmentTitle"/>
                                <RowResponsive title="کدملی" dataIndex={item?.nationalNo} key="nationalNo"/>
                                <RowResponsive title="موبایل" dataIndex={item?.phoneNumber} key="phoneNumber"/>

                                <RowResponsive title="استان "
                                               dataIndex={((item?.parents?.length > 1) ? (item?.parents[1]?.name) : '')}
                                               key="city1"/>
                                <RowResponsive title="شهرستان "
                                               dataIndex={((item?.parents?.length > 2) ? (item?.parents[2]?.name) : '')}
                                               key="city2"/>
                                <RowResponsive title="بخش "
                                               dataIndex={((item?.parents?.length > 3) ? (item?.parents[3]?.name) : '')}
                                               key="city3"/>
                                <RowResponsive title="شهر/دهستان "
                                               dataIndex={((item?.parents?.length > 4) ? (item?.parents[4]?.name) : '')}
                                               key="city4"/>
                                <RowResponsive title="روستا "
                                               dataIndex={((item?.parents?.length > 5) ? (item?.parents[5]?.name) : '')}
                                               key="city5"/>
                                <RowResponsive title="جزییات "
                                               dataIndex={<Button className="ml-3" type="secondary" size="small"
                                                                  onClick={e => {
                                                                    props.onSelectUser(item)
                                                                  }}>ویرایش</Button>}
                                               key="more"/>
                                </tbody>
                            </table>
                        }
                    )}
                </TableResponsive>
            </Spin>
        </div>
    )
}

export default ExcelTable
