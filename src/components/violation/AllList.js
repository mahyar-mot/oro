import React, {useState} from 'react';
import {Table, Button, Tag, Spin} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {getAllViolationsList} from '../../redux/violation/allViolationList';
import moment from "moment-jalaali"
import {getBasicInfo} from "../../redux/basicInfos";
import classnames from "classnames";
import {useTokenClaims} from "../public/hooks";
import ListTable from "./listTable";


function AllList(props) {
    const {params = {}} = props;
    const {Column} = Table;
    // const [loadingResponsive, setLoadingResponsive] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory();

    const { isLoading, violationList,listCount} = useSelector(state => state.violation.allViolationList);
    const {education, apiHasCalled} = useSelector(state => state.basicInfo);

    // const [currentPage, setCurrentPage] = useState(1)
    // const {countryDivisionCode} = useTokenClaims()

    React.useEffect(() => {
        if (!apiHasCalled){
            dispatch(getBasicInfo())
        }

            dispatch(getAllViolationsList({...params}));
            // dispatch(getAllViolationsList({...params, countryDivisionCode: countryDivisionCode}));
    }, [params])

    return (
        <div>
            <span className="text-muted mr-2 font-size-sm"> تعداد رکوردها : {listCount} </span>
            <ListTable getData={(p, ps)=>  dispatch(getAllViolationsList({...params, page:p, pageSize: ps}))} violationList={violationList} params={params} listCount={listCount} isLoading={isLoading} />
        </div>
    )
}

export default AllList
