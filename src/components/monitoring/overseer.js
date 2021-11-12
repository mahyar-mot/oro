import React, {useEffect, useMemo, useRef, useState} from 'react';
import {NavLink as NavLinkRouter} from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs";
import {Badge, Card, Col, Empty, Form, Select, Spin} from "antd";
import ApexChart from "./chart"
import {getMonitoringOverseer, cleanList} from "../../redux/monitoring/overseer"
import {useDispatch, useSelector} from "react-redux";
import {useTokenClaims} from "../public/hooks";
import ListFilters from "./listFiltersOverseer";
import SortRange, {BasicNumber} from "./sortRange";

let intervalId

const Overseer = () => {
    const {listMonitoring, listCount} = useSelector(state => state.monitoring.overseer);
    const {countryDivisionCode} = useTokenClaims()
    const dispatch = useDispatch();
    const [range, setRange] = useState([])
    const [back, setBack] = useState("")
    const [mount, setMount] = useState(false)
    const [InitialCDC, setInitialCDC] = useState("1")
    const [queryState, setQueryState] = useState({})
    const {assignmentTitleType} = useSelector(state => state.auth.userProfile);
    // const mount = useRef(false);
    useEffect(() => {
        if (!back)
            setBack(countryDivisionCode)

        if (countryDivisionCode)
            getDate()
    }, [countryDivisionCode])

    useEffect(() => {
        if (range?.length)
            setMount(true)
    }, [range])
    useEffect(() => {
        return ()=>{
            dispatch(cleanList())
            clearTimeout(intervalId)
        }
    }, [])
    const getDate = (code = countryDivisionCode, query=queryState) => {
        // console.log(query)
        if (code) {
            setBack(code)
            // setMount(true)
            setRange([])
            dispatch(getMonitoringOverseer(code, query))
        }
        if (assignmentTitleType === 1){
            intervalId = setTimeout( () => getDate(InitialCDC), 60000 )
        }
    }
    const getInitialCDC= (code = countryDivisionCode) => {
        if (code) {
            setInitialCDC(code)
        }
    }

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
            ['#00BB70', '#FC8A17', '#FC2F51', '#1789FC'])
        setRange(r)
    }, [listMonitoring])

    // console.log((range?.length || ((!listMonitoring?.length) && mount)), range?.length, ((!listMonitoring?.length) && mount), mount)
    return (
        <div>
            <div className="content mb-3 p-4">
                <div className="d-flex justify-content-between flex-column flex-lg-row">
                    <span className="square-indicator mb-0">  مانیتورینگ ناظران کشور</span>
                    <p className="mb-0">
                        <span className="text-muted small"> تعداد کل ناظران    </span>
                        <span>:</span>
                        <span className="px-1">{listCount}</span>
                        <span>ناظر</span>
                    </p>
                </div>
                {/*<div className="d-block d-md-flex   justify-content-between  align-items-center  mt-4">*/}
                {/*    <p className="mb-0">*/}
                {/*        <span className="text-muted small"> تعداد کل ناظران در کشور   </span>*/}
                {/*        <span>:</span>*/}
                {/*        <span className="px-1">{listCount}</span>*/}
                {/*        <span>ناظر</span>*/}
                {/*    </p>*/}
                {/*</div>*/}

                <div>
                    <ListFilters getDate={getDate} InitialCDC={InitialCDC || back} setQueryState={t=>setQueryState(t)} back={countryDivisionCode}/>
                    <div className="mt-2">
                        {(range?.length || (!listMonitoring?.length && mount)) ?
                            <ApexChart getDate={getDate} dataList={listMonitoring} firstReport={back}
                                       first={countryDivisionCode}
                                       range={range}
                                       addtionValue={"count"}
                                       additionText={""}
                                       getInitialCDC={getInitialCDC}
                            />

                            : <div className="text-center mt-3"><Spin/></div>}
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

export default Overseer;
