import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {cleanPostCartsList} from '../../redux/carts/print';
import {Button, Spin} from "antd";
import {Link} from "react-router-dom";

const Print = () => {
    // const {cartsList,listCount} = useSelector(state => state.carts.list)
    const {cartsList, listCount, isLoading} = useSelector(state => state.carts.printList)
    const [onLoading, setOnLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(cleanPostCartsList())
        }
    }, [])

    let checkLoad = null;
    const printDiv = () => {

        window.frames["print_frame"].document.body.innerHTML = document.getElementById("printDiv").innerHTML +
            '<style>\n' +
            '        * {\n' +
            '            box-sizing: border-box;\n' +
            '            font-family: IranSans;\n' +
            '            padding: 0;\n' +
            '            margin: 0;\n' +
            '        }\n' +
            '        body {\n' +
            '            /* background: rgb(204,204,204);  */\n' +
            '            direction: rtl;\n' +
            '        }\n' +
            '        #page {\n' +
            '            background: white;\n' +
            '            /* padding: 1.3cm 1.8cm; */\n' +
            '            display: block;\n' +
            '            /* width: 21cm;\n' +
            '            height: 29.7cm;  */\n' +
            '            /* margin: 0 auto; */\n' +
            '            /* margin-bottom: 0.5cm; */\n' +
            '            /* box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); */\n' +
            '        }\n' +
            '        /* page[size="A4"] {\n' +
            '        width: 21cm;\n' +
            '        height: 29.7cm;\n' +
            '    } */\n' +
            '        @page {\n' +
            '            size: A4;\n' +
            '        }\n' +
            '        @page :left {\n' +
            '            margin-left: 0;\n' +
            '        }\n' +
            '\n' +
            '        @page :right {\n' +
            '            margin-right: 0;\n' +
            '        }\n' +
            '\n' +
            '        .cart {\n' +
            '            width: 9.5cm;\n' +
            '            height: 5.72cm;\n' +
            '            padding: 1mm 0.5cm ;\n' +
            '            /*width: 8.5cm;*/\n' +
            '            /*height: 5.5cm;*/\n' +
            '            /*width: 8.2cm;*/\n' +
            '            /*height: 5.3cm;*/\n' +
            '        }\n' +
            '        .cart-content {\n' +
            '            padding-top: 1.5cm;\n' +
            '            padding-right: 2.4cm;\n' +
            '            display: flex;\n' +
            '            justify-content: space-between;\n' +
            '            /*margin-top: 1.8cm;*/\n' +
            '            /*margin-right: 1.9cm;*/\n' +
            '        }\n' +
            '        .box {\n' +
            '            padding-top: 6mm;\n' +
            '            padding-right: 8mm;\n' +
            '            width: 21cm;\n' +
            '            max-height: 29.5cm;\n' +
            '            /*margin-top: 1.3cm;*/\n' +
            '            /*margin-right: 1.8cm;*/\n' +
            '            /*width: 17.4cm;*/\n' +
            '            /*max-height: 27.2cm;*/\n' +
            '            display: -ms-flexbox;\n' +
            '            display: -webkit-flex;\n' +
            '            display: -moz-box;\n' +
            '            display: flex;\n' +
            '            flex-wrap: wrap;\n' +
            '            margin-bottom: .5cm;\n' +
            '        }\n' +
            '        .cart-content div{\n' +
            '            /* display: inline-block; */\n' +
            '            float: right;\n' +
            '        }\n' +
            '        .texts{\n' +
            '            max-width: 3.5cm;\n' +
            '            width: 3.5cm;\n' +
            '            height: 2.8cm;\n' +
            '            padding-top: .9mm;\n' +
            '        }\n' +
            '        span{\n' +
            '            margin-bottom: .3cm;\n' +
            '                font-size: 10px;\n' +
            '                font-weight: 600;\n' +
            '            max-width: 3.2cm;\n' +
            '            display: block;\n' +
            '            font-family: IranSans;\n' +
            '                line-height:13px;\n' +
            '        }\n' +
            '        .pics{\n' +
            '            max-height: 2.8cm;\n' +
            '            height: 2.8cm;\n' +
            '            max-width: 2.1cm;\n' +
            '            width: 2.1cm;\n' +
            '            margin-left: 3mm;\n' +
            '        }\n' +
            '        .pics img{\n' +
            '            max-width: 2.1cm;\n' +
            '            max-height: 2.8cm;\n' +
            '        }\n' +
            '        @media print {\n' +
            '            @page {\n' +
            '                size: A4;\n' +
            '            }\n' +
            '            /*body{*/\n' +
            '            /*    width: 21cm;*/\n' +
            '            /*    height: 29.7cm;*/\n' +
            '            /*    !* change the margins as you want them to be. *!*/\n' +
            '            /*} */\n' +
            '\n' +
            '            .cart {\n' +
            '                width: 9.5cm;\n' +
            '                height: 5.72cm;\n' +
            '                padding: 1mm 0.5cm ;\n' +
            '                /*width: 8.5cm;*/\n' +
            '                /*height: 5.5cm;*/\n' +
            '                /*width: 8.2cm;*/\n' +
            '                /*height: 5.3cm;*/\n' +
            '            }\n' +
            '            .cart-content {\n' +
            '                padding-top: 1.5cm;\n' +
            '                padding-right: 2.4cm;\n' +
            '                display: flex;\n' +
            '                justify-content: space-between;\n' +
            '                /*margin-top: 1.8cm;*/\n' +
            '                /*margin-right: 1.9cm;*/\n' +
            '            }\n' +
            '            .box {\n' +
            '                padding-top: 6mm;\n' +
            '                padding-right: 8mm;\n' +
            '                width: 21cm;\n' +
            '                max-height: 29.5cm;\n' +
            '                /*margin-top: 1.3cm;*/\n' +
            '                /*margin-right: 1.8cm;*/\n' +
            '                /*width: 17.4cm;*/\n' +
            '                /*max-height: 27.2cm;*/\n' +
            '                display: -ms-flexbox;\n' +
            '                display: -webkit-flex;\n' +
            '                display: -moz-box;\n' +
            '                display: flex;\n' +
            '                flex-wrap: wrap;\n' +
            '                margin-bottom: .5cm;\n' +
            '            }\n' +
            '            .cart-content div{\n' +
            '                /* display: inline-block; */\n' +
            '                float: right;\n' +
            '            }\n' +
            '            .texts{\n' +
            '                max-width: 3.5cm;\n' +
            '                width: 3.5cm;\n' +
            '                height: 2.8cm;\n' +
            '                padding-top: .9mm;\n' +
            '            }\n' +
            '            span{\n' +
            '                margin-bottom: .3cm;\n' +
            '                font-size: 10px;\n' +
            '                font-weight: 600;\n' +
            '                max-width: 3.2cm;\n' +
            '                display: block;\n' +
            '            font-family: IranSans;\n' +
            '                line-height:13px;\n' +

            '            }\n' +
            '            .pics{\n' +
            '                max-height: 2.8cm;\n' +
            '                height: 2.8cm;\n' +
            '                max-width: 2.1cm;\n' +
            '                width: 2.1cm;\n' +
            '                margin-left: 3mm;\n' +
            '            }\n' +
            '            .pics img{\n' +
            '                max-width: 2.1cm;\n' +
            '                max-height: 2.8cm;\n' +
            '            }\n' +
            '        }\n' +
            '    </style>';

        setTimeout(() => {
            window.frames["print_frame"].window.focus();
            window.frames["print_frame"].window.print();
        }, 200)

    }

    return (
        <>

                <div className="d-flex align-items-center justify-content-between mb-2">

                    <Button type="primary" className="ml-3" onClick={() => printDiv()} loading={onLoading && listCount}>
                        چاپ صفحه
                    </Button>

                    <Link type="primary" to="/carts">
                        بازگشت
                    </Link>
                </div>

                <div className="text-center bg-white p-4">
                    <Spin spinning={isLoading}/>
                </div>
<div
    onLoad={() => {
        clearTimeout(checkLoad);
        setOnLoading(true)
        // console.log("on")
        checkLoad = setTimeout(() => {
            setOnLoading(false)
            // console.log("setTimeout")
        }, 15000)
        // console.log("on")
    }}
   >
                <div id="printDiv">
                    <div id="page">
                        {
                            Array.from({length: Math.ceil(listCount / 10)}, (item, i) => <>
                                    <div className="box">
                                        {
                                            cartsList.map((e, key) => (((key < (i + 1) * 10) && (key >= (i) * 10))) &&
                                                <div className="cart">
                                                    <div className="cart-content">
                                                        <div className="texts">
                                                            <span>{e?.ostan ?? ""} </span>
                                                            <span> {e?.fullName ?? ""}</span>
                                                            <span>{e?.nationalNo ?? ""}</span>
                                                        </div>
                                                        <div className="pics"><img
                                                            // onLoadStart={()=>console.log("start")}
                                                            // onLoad={()=>console.log("on")}

                                                            src={e?.image ?? ""}/>
                                                        </div>
                                                    </div>
                                                </div>)
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
</div>
                <iframe style={{height: 0}} name="print_frame" width="0" height="0" frameBorder="0" src="about:blank"/>

        </>
    );
};

export default Print;