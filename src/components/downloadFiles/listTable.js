import React, {useState} from 'react';
import {Table, Button, Tag, Spin, Modal} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {getDownloadFiles} from "../../redux/downloadFiles";
import { ReactComponent as DownloadPic } from '../../assets/icons/download_for_offline_black_24dp.svg';
import {downloadAttachment, clearAttachmentFile} from '../../redux/uploadFile';
import {getBasicInfo} from '../../redux/basicInfos';
import {FcCheckmark} from "react-icons/fc";


function ListTable(props) {
    const {params = {}} = props;
    const {Column} = Table;
    const [loadingResponsive, setLoadingResponsive] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageSize, setCurrentPageSize] = useState(10)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedUser, setSelectedUser] = useState()
    const dispatch = useDispatch()
    const history = useHistory();

    const downloadLink = React.useRef(null)

    const { isLoading, listCount, downloadFiles } = useSelector(state => state.downloadFiles);
    const { attachmentFile, isDone } = useSelector( state => state.uploadFile )
    const {apiHasCalled} = useSelector(state => state.basicInfo);


    React.useEffect( () => {
        return () => dispatch(clearAttachmentFile())
    }, [])

    React.useEffect(() => {
        if (!apiHasCalled) {
            dispatch(getBasicInfo())
        }
        dispatch(getDownloadFiles({...params}));
    }, [params])

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
        <div className="mt-2">
            <div className="d-none d-lg-block">
                <Table
                    dataSource={downloadFiles}
                    pagination={
                        {
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                dispatch(getDownloadFiles({...params, page, pageSize}))
                                setCurrentPage(page)
                                setCurrentPageSize(pageSize)
                        },
                            total: listCount,
                            pageSize: currentPageSize,
                        }
                    }
                    className="shadow-sm"
                    rowKey="id"
                    loading={isLoading}
                    rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                    bordered
                >
                    <Column title="شماره" key="id" render={(text, record, index) => (`${((currentPage - 1) * currentPageSize) + index + 1}`)}/>
                    <Column
                        title=" نام فایل "
                        dataIndex="path"
                        key="path"
                    />
                    <Column title="نوع‌فایل" dataIndex="formatType" key="formatType"/>
                    <Column className="dir-ltr" title=" حجم" dataIndex="fileSize" key="fileSize"/>
                    <Column title=" وضعیت" dataIndex="stateType" key="stateType"/>
                    <Column title="دانلود شده" dataIndex="seen" key="seen" render={ t => t ? <FcCheckmark /> : '-'}/>
                    <Column className="dir-ltr" title=" زمان ارسال" dataIndex="creationDateTime" key="creationDateTime" />
                    <Column className="dir-ltr" title=" زمان تحویل" dataIndex="deliveryDateTime" key="deliveryDateTime" />
                    <Column
                        title="عملیات"
                        dataIndex="url"
                        key="url"
                        render={(text, record) => (
                            record.stateType === "آماده دانلود" && <Button shape="round" type="secondary" ref={downloadLink} onClick={() => dispatch(downloadAttachment(record.url))} >دانلود <DownloadPic className="mr-2" /></Button>
                        )}
                    />
                </Table>
            </div>

            <Spin spinning={loadingResponsive}>
                <TableResponsive total={listCount}
                                 pageSize={currentPageSize}
                                 onChange={(page, pageSize) => {
                                     setLoadingResponsive(true)
                                     dispatch(getDownloadFiles({...params, page, pageSize})).then(r => setLoadingResponsive(false))
                                     setCurrentPage(page)
                                     setCurrentPageSize(pageSize)
                                 }}
                >
                    {downloadFiles.length ? downloadFiles.map((item, i) => {

                            return <table className="table table-striped border-0" key={i}>
                                <tbody>
                                <RowResponsive title=" شماره "
                                               dataIndex={ ((currentPage - 1) * currentPageSize) + i + 1 }
                                               key="number"/>
                                <RowResponsive title=" نام فایل "
                                                dataIndex={item?.path}
                                                key="path"/>
                                <RowResponsive title="نوع‌فایل"
                                                dataIndex={item?.formatType}
                                                key="formatType"/>
                                <RowResponsive title="حجم"
                                                className="dir-ltr"
                                                dataIndex={item?.fileSize}
                                                key="fileSize"/>
                                <RowResponsive title="وضعیت"
                                                dataIndex={item?.stateType}
                                                key="stateType"/>
                                <RowResponsive title="دانلود شده"
                                                dataIndex={item?.seen ? <FcCheckmark /> : '-'}
                                                key="seen"/>
                                <RowResponsive title="زمان ارسال "
                                               className="dir-ltr"
                                               dataIndex={item?.creationDateTime}
                                               key="creationDateTime"/>
                                <RowResponsive title="زمان تحویل "
                                               className="dir-ltr"
                                               dataIndex={item?.deliveryDateTime}
                                               key="deliveryDateTime"/>
                                <RowResponsive title="عملیات "
                                               dataIndex={ 
                                                    item.stateType === "آماده دانلود" && <Button shape="round" type="secondary" ref={downloadLink} onClick={() => dispatch(downloadAttachment(item.url))} >دانلود <DownloadPic className="mr-2" /></Button>
                                                }
                                               key="age"/>
                                </tbody>
                            </table>
                        }
                    ) : ""}
                </TableResponsive>
            </Spin>
        </div>
    )
}

export default ListTable
