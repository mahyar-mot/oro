import React from 'react';
import { Table, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router';
import { getContentViewer, resetContentViewerList } from '../../redux/contents/contentsRetrieve';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg";


function ViewersTable(props) {

    const { Column } = Table;
    const {id} = useParams();
    const dispatch = useDispatch();
    const { contentViewersList, isLoading } = useSelector( state => state.content.retrieve )

    React.useEffect( () => {
        if (id){
            dispatch(getContentViewer(id))
        }
        return () => dispatch(resetContentViewerList())
    }, [])

    return (
        <div className="mb-5">
            <Table 
                dataSource={contentViewersList}
                className="shadow-sm"
                loading={isLoading}
                // pagination={
                //     {
                //         position: ["bottomCenter"],
                //         onChange: (page, pageSize) => dispatch(getContentsList({page: page})),
                //         total: listCount,
                //         pageSize: 10,
                //     }
                // }
                rowClassName={(record, index) => index % 2 === 0 ? '' :  'alternate-row'}
                bordered
            >
                <Column title="شماره" key="id" render={ (text, record, index) => (`${index+1}`) }  />
                <Column title="نام و نام خانوادگی" dataIndex="userFullName" key="userFullName" />
                <Column title="کدملی" dataIndex="userName" key="userName" />
                <Column title="سطح فعالیت" dataIndex="assignmentTitle" key="assignmentTitle" />
                <Column title="موقعیت" dataIndex="location" key="location" />
            </Table>
        </div>
    )
}

export default ViewersTable
