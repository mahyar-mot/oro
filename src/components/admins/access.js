import React from 'react';
import {Checkbox, Col, Form, Row, Spin} from "antd";
import { getRolesList, cleanAdminsList } from '../../redux/admins/adminsList';
import { useDispatch, useSelector } from 'react-redux';


const Access = () => {

    const dispatch = useDispatch();
    const { rolesList, isLoading } = useSelector( state => state.admin.list );

    React.useEffect( () => {
        dispatch(getRolesList())
        return () => dispatch(cleanAdminsList())
    }, [dispatch])

    return (
        <div>
            {
                !isLoading && Boolean(rolesList.length) ? (
                    <Form.Item label="سطح دسترسی" className="mt-3" name="roles">
                        <Checkbox.Group style={{width: "100%"}}>
                            <Row>
                                {
                                    rolesList.map((item, index) => <Col className="p-2" key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Checkbox value={item.value} disabled={item.value.startsWith("sys.")} >{item.label}</Checkbox>
                                    </Col>)
                                }
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                ) : <Spin />
            }
        </div>
    );
};

export default Access;