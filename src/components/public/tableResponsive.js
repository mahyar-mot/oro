import React from 'react';
import {Pagination} from 'antd';

export const TableResponsive = (props) => {
    const {total, onChange, current, pageSize = 10,pagination=true} = props;
    return (
        <div className="d-lg-none pb-5 mb-3">
            {props?.children}
            {pagination ?<div className="text-center">
                <Pagination
                    defaultCurrent={1}
                    size="small"
                    // responsive={true}
                    onChange={onChange}
                    showQuickJumper
                    showSizeChanger={false}
                    hideOnSinglePage={true}
                    current={current}
                    total={total}
                    pageSize={pageSize}
                />
            </div> :''}
        </div>
    );
};


export const RowResponsive = (props) => {
    const {title, dataIndex,render, className} = props;
    return (
        <tr>
            <td>{title} </td>
            <td className={className}>{render ? render(title,dataIndex) : dataIndex}</td>

        </tr>
    );
};
