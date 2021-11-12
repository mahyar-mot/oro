import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink as NavLinkRouter, useHistory, useParams} from "react-router-dom";
import { Form, Input, Button, TreeSelect, Select, Row, Col, Upload, Spin } from 'antd';
import {BsArrowLeft} from 'react-icons/bs';
import { getCountries, cleanCountries } from '../../redux/countries';
import { getBasicInfo } from '../../redux/basicInfos';
import { getCategoriesList } from '../../redux/categories/categoriesList';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg";
import {ReactComponent as PlusPic} from "../../assets/icons/Path 7627.svg";
import { MEDIA_URL, CONTENTS_IMAGE_UPLOAD, CONTENTS_ATTACH_UPLOAD } from '../../utils/constants';
import { getTokenObject } from '../../utils/utils';
import { contentUpdate, resetUpdate } from '../../redux/contents/contentsUpdate';
import { getContent, resetContent } from '../../redux/contents/contentsRetrieve';
import CountryDivisions from '../public/countryDivisions';


const CityDivLabel = (props) => (
    <div className="d-flex justify-content-between">
        <div className="ml-5">{props.label}</div>
        {props.length > 1 && props.length == props.index + 1 ? (
            <DeletePic 
                className="text-left pointer"
                onClick={() => props.remove(props.name)}
            />
            ) : null
        }
    </div>
)


function EditContent(props) {

    const {id} = useParams()

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const history = useHistory()
    const { userProfile } = useSelector( state => state.auth )
    const basicInfo = useSelector( state => state.basicInfo );
    const {countries} = useSelector( state => state.countries );
    const { categoriesList } = useSelector( state => state.category.list );
    const { isLoading: updateLoading, isSuccess } = useSelector( state => state.content.update );
    const { content, isLoading, error } = useSelector( state => state.content.retrieve )

    const [treeDataList, setTreeDataList] = React.useState([]);
    const [attachmentsList, setAttachmentsList] = React.useState([]);
    const [attachmentTitle, setAttachmentTitle] = React.useState('')
    const [addButtonVisible, setAddButtonVisible] = React.useState(true);
    const [canSelectCity, setCanSelectCity] = React.useState(true)
    const [isLoadingFile, setIsLoadingFile] = React.useState(false)


    const countryDivNames = ["استان", "شهرستان", "بخش", "شهر/دهستان", "روستا",]

    React.useEffect( () => {
        console.log("$$$$$", updateLoading, isSuccess);
        if (!updateLoading){
            if (isSuccess){
                setTimeout( () => history.push('/contents'), 1000 )
            }
        }
    }, [updateLoading])

    React.useEffect( () => {
        if (Object.keys(content).length){
            let fileLists = content.contentFiles.map( item => ({...item, uid: item.path, status: 'done', name: item.title}))
            setAttachmentsList(fileLists)
            let assignTitle = getAssignmentList(content.assignmentTitleType)
            form.setFieldsValue({'assignmentTitleType': assignTitle})
        }
    },[content])

    React.useEffect( () => {
        if( categoriesList.length){
            setTreeDataList(categoriesList
                .filter( item => item.parentId === null)
                .map( item => ({...item, isLeaf: false})
                // .map( item => ({...item, isLeaf: false, selectable: false})
            ))
        }
    }, [categoriesList])

    // React.useEffect( () => {
    //     if (userProfile.assignmentTitleType) {
    //         form.setFieldsValue({"assignmentTitleType": getAssignmentList(userProfile.assignmentTitleType)})
    //     }
    // },[userProfile])

    React.useEffect(() => {
        if (!basicInfo.apiHasCalled){
            dispatch(getBasicInfo())
        }
        dispatch(getContent(id))
        dispatch(getCategoriesList({}))
        return () => {
            dispatch(resetUpdate())
            dispatch(resetContent())
        }
    }, [dispatch])

    const onFocus = (e) => {
        let parentId = String(e.target.id).split('_')[1]
        if (parentId == 0){
            dispatch(getCountries(1))
        }else{
            let value = form.getFieldValue("countryDivisionCode")[parentId-1];
            let countryDivisionCodes = value.split('.')
            dispatch(getCountries(countryDivisionCodes[ countryDivisionCodes.length - 1 ]))
        }
    }

    const onTreeExpand = expandedKeys => {
        if (expandedKeys.length){
            setTreeDataList( state => {
                let childs = categoriesList
                    .filter(item => item.parentId === expandedKeys[expandedKeys.length - 1])
                    .map( item => ({...item, isLeaf: true, pId: expandedKeys[expandedKeys.length - 1]}) ) 

                return Object.values(state.concat(childs).reduce((r,o) => {
                    r[o.id] = o;
                    return r;
                  },{})
                );
            })
        }
    }

    const getAssignmentList = (value) => Array.from({length: value}, (_, i) => i + 1)

    const onFieldsChange = changedFields => {
        if (changedFields.length){
            if (changedFields[0].name[0] === "countryDivisionCode"){
                if(changedFields[0].value === "1") {
                    setAddButtonVisible(false)
                }else{
                    setAddButtonVisible(true)
                }
            }
        }
    }

    const onFinish = (values) => {
        values["attachments"] = attachmentsList.map( item => ({ path: item.path, title: item.title, fileSize: item.fileSize, fileFormat: item.fileFormat }) );
        // values.countryDivisionCode = values.countryDivisionCode.length ? values.countryDivisionCode[values.countryDivisionCode.length - 1 ] : "1"
        values.assignmentTitleType = values.assignmentTitleType[values.assignmentTitleType.length - 1 ]
        values.countryDivisionCode = content.countryDivisionCode
        values.id = content.id
        dispatch(contentUpdate(content.id, values))
    }

    return (
        <>
            <div className="content mb-5">
                <div className="d-flex justify-content-between">
                    <span className="square-indicator">ایجاد محتوا</span>
                    <div className="ml-2">
                        <NavLinkRouter className="text-decoration-none" to="/contents">
                            <span className="link-color">بازگشت به لیست محتواها <BsArrowLeft /></span>
                        </NavLinkRouter> 
                    </div>
                </div>
                <div className="px-5">
                    <Spin size="large" spinning={isLoading}>
                        {
                            Boolean(Object.keys(content).length) && (
                            <Form
                                layout="vertical"
                                form={form}
                                labelCol= {{ span: 15 }}
                                wrapperCol= {{ span: 22 }}
                                onFieldsChange={onFieldsChange}
                                onFinish={onFinish}
                                initialValues={content}
                            >
                                <Row>
                                    <Col className="mr-auto" xs={24} sm={12} md={14} lg={16} xl={16}>
                                        <Form.Item className="mt-5" name="title" label="عنوان محتوا">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col className="ml-auto" xs={24} sm={12} md={10} lg={8} xl={8}>
                                        <Form.Item className="mt-5" name="categoryId" label="دسته‌بندی محتوا">
                                            <TreeSelect
                                                treeDataSimpleMode
                                                virtual={false}
                                                // loadData={onLoadTreeData}
                                                onTreeExpand={onTreeExpand}
                                                dropdownClassName="text-right"
                                                treeData={treeDataList}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="ml-4" span={7}>
                                        <Form.Item className="mt-3" name="path" label="عکس محتوا">
                                            <Upload 
                                                accept=".png , .jpeg , .jpg"
                                                name="file"
                                                action={MEDIA_URL + CONTENTS_IMAGE_UPLOAD}
                                                defaultFileList={[{uid: content.path, path: content.path, url: content.pathAddress, status: "done", name: content.path}]}
                                                maxCount={1}
                                                listType="picture"
                                                headers={{
                                                    Authorization: `Bearer ${getTokenObject().Authorization}`
                                                }}
                                                onChange={ (info) => {
                                                    setIsLoadingFile(true)
                                                    if (info.file.status === 'done') {
                                                        setIsLoadingFile(false)
                                                        if (info.file.response.isSuccess){
                                                            form.setFieldsValue({path: info.file.response.data})
                                                        }
                                                    }
                                                    if (info.file.status === "removed"){
                                                        setIsLoadingFile(false)
                                                        form.setFieldsValue({path: ''})
                                                    }
                                                    if (info.file.status === "error"){
                                                        setIsLoadingFile(false)
                                                        form.setFields([
                                                            {
                                                              name: 'path',
                                                              errors: [info.file.response.message],
                                                            },
                                                         ]);
                                                    }
                                                }}
                                            >
                                                <Button loading={isLoading}>انتخاب فایل</Button>
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <div>
                                    <Form.Item wrapperCol={{span: 23}} className="mt-3" name="description" label="متن محتوا">
                                        <Input.TextArea  rows={5} />
                                    </Form.Item>
                                </div>
                                <Row>
                                    <Col xs={24} sm={12} md={10} lg={7} xl={7}>
                                        <Form.Item className="mt-3" label="نام فایل محتوا" name="uploadTxt" >
                                            <Input value={attachmentTitle} onChange={ e => setAttachmentTitle(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                    <Col className="" xs={24} sm={12} md={10} lg={7} xl={7}>
                                        <Form.Item className="mt-3" label="فایل محتوا">
                                            <Upload
                                                name="file"
                                                action={MEDIA_URL + CONTENTS_ATTACH_UPLOAD}
                                                fileList={attachmentsList}
                                                listType="picture"
                                                headers={{
                                                    Authorization: `Bearer ${getTokenObject().Authorization}`
                                                }}
                                                beforeUpload={ (file, fileList) => {
                                                    if (attachmentTitle === '') {
                                                        form.setFields([
                                                            {
                                                            name: 'uploadTxt',
                                                            errors: ['نام فایل اجباری است'],
                                                            },
                                                        ]);
                                                        return Upload.LIST_IGNORE
                                                    }
                                                } }
                                                onChange={ (info) => {
                                                    let result = info.fileList
                                                    setIsLoadingFile(true)
                                                    if (info.file.status === 'done') {
                                                        setIsLoadingFile(false)
                                                        if (info.file.response.isSuccess){

                                                            result = result.map( item => {
                                                                if (item.uid === info.file.uid){
                                                                    return { ...item, fileSize: info.file.response.data.fileSize,
                                                                        fileFormat: info.file.response.data.fileFormat,
                                                                        path: info.file.response.data.path,
                                                                        title: attachmentTitle}
                                                                }else{
                                                                    return item
                                                                }
                                                            })
                                                            setAttachmentTitle('')
                                                            form.setFieldsValue({"uploadTxt": ""})
                                                        }
                                                    }
                                                    if (info.file.status === "error"){
                                                        setIsLoadingFile(false)
                                                        form.setFields([
                                                            {
                                                              name: 'uploadTxt',
                                                              errors: [info.file.response.message],
                                                            },
                                                         ]);
                                                    }
                                                    if (info.file.status === "removed"){
                                                        setIsLoadingFile(false)
                                                    }
                                                    setAttachmentsList(result)
                                                }}
                                            >
                                                <Button loading={isLoading}>افزودن فایل</Button>
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <h6 className="my-4">نمایش برای:</h6>
                                <Row>
                                    <Col className="ml-4" xs={24} sm={12} md={10} lg={7} xl={7}>
                                        <Form.Item name="assignmentTitleType" label="گروه" >
                                            <Select 
                                                mode="multiple"
                                                size="large"
                                                dropdownClassName="text-right"
                                                // tagRender={ () => {} }
                                                disabled
                                                showArrow={true}
                                                onSelect={ (string) => {
                                                    let values = getAssignmentList(string)
                                                    form.setFieldsValue({'assignmentTitleType': values})
                                                    if (values.length === 1) {
                                                        setCanSelectCity(false)
                                                    }else{
                                                        setCanSelectCity(true)
                                                    }
                                                } }
                                                onDeselect={ (string) => {
                                                    let values = getAssignmentList(string)
                                                    if (string === 2) {
                                                        setCanSelectCity(false)
                                                    }else{
                                                        setCanSelectCity(true)
                                                    }
                                                } }
                                            >
                                                {
                                                    basicInfo.countryDivisionLevel
                                                        // .filter( item => item.value >= userProfile.assignmentTitleType )
                                                        .map( (item, index) => (
                                                        <Select.Option value={item.value} key={index} disabled={item.value <= userProfile.assignmentTitleType} >{item.name}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                { content.countryDivisionCode.split(".").length === 1 && <Col span={6}> <h6>استان</h6> <Input value="همه" disabled /> </Col> }
                                <CountryDivisions form={form} visibleFields={content.countryDivisionCode.split(".").length} defaultCode={content.countryDivisionCode} />
                                {
                                    content.isEditable && (
                                        <div className="text-left mt-5 ml-4 mb-3">
                                            <Button className="px-4" size="large" loading={isLoading} type="primary" disabled={isLoadingFile} htmlType="submit" >ویرایش</Button>
                                        </div>
                                    )
                                }
                            </Form>
                            )
                        }
                    </Spin>
                </div>
            </div>
            <div className="py-5">

            </div>
        </>
    )
}

export default EditContent
