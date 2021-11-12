import React, {useEffect, useState} from 'react';
// import ReactApexChart from 'react-apexcharts'
import {useTokenClaims} from "../public/hooks";
import {Button, Empty, Tooltip} from "antd";
import {BsArrowLeft} from "react-icons/bs";
import {cleanCountriesStates} from "../../redux/countries";
import {useDispatch} from "react-redux";
import {DoubleLeftOutlined, LeftOutlined} from "@ant-design/icons";

const ApexChart = (props) => {
    const {dataList = [], getDate, firstReport = "", additionText = "", addtionValue = "count",range=[],getInitialCDC,first="1"} = props;
    const {countryDivisionCode} = useTokenClaims()

    const [part, setPart] = useState( firstReport===first ? firstReport :firstReport?.slice(0, firstReport?.lastIndexOf(".")))
    // const {countryDivisionCode} = useSelector(state => state.auth);
    const [series, setSeries] = useState([])
    const dispatch = useDispatch();
    const [options, setOptions] = useState({
        dataLabels: {
            enabled: true,
            enabledOnSeries: undefined,

            textAnchor: 'middle',
            distributed: false,
            offsetX: 0,
            offsetY: 0,
            formatter: function (text, op) {
                // console.log(text, op, op.w.config.series[0].data[op.dataPointIndex]?.[addtionValue])
                let val = op.w.config.series[0].data[op.dataPointIndex]?.[addtionValue];
                return `${text}: ${val}${additionText}`;
                // return [`${val} ${additionText}`,' ',' ',' ',' ' ,text]
            },

            style: {
                fontSize: '11px',
                fontFamily: 'IranSans ,Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: ["#fff"],
                display:"flex",
                flexDirection:"column"
            },
            background: {
                enabled: true,
                foreColor: '#fff',
                padding: 4,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: '#fff',
                opacity: 0.9,
                dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45
                }
            },
            dropShadow: {
                enabled: false,
                top: 1,
                left: 1,
                blur: 1,
                color: '#000',
                opacity: 0.45
            }
        },

        tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                return '<div class="arrow_box p-2">' +
                    '<span>' + (w.config.series[0].data[dataPointIndex]?.x) + '</span>' +
                    '<span class="px-1">:</span>' +
                    '<span>' + w.config.series[0].data[dataPointIndex]?.[addtionValue] + '</span>' +
                    '</div>'
            },
            style: {
                fontSize: '12px',
                fontFamily: 'IranSans ,Helvetica, Arial, sans-serif'
            },
        },
        legend: {
            show: false
        },

        title: {
            text: '',
            align: 'center'
        },
        // colors: Colors,

        chart: {
            foreColor: '#c61457',
            height: 700,
            type: 'treemap',
            events: {
                dataPointSelection: function (event, chartContext, config) {
                    // console.log(config.dataPointIndex, config.w.config.series[0].data, config.w.config.series[0].data[config.dataPointIndex])
                    changeData(config.w.config.series[0].data[config.dataPointIndex]?.mainCDC)
                    // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                }
            }
        },
        plotOptions: {
            treemap: {
                distributed: true,
                // enableShades: false
                enableShades: true,
                shadeIntensity: -0.1,
                reverseNegativeShade: true,
                colorScale: {
                ranges:range
                //     [
                //     {
                //         from: -8,
                //         to: 28, // + 8
                //         color: '#52B12C'
                //     },
                //     {
                //         from: 29,
                //         to: 48,
                //         color: '#ffd64e'
                //     },
                //     {
                //         from: 49,
                //         to: 68,
                //         color: '#CD363A'
                //     },
                //     {
                //         from: 69,
                //         to: 1000,
                //         color: '#302A2A'
                //     }
                // ]
                }
                
            }
        }
    })
    const changeData = (data) => {
        if(firstReport!==first){
            // console.log("pakkkkkkkkkk")
            // dispatch(cleanCountriesStates())
        }

        if (data) {
            setPart(data)
            getDate(data)
            getInitialCDC(data)
        }
    }
    useEffect(() => {
        if (dataList?.length) {
            // setPart(countryDivisionCode)
            let list = []
            list = dataList.map(t => ({x: t?.mainCDCName ? t.mainCDCName : '', y: (t?.[addtionValue] ? (t?.[addtionValue] +50) : 50), ...t}))
            // dataList.forEach(t => {
            //     if (t?.mainCDCName)
            //         list.push({x: t?.mainCDCName, y: t?.count, ...t})
            // })

            setSeries(list)
        } else {
            setSeries([])
        }
    }, [dataList])

    const comeBack = () => {
        if(firstReport!==first)
        dispatch(cleanCountriesStates())
        changeData(part)
        getInitialCDC(part)
    }

    const comeBackToFirst = () => {
        if(firstReport!==first)
            dispatch(cleanCountriesStates())
        if (first) {
            changeData(first)
            getInitialCDC(first)
        }
    }
    return (
        <>
            {/*<div className="text-left">*/}
            {/*    <Button type="link" onClick={comeBack}>بازگشت</Button>*/}
            {/*</div>*/}
            {series?.length ?
                <div id="chart">
                    {/* <ReactApexChart options={options} series={[{data: series}]} type="treemap" height={700}/> */}
                </div>
                : <Empty description="گزارشی پیدا نشد" className="mt-2"/>}
            {/*<div className="d-flex align-items-center justify-content-between">*/}
            {/*    <Button type="link" onClick={comeBackToFirst}>*/}
            {/*        صفحه نخست*/}
            {/*        /!*<BsArrowLeft />*!/*/}
            {/*    </Button>*/}
            {/*    <Button type="link" onClick={comeBack}>*/}
            {/*        قبلی*/}
            {/*        <BsArrowLeft/>*/}
            {/*    </Button>*/}
            {/*</div>*/}
            <div className="text-left d-flex justify-content-end mt-2">
                <Tooltip placement="top" title={"برگشت به صفحه نخست"}>
                <Button className="d-flex align-items-center ml-2" onClick={comeBackToFirst}><DoubleLeftOutlined/></Button>
                </Tooltip>
                <Tooltip placement="top" title={"برگشت به قبلی"}>
                <Button className="d-flex align-items-center" onClick={comeBack}><LeftOutlined/></Button>
                </Tooltip>
            </div>
        </>
    )
}

export default ApexChart;