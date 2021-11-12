import React, {useEffect, useState} from 'react';
import {NavLink as NavLinkRouter} from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs";
import {Badge, Col, Empty, Form, Select, Spin} from "antd";
import ApexChart from "./chart"
import {getMonitoringViolation,cleanList} from "../../redux/monitoring/violation"
import {useDispatch, useSelector} from "react-redux";
import {useTokenClaims} from "../public/hooks";
import ListFilters from "./listFilters";
import SortRange, {BasicNumber} from "./sortRange";

let intervalId

const Overseer = () => {
    const {listMonitoring, listCount} = useSelector(state => state.monitoring.violation);
    // useSelector(state =>console.log(state));
    const {countryDivisionCode} = useTokenClaims()
    const dispatch = useDispatch();
    const [range, setRange] = useState([])
    const {assignmentTitleType} = useSelector(state => state.auth.userProfile);
    const [back,setBack]=useState("")
    const [mount, setMount] = useState(false)
    const [InitialCDC, setInitialCDC] = useState("1")
    const [queryState, setQueryState] = useState({})
    useEffect(() => {
        if(!back)
            setBack(countryDivisionCode)

        if (countryDivisionCode)
            getDate()
    }, [countryDivisionCode])

    const getDate = (code = countryDivisionCode) => {
        if (code) {
            setBack(code)
            setRange([])
            dispatch(getMonitoringViolation(code))
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
    useEffect(() => {
        return ()=>{
            dispatch(cleanList())
            clearTimeout(intervalId)
        }
    }, [])
    useEffect(() => {
        if (range?.length)
            setMount(true)
    }, [range])
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
                    color: '#700F2B'
                }
            ],
            ['#00BB70', '#FC8A17', '#FC2F51', '#700F2B'])
        setRange(r)
    }, [listMonitoring])

    return (
        <div>
            <div className="content mb-3 p-4">
                <div className="d-flex justify-content-between flex-column flex-lg-row">
                    <span className="square-indicator">  مانیتورینگ تخلفات کشور</span>
                    <p className="mb-0">
                        <span className="text-muted small"> تعداد کل تخلفات    </span>
                        <span>:</span>
                        <span className="px-1">{listCount}</span>
                        <span>تخلف</span>
                    </p>
                </div>


                <div>
                    <ListFilters getDate={getDate} InitialCDC={InitialCDC || back} back={countryDivisionCode}/>
                    <div className="mt-2">
                        {(range?.length ||  (!listMonitoring?.length && mount)) ?
                        <ApexChart getDate={getDate} dataList={listMonitoring} firstReport={back}
                                   first={countryDivisionCode}
                                   addtionValue={"count"}
                                   range={range}
                                   additionText={""}
                                   getInitialCDC={getInitialCDC}
                        />:<div className="text-center mt-3"><Spin/></div>}
                    </div>
                </div>
                {/*<div className="pt-3 px-2">*/}

                {/*    {[*/}
                {/*        {color: '#00BB70', label: "کم"},*/}
                {/*        {color: '#FC8A17', label: "متوسط"},*/}
                {/*        {color: '#FC2F51', label: "زیاد"},*/}
                {/*        {color: '#700F2B', label: "خیلی زیاد"}].map(color => (*/}
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
