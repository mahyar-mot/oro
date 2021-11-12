import React from 'react';
import {Table, Button, Popconfirm} from 'antd';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import {TableResponsive,RowResponsive} from "../public/tableResponsive";
import { getCategoriesList, cleanCategoriesList } from '../../redux/categories/categoriesList';
import { categoryDelete } from "../../redux/categories/categoryUpdate";
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg";
import {ReactComponent as EditPic} from "../../assets/icons/edit_black_24dp.svg";


function ListTable(props) {

    const {Column} = Table
    const history = useHistory()

    const dispatch = useDispatch()
    const { categoriesList, isLoading, listCount } = useSelector( state => state.category.list )

    const [currentPage, setCurrentPage] = React.useState(1)

    React.useEffect(() => {
        dispatch(getCategoriesList({}))
        return () => {
            dispatch(cleanCategoriesList())
        }
    }, [dispatch])

    return (

        <div>
            <div className="d-none d-lg-block pb-5">
                <Table
                    dataSource={categoriesList.filter( item => item.parentId === null)}
                    loading={isLoading}
                    pagination={{
                        position: ["bottomCenter"],
                        onChange: (page, pageSize) => setCurrentPage(page),
                        total: listCount,
                        pageSize: 10,
                    }}
                    className="shadow-sm"
                    rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                    bordered
                >
                    <Column title="شماره" key="id" render={ (text, record, index) => (`${((currentPage - 1) * 10) + index + 1}`) }  />
                    <Column title="عنوان دسته‌بندی" dataIndex="title"  key="title"/>
                    <Column 
                        title="زیرمجموعه" 
                        dataIndex="childHa" 
                        key="childHa"
                        render={
                            (text, record, index) => {
                                if (record.childHa === '') return <Button type="secondary" onClick={e => {
                                    history.push(`/categories/edit/${record.id}`)
                                }} > اضافه کردن زیرمجموعه + </Button>
                                return record.childHa
                            }
                        }
                    />
                    <Column
                        title="عملیات"
                        dataIndex="tags"
                        key="tags"
                        render={(text, record) => (
                            <>
                                <Button className="ml-3" type="secondary" icon={<EditPic />}  onClick={e => {
                                    history.push(`/categories/edit/${record.id}`)
                                }} />
                                <Popconfirm
                                    title="آیا از حذف این دسته بندی مطمئن هستید؟"
                                    onConfirm={ () => {dispatch(categoryDelete(record.id)); setTimeout( () => dispatch(getCategoriesList({})) , 500) }}
                                    okText="بلی"
                                    cancelText="خیر"
                                >
                                    <Button danger icon={<DeletePic/>} />
                                
                                </Popconfirm>
                            </>
                        )}
                    />
                </Table>

            </div>
            <TableResponsive pageSize={10} onChange={ (page, pageSize) => setCurrentPage(page) } total={1000}>
                {categoriesList.length && categoriesList.filter( item => item.parentId === null).map((item, i) => <table className="table table-striped border-0">
                        <tbody>
                            <RowResponsive title="شماره" dataIndex={ ((currentPage - 1) * 10) + i + 1 } key="index"/>
                            <RowResponsive title="عنوان دسته‌بندی" dataIndex={item?.title} key="title"/>
                            <RowResponsive 
                                title="زیرمجموعه" 
                                dataIndex={
                                  item.childHa === '' ? <Button type="secondary" size="small" onClick={e => {
                                    history.push(`/categories/edit/${item.id}`)
                                }} > اضافه کردن زیرمجموعه + </Button> : item.childHa
                              } 
                                key="childHa"
                            />
                            <RowResponsive title="عملیات" dataIndex={
                                    <>
                                        <Button className="ml-3" type="secondary" icon={<EditPic />} size="small" onClick={e => {
                                            history.push(`/overseers/update/${item.id}`)
                                        }} />
                                        <Popconfirm
                                            title="آیا از حذف این دسته بندی مطمئن هستید؟"
                                            onConfirm={ () => {dispatch(categoryDelete(item.id)); setTimeout( () => dispatch(getCategoriesList({})) , 500) }}
                                            okText="بلی"
                                            cancelText="خیر"
                                        >
                                        <Button danger icon={<DeletePic/>} />
                                        
                                        </Popconfirm>
                                    </>
                            } key="tags"/>
                        </tbody>
                    </table>
                )}
            </TableResponsive>
        </div>
    )
}

export default ListTable
