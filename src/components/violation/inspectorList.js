import React, {useState} from 'react';
import {Table, Button, Tag, Spin} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {getInspectorViolationsList} from '../../redux/violation/inspectorViolationList';
import moment from "moment-jalaali"
import {getBasicInfo} from "../../redux/basicInfos";
import classnames from "classnames";
import {useTokenClaims} from "../public/hooks";
import ListTable from "./listTable";


function InspectorList(props) {
    const {params = {}} = props;
    const {Column} = Table;
    // const [loadingResponsive, setLoadingResponsive] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory();

    const { isLoading, violationList,listCount} = useSelector(state => state.violation.inspectorViolationList);
    const {education, apiHasCalled} = useSelector(state => state.basicInfo);

    // const [currentPage, setCurrentPage] = useState(1)
    // const {countryDivisionCode} = useTokenClaims()

    React.useEffect(() => {
        if (!apiHasCalled){
            dispatch(getBasicInfo())
        }

            dispatch(getInspectorViolationsList({...params}));

        // dispatch(getInspectorViolationsList({...params, countryDivisionCode: countryDivisionCode}));
    }, [params])

    return (
        <div>
            <span className="text-muted mr-2 font-size-sm"> تعداد رکوردها : {listCount} </span>
            <ListTable getData={(p, ps)=>  dispatch(getInspectorViolationsList({...params, page: p, pageSize: ps}))} violationList={violationList} listCount={listCount} isLoading={isLoading} />
        </div>
    )
}

export default InspectorList
