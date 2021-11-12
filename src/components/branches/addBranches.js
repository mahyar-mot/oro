import React from 'react';
import {NavLink as NavLinkRouter, useHistory, useLocation, useParams} from "react-router-dom";
import {Form, Input, Button, Tag, Row, Col, Alert, Select, List, Table, Modal} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {BsArrowLeft} from 'react-icons/bs';
import {FaRegUserCircle} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {getBasicInfo} from '../../redux/basicInfos';
import classNames from "classnames";
// import {getCandidatesList} from "../../redux/candidates/ branchesList ";
import { getBranchesList, cleanBranchesList } from "../../redux/branches/branchesList";
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import { getHeadOverseer, cleanHeadOverseerDetail } from "../../redux/headOverseers/headOverseerDetail";
import { branchUpdate, clearUpdate } from "../../redux/branches/branchesUpdate";
import { useTokenClaims } from '../public/hooks';

const { Column } = Table;

const BallotBoxModal = (props) => (
    <Modal 
        bodyStyle={{padding: 0, textAllign: "center"}} 
        className="custom-ant-modal" 
        footer="" 
        title={<div className="text-center text-white" >کدهای صندوق های شعبه</div>} 
        visible={props.ballotBoxModal} 
        onCancel={ () => props.setBallotBoxModal(false)}
    >
        <List
        size="small"
        dataSource={props.data}
        renderItem={ (item, index) => (
            <List.Item key={index} className={classNames({"list-alternate-bg": index % 2 !== 0})}>
                <div className="text-center w-100">
                    {item.code}
                </div>
            </List.Item>
        )}
        >
        </List>
    </Modal>
)

const BranchDetail = ({selectedBranch}) => {
    const [ballotBoxModal, setBallotBoxModal] = React.useState(false);

    return(
        <div>
            <List 
                header={
                    <div className="">
                        <div>
                        شعبه {selectedBranch.name}
                        </div>
                    </div>
                }
            >
                <List.Item className="">
                    <Row className="w-100">
                        <Col xs={8} sm={8} md={8} lg={10} xl={10}>
                            <span>نوع شعبه : </span><span>{selectedBranch.branchTypeTitle}</span>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <a className="link-color" onClick={ () => setBallotBoxModal(true)}> کدهای صندوق </a>
                        </Col>
                        <BallotBoxModal ballotBoxModal={ballotBoxModal} setBallotBoxModal={setBallotBoxModal} data={selectedBranch?.ballotBoxes} />
                    </Row>
                </List.Item>
                <List.Item className="">
                    <Row className="w-100">
                        <Col xs={8} sm={8} md={8} lg={10} xl={10}>
                            <span>استان : </span><span>{selectedBranch.countryDivisions.map( (item, i) => i === 1 ? item.name : "" )}</span>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <span>شهرستان : </span><span>{selectedBranch.countryDivisions.map( (item, i) => i === 2 ? item.name : "" )}</span>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                            <span>بخش : </span><span>{selectedBranch.countryDivisions.map( (item, i) => i === 3 ? item.name : "" )}</span>
                        </Col>
                    </Row>
                </List.Item>
                <List.Item className="">
                    <Row className="w-100">
                        <Col xs={8} sm={8} md={8} lg={10} xl={10}>
                            <span>شهر : </span><span>{selectedBranch.countryDivisions.map( (item, i) => i === 4 ? item.name : "" )}</span>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <span>منطقه/روستا : </span><span>{selectedBranch.countryDivisions.map( (item, i) => i === 5 ? item.name : "" )}</span>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                            <span>عنوان : </span><span>{selectedBranch?.title}</span>
                        </Col>
                    </Row>
                </List.Item>
                <List.Item className="">
                    <Row className="w-100">
                        <Col xs={24} sm={14} md={12} lg={12} xl={10}>
                            <span>موقعیت : </span><span>{selectedBranch.location}</span>
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <span>تلفن تماس : </span><span>{selectedBranch.phoneNo}</span>
                        </Col>
                    </Row>
                </List.Item>
            </List>
        </div>
    )
}

const UsersTable = props => (
    <div>
        <Table
            pagination={false}
            dataSource={ props.branchUsersList }
            className="shadow-sm"
            scroll={{x: true}}
            // loading={isLoading}
            rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
            bordered
        >
            <Column responsive={["sm"]} title="شماره" key="id" render={(text, record, index) => (`${index + 1}`)}/>
            <Column
                title=" نام "
                dataIndex={["supervisorProfile", "name"]}
                key={["supervisorProfile", "name"]}
            />
            <Column
                title=" نام خانوادگی "
                dataIndex={["supervisorProfile", "surname"]}
                key={["supervisorProfile", "surname"]}
            />
            {/* <Column 
                title="شماره شناسنامه" 
                dataIndex="surname"
                key="surname"
            /> */}
            <Column 
                title=" کدملی" 
                dataIndex={["supervisorProfile", "nationalNo"]}
                key={["supervisorProfile", "nationalNo"]}
            />
            <Column 
                title=" تلفن همراه" 
                dataIndex={["supervisorProfile", "mobile"]}
                key={["supervisorProfile", "mobile"]}
            />
            <Column 
                responsive={["md"]}
                title=" مدرک" 
                dataIndex={["supervisorProfile", "educationTypeTitle"]}
                key={["supervisorProfile", "educationTypeTitle"]}
            />
            <Column 
                title=" سمت" 
                dataIndex="supervisorPostTypeTitle" 
                key="supervisorPostTypeTitle"
            />
            <Column
                title="عملیات"
                dataIndex="tags"
                key="tags"
                render={(text, record) => (
                    <>
                        {/* <Button className="ml-3 mb-2" type="secondary" size="small" onClick={e => {
                            history.push(`/branches/detail`)
                        }}>بیشتر</Button> */}
                        <Button danger icon={<DeletePic/>} size="small"
                                onClick={e => props.setBranchUsersList( state => state.filter( item => item.supervisorProfile.nationalNo !== record.supervisorProfile.nationalNo ) ) }/>
                    </>
                )}
            />
        </Table>
    </div>
)


function AddBranch(props) {

    const {id} = useParams()

    const basicInfo = useSelector(state => state.basicInfo);
    const { branchesList , isLoading : branchesListLoading} = useSelector(state => state.branch.list);
    const { isLoading, isSuccess } = useSelector(state => state.branch.update);
    const { headOverseerDetail, isLoading: headOverseerLoading } = useSelector(state => state.headOverseer.retrieve);

    const [form] = Form.useForm();

    const {countryDivisionCode} = useTokenClaims()

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const [selectedBranch, setSelectedBranch] = React.useState({});
    const [selectedUser, setSelectedUser] = React.useState([]);
    const [branchUsersList, setBranchUsersList] = React.useState([])

    React.useEffect(() => {
        // dispatch(getHeadOverseer({countryDivisionCode}));
        if (!basicInfo.apiHasCalled) {
            dispatch(getBasicInfo())
        }
        return () => {
            dispatch(cleanBranchesList())
            dispatch(cleanHeadOverseerDetail())
            dispatch(clearUpdate())
        }
    }, [])

    React.useEffect( () => {
        if (countryDivisionCode){
            if (id){
                dispatch(getBranchesList({search: id, countryDivisionCode, pageSize: 100}))
            }else if (countryDivisionCode.split(".").length > 3){
                dispatch(getBranchesList({countryDivisionCode, pageSize: 100}))
            }
        }
    }, [countryDivisionCode]) 

    React.useEffect( () => {
        if (branchesList.length > 0 && id){
            setSelectedBranch(branchesList[0])
            form.setFieldsValue({"branch": branchesList[0].name})
        }
    }, [branchesList])

    React.useEffect( () => {
        if (Object.keys(selectedBranch).length){
            setBranchUsersList(selectedBranch.branchSupervisors)
            dispatch(getHeadOverseer(selectedBranch.countryDivisionCode, {pageSize: 30, havingBranchType: 3}))
        }else {
            setBranchUsersList([])
        }
    }, [selectedBranch])

    React.useEffect( () => {
        if (!isLoading){
            if (isSuccess){
                setTimeout( () => history.push(`/branches${location.search}`), 500)
            }
        }
    },[isLoading])

    const onFinish = (values) => {
        // setBranchUsersList( state => [...state.filter( item => item.nationalNo !== selectedUser.nationalNo), selectedUser] )
        let users = selectedUser.map( item => ({
            supervisorProfile: item,
            supervisorPostType: values.supervisorPostType,
            supervisorPostTypeTitle: basicInfo.supervisorPostType.filter( item => item.value === values.supervisorPostType)[0].name ,
        }))
        setBranchUsersList( state => {
            return Object.values(state.concat(users).reduce( (r,o) => {
                r[o.supervisorProfile.nationalNo] = o;
                return r;
              },{})
            );
        })
        setTimeout( () => {
            form.setFieldsValue({"supervisor": '', "supervisorPostType": ''});
            setSelectedUser([]);
            dispatch(cleanHeadOverseerDetail());
        }, 300)
    }

    const addUsersToBranch = () => {
        if (Object.keys(selectedBranch).length){
            let branchSupervisors = branchUsersList.map( item => ({
                // id: item.id, 
                supervisorPostType: item.supervisorPostType, 
                supervisorNationalNo: item.supervisorProfile.nationalNo
            }))
            let payload = {
                "id": selectedBranch.id,
                "name": selectedBranch.name,
                "code": selectedBranch.code,
                "countryDivisionCode": selectedBranch.countryDivisionCode,
                "location": selectedBranch.location,
                "phoneNo": selectedBranch.phoneNo,
                "branchType": selectedBranch.branchType,
                "branchSupervisors": branchSupervisors,
                "ballotBoxes": selectedBranch.ballotBoxes
            }
            dispatch(branchUpdate(payload.id, payload))
        }
    }

    return (
        <>
            <div className="content mb-5">
                <div className="d-flex justify-content-between">
                    <span className="square-indicator"> افزودن ناظر به شعبه</span>
                    <div className="ml-2">
                        <NavLinkRouter className="text-decoration-none" to={`/branches${location.search}`}>
                            <span className="link-color">بازگشت به لیست شعب  <BsArrowLeft/></span>
                        </NavLinkRouter>
                    </div>
                </div>
                <div className="px-xl-5 mt-4" >
                    <Form
                        layout="vertical"
                        form={form}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 22}}
                        onFinish={onFinish}
                    >
                        <Row>
                            <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                                <Form.Item label=" نام شعبه " name="branch"
                                        rules={[
                                            {
                                                required: true,
                                                message: "تکمیل این فیلد لازم است"
                                            }
                                        ]}>
                                    <Select
                                        showSearch
                                        dropdownClassName="text-right"
                                        defaultActiveFirstOption={false}
                                        showArrow={false}
                                        filterOption={false}
                                        loading={branchesListLoading}
                                        tagRender={ () => {}}
                                        disabled={ Object.keys(selectedBranch).length }
                                        onSearch={ value => {
                                            if (value === '' || value === null || value.length <= 5){
                                                dispatch(cleanBranchesList())
                                            }else{
                                                dispatch(getBranchesList({search: value, countryDivisionCode: countryDivisionCode, pageSize: 50}))
                                            }
                                        }}
                                        onChange={ (value, option) => setSelectedBranch(option.data_username) }
                                    >
                                        { branchesList .map( (item, index) => (
                                            <Select.Option value={item.id} key={index} data_username={item} >{item.name}</Select.Option>
                                        ) )}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col span={24}>
                                { Boolean(Object.keys(selectedBranch).length) && (
                                    <Alert
                                        className="border border-success rounded"
                                        style={{backgroundColor: "#F9F9F9"}}
                                        message={
                                            <BranchDetail selectedBranch={selectedBranch} />
                                        }
                                        type="success"
                                        closable={!Boolean(id)}
                                        onClose={ () => {
                                            dispatch(cleanBranchesList())
                                            dispatch(cleanHeadOverseerDetail())
                                            setSelectedBranch({})
                                            setBranchUsersList([])
                                            setSelectedUser([])
                                            form.setFieldsValue({branch: ''})
                                        }}
                                    />
                                )} 
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item label=" سمت " name="supervisorPostType"
                                        rules={[
                                            {
                                                required: true,
                                                message: "تکمیل این فیلد لازم است"
                                            }
                                        ]}>
                                    <Select
                                        size="large"
                                        dropdownClassName="text-right"
                                        disabled={ !Object.keys(selectedBranch).length }
                                        // onChange={ (value) => onUserLevelChange(value)}
                                        // onChange={value => setActiveCityFields(value)}
                                    >
                                        
                                         {basicInfo.supervisorPostType.map((item, index) => (
                                             <Select.Option value={item.value} key={index}>{item.name}</Select.Option>
                                         ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-2" xs={16} sm={16} md={16} lg={8} xl={8} >
                                <Form.Item label=" ناظر " name="supervisor"
                                        rules={[
                                            {
                                                required: !Boolean(selectedUser.length),
                                                message: "تکمیل این فیلد لازم است"
                                            }
                                        ]}>
                                    <Select
                                        allowClear
                                        showSearch
                                        dropdownClassName="text-right"
                                        defaultActiveFirstOption={false}
                                        filterOption={false}
                                        loading={headOverseerLoading}
                                        onDropdownVisibleChange={ (open) =>  open && Boolean(Object.keys(selectedBranch).length) && dispatch(getHeadOverseer(selectedBranch.countryDivisionCode, {pageSize: 30, havingBranchType: 3})) }
                                        tagRender={ () => {}}
                                        onSearch={ value => {
                                            if (value === '' || value === null || value.length <= 5){
                                                dispatch(cleanHeadOverseerDetail())
                                            }else{
                                                dispatch(getHeadOverseer(selectedBranch.countryDivisionCode, {nationalNo: value, pageSize: 30, havingBranchType: 3}))
                                            }
                                        }}
                                        disabled={ !Object.keys(selectedBranch).length }
                                        onChange={ (value, option) => {
                                            if (option){
                                                setSelectedUser( state => [...state.filter( item => item.nationalNo !== option.data_username.nationalNo), option.data_username])
                                            }
                                            setTimeout( () => {
                                                // dispatch(cleanHeadOverseerDetail())
                                                form.setFieldsValue({"supervisor": ''})
                                            }, 300 )
                                        }}
                                    >
                                        {
                                            headOverseerDetail.map( (item, index) => (
                                                <Select.Option value={item.id} key={index} data_username={item}>{item.name} {item.surname} - {item.nationalNo}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* <Col className="py-3" xs={8} sm={8} md={8} lg={8} xl={8} >
                                { Boolean(Object.keys(selectedBranch).length) && <Button size="large" className="text-success border-success mt-3" loading={isLoading} onClick={ () => dispatch(getHeadOverseer(selectedBranch.countryDivisionCode)) } >لیست ناظران مجاز</Button> }
                            </Col> */}
                        </Row>
                        <Row>
                            <div className="d-flex" >
                                { Boolean(selectedUser.length) && selectedUser.map( (item, index) => (
                                        <Tag 
                                            key={index}
                                            className="badge-pill text-white background-pill-complaints mx-2 py-1 ml-1 font-weight-bold" 
                                            closable
                                            icon={<FaRegUserCircle className="ml-3" />}
                                            onClose={ () => {
                                                setSelectedUser(state => [...state.filter( i => i.nationalNo !== item.nationalNo)]);
                                                form.setFieldsValue({"supervisor": ''});
                                                // dispatch(cleanHeadOverseerDetail());
                                            }}
                                        >
                                            {item.name + " " + item.surname + " - " + item.nationalNo}
                                        </Tag> 
                                    ))
                                } 
                            </div>
                        </Row>
                        <div className="text-left px-2 mt-3">
                            <Button size="large" type="primary" loading={isLoading} htmlType="submit">اضافه کردن</Button>
                        </div>
                    </Form>
                </div>
            </div>
            <div className="mt-3 mb-5">
                {
                    Boolean(Object.keys(selectedBranch).length) && (
                        <>
                            <span className="square-indicator">
                                لیست ناظران شعبه {selectedBranch.name} 
                            </span>
                            <UsersTable branchUsersList={branchUsersList} setBranchUsersList={setBranchUsersList} />
                            <div className="text-left px-2 mt-3">
                                <Button size="large" type="primary" loading={isLoading} onClick={ () => addUsersToBranch() }>تایید نهایی و ذخیره</Button>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default AddBranch
