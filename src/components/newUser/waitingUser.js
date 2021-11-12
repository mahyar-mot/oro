import React from 'react';
import {Table, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {getUserProfile} from '../../redux/auth';
import {getBasicInfo} from '../../redux/basicInfos'
import {RowResponsive, TableResponsive} from "../public/tableResponsive";
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg";


function WaitingUser(props) {

    const {Column} = Table;
    const dispatch = useDispatch();
    const history = useHistory();

    const {isLoggedIn, nationalNumber, userProfile} = useSelector(state => state.auth)
    const {status, countryDivisionLevel, inspectorAssignmentTitle,  apiHasCalled} = useSelector(state => state.basicInfo);

    React.useEffect(() => {
        if (isLoggedIn) {
            dispatch(getUserProfile(nationalNumber))
        }
        if (!apiHasCalled) {
            dispatch(getBasicInfo())
        }
    }, [])

    React.useEffect( () => {
        if (userProfile?.stateType){
            if (userProfile.stateType === 2 && userProfile.profileStatusDto[0].statusType === 5) history.push('/profile')
        }
    }, [userProfile])

    return (
        <>
            {
                userProfile?.stateType !== 2 && (
                    <div className="content">
                        <div className="d-flex justify-content-around">
                            <div className="text-center py-3">
                                <div className="my-2 py-2" style={{lineHeight: "2.1rem"}}>
                                    خدمت کننده محترم ثبت نام شما با موفقیت انجام شد لطفا پیش از ادامه ، اطلاعات مربوط به حساب کاربری خود را تکمیل نمایید
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="py-3">
                <span className="square-indicator">مشخصات کاربر</span>
                <div className="py-2 d-none d-lg-block">
                    <Table
                        dataSource={[userProfile]}
                        className="shadow-sm"
                        pagination={false}
                        // loading={listIsLoading}
                        rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                        bordered
                    >
                        <Column title="شماره" key="id" render={(text, record, index) => (`${index + 1}`)}/>
                        <Column
                            title="سطح فعالیت"
                            dataIndex="assignmentTitleType"
                            key="assignmentTitleType"
                            render={(text, record, index) => {
                                if (record.isInspector){
                                    return inspectorAssignmentTitle.map(item => item.value === record.assignmentTitleType ? item.name : '')
                                }else{
                                    return countryDivisionLevel.map(item => item.value === record.assignmentTitleType ? item.name : '')
                                }
                            }}
                        />
                        <Column title="کدملی" dataIndex="nationalNo" key="nationalNo"/>
                        <Column title="تلفن همراه" dataIndex="mobile" key="mobile"/>
                        <Column title="نام" dataIndex="name" key="name"/>
                        <Column title="نام خانوادگی" dataIndex="surname" key="surname"/>
                        <Column
                            title="استان"
                            dataIndex=""
                            key=""
                            render={(text, record, index) => record?.countryDivisions?.map((item, i) => i === 1 ? item.name : '')}
                        />
                        <Column
                            title="شهرستان"
                            dataIndex=""
                            key=""
                            render={(text, record, index) => record?.countryDivisions?.map((item, i) => i === 2 ? item.name : '')}
                        />
                        <Column
                            title="بخش"
                            dataIndex=""
                            key=""
                            render={(text, record, index) => record?.countryDivisions?.map((item, i) => i === 3 ? item.name : '')}
                        />
                        {/* <Column title="زمان آخرین پیامک" dataIndex="address" key="randomString" /> */}
                        {/* <Column title="زمان آخرین تغییر" dataIndex="address" key="address" /> */}
                        <Column
                            title="وضعیت"
                            dataIndex={["profileStatusDto", "statusType"]}
                            key={["profileStatusDto", "statusType"]}
                            render={(text, record, index) => record.profileStatusDto && status.map(item => item.value === record?.profileStatusDto[0]?.statusType ? item.name : '')}
                        />
                        <Column
                            title="عملیات"
                            dataIndex="tags"
                            key="tags"
                            render={(text, record) => (
                                <>
                                    {
                                        userProfile?.stateType === 2 && userProfile?.profileStatusDto[0]?.statusType === 5 ? (
                                            <Button className="" type="secondary"  onClick={e => {
                                                history.push(`/profile/edit/${record.nationalNo}`)
                                            }}>بیشتر</Button>
                                        ) : (
                                            <Button className="" type="secondary"  onClick={e => {
                                                history.push(`/newUser/${record.nationalNo}`)
                                            }}>تکمیل اطلاعات</Button>
                                        )
                                    }
                                    {/* <Button danger icon={<DeletePic />} size="small" onClick={ e => console.log("~!~!~!")} ></Button> */}
                                </>
                            )}
                        />
                    </Table>
                </div>
                <div className="py-2">
                    {/*{console.log([userProfile])}*/}
                    <TableResponsive total={10}>
                        {Object.keys(userProfile).length > 2 && [userProfile].map((item, i) => {
                                let country = countryDivisionLevel.filter(t => t.value === item.assignmentTitleType)
                                let statusItem = status.filter(t => t.value === item?.profileStatusDto[0]?.statusType)
                                country.length ? (country = country[0]?.name) : (country = "")
                                statusItem.length ? (statusItem = statusItem[0]?.name) : (statusItem = "")
                                return <table className="table table-striped border-0">
                                    <tbody>
                                    <RowResponsive title=" شماره"
                                                   dataIndex={i+1}
                                                   key="key"/>
                                    <RowResponsive title="سطح فعالیت"
                                                   dataIndex={country}
                                                   key="firstName"/>
                                    <RowResponsive title="کدملی" dataIndex={item?.nationalNo} key="nationalNo"/>
                                    <RowResponsive title="موبایل" dataIndex={item?.mobile} key="mobile"/>
                                    <RowResponsive title="نام" dataIndex={item?.name} key="name"/>
                                    <RowResponsive title="نام خانوادگی" dataIndex={item?.surname} key="surname"/>
                                    <RowResponsive title="استان "
                                                   dataIndex={((item?.countryDivisions?.length > 1) ? (item?.countryDivisions[1]?.name) : '')}
                                                   key="cityDiv-1"/>
                                    <RowResponsive title="شهرستان "
                                                   dataIndex={((item?.countryDivisions?.length > 2) ? (item?.countryDivisions[2]?.name) : '')}
                                                   key="cityDiv-2"/>
                                    <RowResponsive title="بخش "
                                                   dataIndex={((item?.countryDivisions?.length > 3) ? (item?.countryDivisions[3]?.name) : '')}
                                                   key="cityDiv-3"/>
                                    <RowResponsive title="وضعیت "
                                                   dataIndex={statusItem}
                                                   key="status"/>
                                    <RowResponsive title="عملیات "
                                                   dataIndex={
                                                        userProfile?.stateType === 2 ? (
                                                            <Button className="" type="secondary" size="small" onClick={e => {
                                                                history.push(`/profile/edit/${item.nationalNo}`)
                                                            }}>بیشتر</Button>
                                                        ) : (
                                                            <Button className="" type="secondary" size="small" onClick={e => {
                                                                history.push(`/newUser/${item.nationalNo}`)
                                                            }}>تکمیل اطلاعات</Button>
                                                        )
                                                    }
                                                   key="description"/>
                                    </tbody>
                                </table>
                            }
                        )}
                    </TableResponsive>
                </div>
            </div>
        </>
    )
}

export default WaitingUser
