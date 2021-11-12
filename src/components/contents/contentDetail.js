import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink as NavLinkRouter, useParams, useHistory, useLocation} from "react-router-dom";
import { Skeleton, Divider, Table, Button, Popconfirm } from "antd";
import {BsArrowLeft} from 'react-icons/bs';
import { getContent, resetContent, setContentViewer, deleteContent, downloadAttachment, clearAttachmentFile } from '../../redux/contents/contentsRetrieve';
import { ReactComponent as DownloadPic } from '../../assets/icons/download_for_offline_black_24dp.svg';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg";
import { ReactComponent as CalendarPic } from "../../assets/icons/calendar-clock.svg";
import { ReactComponent as EditPic } from "../../assets/icons/edit_black_24dp.svg";
import {api} from "../../utils/api";
import {CONTENTS_DETAIL, CONTENTS_VIEWER } from "../../utils/constants";


const DownloadTable = (props) => {
    const { Column } = Table;
    const history = useHistory()
    const dispatch = useDispatch()
    const { attachmentFile, isDone } = useSelector( state => state.content.retrieve )
    const downloadLink = React.useRef(null)

    React.useEffect( () => {
        if (attachmentFile){
            if (isDone){
                const link = document.createElement('a');
                link.href = attachmentFile.href;
                link.setAttribute('download', attachmentFile.name); //or any other extension
                link.setAttribute('target', "_blank"); //or any other extension
                document.body.appendChild(link);
                link.click();
            }
        }
    }, [attachmentFile, isDone])

    return (
        <Table 
                dataSource={props.files}
                className="shadow-sm"
                pagination={false}
                rowClassName={(record, index) => index % 2 === 0 ? '' :  'alternate-row'}
                bordered
            >
                <Column title="شماره" key="id" responsive={["md"]} render={ (text, record, index) => (`${index+1}`) }  />
                <Column title="عنوان" dataIndex="title" key="title" />
                <Column title="فرمت" dataIndex="fileFormat" key="fileFormat" />
                <Column title="حجم" dataIndex="fileSize" key="fileSize" />
                <Column title="" dataIndex="pathAddress" key="pathAddress" render={ (text, record) => (
                        <Button shape="round" type="secondary" ref={downloadLink} onClick={() => dispatch(downloadAttachment(text))} >دانلود <DownloadPic className="mr-2" /></Button>
                        // <Button shape="round" type="secondary" href={text} download target="_blank" >دانلود <DownloadPic className="mr-2" /></Button>
                ) } />
        </Table>
    )
}


function ContentDetail(props) {

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const { content, isLoading, error, viewerApiCalled } = useSelector( state => state.content.retrieve )

    React.useEffect( () => {
        if (!viewerApiCalled.includes(String(id))) {
            dispatch(setContentViewer(id))
        }
    }, [])

    React.useEffect( () => {
        dispatch(getContent(id))
        return () => {
            dispatch(resetContent())
            dispatch(clearAttachmentFile())
        }
    }, [dispatch])

    return (
        <div className="content px-2 py-3 p-md-5 mb-5">
            {
                !isLoading && (
                    <>
                        <div className="d-flex justify-content-between">
                            <span className="square-indicator">{content.title}</span>
                            <div className="ml-2">
                                <NavLinkRouter className="text-decoration-none" to={`/contents${location.search}`}>
                                    <span className="link-color">بازگشت به لیست محتواها <BsArrowLeft /></span>
                                </NavLinkRouter> 
                            </div>
                        </div>
                        <div className="my-3">
                            <span className="text-muted d-inline-block">  دسته بندی: <span>{content.categoryTitle}</span></span>

                            <small className="mr-4">{content.createDate} <CalendarPic /></small>
                        </div>

                        <div className="p-2 mt-3 w-100">
                            {
                                content.pathAddress !== '' ? (
                                    <img className="img-fluid float-right d-inline pl-3 pb-2" style={{maxHeight: "300px", mawWidth: "400px"}} src={content.pathAddress} />
                                ) : (
                                    null
                                )
                            }
                            <span className="d-inline">
                                {content.description}
                            </span>


                        </div>
                        {
                            Boolean(content.contentFiles?.length) && (
                                <>
                                    <Divider />
                                    <div className="mt-5">
                                        <span className="square-indicator">دانلود فایل</span>
                                        <div className="py-2">
                                            <DownloadTable files={content.contentFiles}/>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        <Divider />
                        <div className="py-2 d-flex justify-content-between">
                            <div>
                                <div>
                                    گروه کاربران : 
                                    <div className="d-inline-block px-2">
                                        {
                                            content?.assignmentTitles?.map( (item, index) => (
                                                <span key={index} className="badge badge-pill background-pill-reverse mx-2 py-1 ml-1 mt-2">{item}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <small>
                                    تقسیمات کشوری : 
                                        {content?.countryDivisionCodeName}
                                    </small>
                                </div>
                            </div>
                            <div className="ml-2">
                                <NavLinkRouter className="text-decoration-none font-size-sm" to={`/contents/viewers/${id}`}>
                                    {/*<span className="link-color">لیست مشاهده کنندگان <BsArrowLeft /></span>*/}
                                </NavLinkRouter> 
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-5">
                            <Popconfirm
                                title="آیا از غیرفعال کردن این محتوا مطمئن هستید؟"
                                onConfirm={ () => {dispatch(deleteContent(content.id)); setTimeout( () => history.push('/contents') , 500) }}
                                okText="بلی"
                                cancelText="خیر"
                            >
                                {
                                    content?.isRemovable && (
                                        <Button danger size="large"> غیر فعالسازی محتوا <DeletePic className="mr-2" /></Button>
                                    )
                                }
                            </Popconfirm>
                            {
                                content?.isEditable && (
                                    <NavLinkRouter className="text-decoration-none font-size-sm" to={`/contents/edit/${id}`}>
                                        <Button type="text" className="text-success border-success mr-2" size="large" > ویرایش محتوا <EditPic className="mr-2" /> </Button>    
                                    </NavLinkRouter>
                                )
                            }
                        </div>
                    </>
                )
            }
            
        </div>
    )
}

export default ContentDetail
