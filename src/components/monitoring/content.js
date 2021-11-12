import React, {useEffect, useState} from 'react';
import {NavLink as NavLinkRouter, useParams} from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs";
import {Badge, Col, Empty, Form, Select, Spin} from "antd";
import ApexChart from "./chart"
import {getMonitoringContent, cleanList} from "../../redux/monitoring/content"
import {useDispatch, useSelector} from "react-redux";
import {useTokenClaims} from "../public/hooks";
import ListFilters from "./listFilters";
import {Alert} from "reactstrap";
import {clearAttachmentFile, getContent, resetContent} from "../../redux/contents/contentsRetrieve";
import SortRange, {BasicNumber} from "./sortRange";

const Content = () => {
    const {listMonitoring,listCount} = useSelector(state => state.monitoring.contents);
    const {countryDivisionCode} = useTokenClaims()
    const dispatch = useDispatch();
    const [range, setRange] = useState([])
    // const {countryDivisionCode} = useSelector(state => state.auth);
    const {id} = useParams()
    const {content, isLoading, error, viewerApiCalled} = useSelector(state => state.content.retrieve)
    const [back, setBack] = useState("1")
    const [mount, setMount] = useState(false)
    const [InitialCDC, setInitialCDC] = useState()
    const [queryState, setQueryState] = useState({})
    useEffect(() => {
        if (!back)
            setBack("1")

        if (countryDivisionCode)
            getDate()
    }, [countryDivisionCode])
    const getDate = (code = "1") => {
        if (code) {
            setBack(code)
            setRange([])
            dispatch(getMonitoringContent({cotentCreationId: id, originCountryDivisionCode: code}))
        }
    }
    useEffect(() => {
        if (range?.length)
            setMount(true)

    }, [range])
    const getInitialCDC = (code = "1") => {
        if (code) {
            setInitialCDC(code)
        }
    }

    useEffect(() => {
        return () => dispatch(cleanList())
    }, [])
    React.useEffect(() => {
        dispatch(getContent(id))
        return () => {
            dispatch(resetContent())
            dispatch(clearAttachmentFile())
        }
    }, [dispatch])
    React.useEffect(() => {
        let r = SortRange(listMonitoring, [
                {
                    from: -8,
                    to: BasicNumber, // + 8
                    color: '#00BB70'
                },
                {
                    from: BasicNumber + 1,
                    to: BasicNumber + 2,
                    color: '#FC8A17'
                },
                {
                    from: BasicNumber + 3,
                    to: BasicNumber + 4,
                    color: '#FC2F51'
                },
                {
                    from: BasicNumber + 5,
                    to: BasicNumber + 100,
                    color: '#1789FC'
                }
            ],
            ['#00BB70', '#FC8A17', '#FC2F51', '#1789FC'], "percentage")
        setRange(r)
    }, [listMonitoring])
    return (
        <div>
            <div className="text-left">
                <NavLinkRouter className="text-decoration-none" to="/contents">
                    <span className="link-color"> بازگشت به لیست محتوا   <BsArrowLeft/></span>
                </NavLinkRouter>
            </div>
            <div className="content mb-3 p-4">
                <div className="d-flex justify-content-between flex-column flex-lg-row">
                    <span className="square-indicator mb-2"> بازدید محتوا بر اساس تقسیمات کشوری</span>
                    <p className="mb-2">
                        <span className="text-muted small">تعداد کل بازدید </span>
                        <span>:</span>
                        <span className="px-1">{listCount}</span>
                        <span>بازدید</span>
                    </p>
                </div>
                <Alert color="info" style={{backgroundColor: "#F2F5F9"}}>
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                       <span>
                           <span className="small text-muted">عنوان محتوا</span>
                           <span className="px-1">:</span>
                           <span className="link-color">{content?.title}</span>
                       </span>
                        <span>
                               <span className="small text-muted"> تاریخ ارسال</span>
                           <span className="px-1">:</span>
                           <span>{content?.createDate}</span>
                       </span>
                    </div>
                </Alert>


                <div>
                    <ListFilters getDate={getDate} InitialCDC={InitialCDC} back={"1"}/>
                    <div className="mt-2">
                        {(range?.length || (!listMonitoring?.length && mount)) ?
                            <ApexChart
                                range={range}
                                getDate={getDate} dataList={listMonitoring} firstReport={back}
                                addtionValue={"percentage"}
                                additionText={"%"}
                                getInitialCDC={getInitialCDC}
                                first={"1"}
                            /> : <div className="text-center mt-3"><Spin/></div>}
                    </div>
                </div>
                {/*<div className="pt-3 px-2">*/}

                {/*    {[*/}
                {/*        {color: '#00BB70', label: "کم"},*/}
                {/*        {color: '#FC8A17', label: "متوسط"},*/}
                {/*        {color: '#FC2F51', label: "زیاد"},*/}
                {/*        {color: '#1789FC', label: "خیلی زیاد"}].map(color => (*/}
                {/*        <div key={color.color}>*/}
                {/*            <Badge color={color.color} text={color.label}/>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}

            </div>
        </div>
    );
};

export default Content;
