import React from 'react';
import {
    FaTwitter,
    FaInstagram,
    FaTelegram,
    FaRetweet,
    FaQuoteRight,
    FaReply,
    FaComment,
    FaChevronLeft, FaChevronRight, FaAngleDoubleRight, FaAngleDoubleLeft
} from "react-icons/fa";
import {Spin, Tag} from 'antd';
import {ReactComponent as ReactEyeLogo} from "../../assets/icons/eye.svg";
import {ReactComponent as ReactHeartLogo} from "../../assets/icons/heart.svg";
import CardPic from "../../assets/icons/pic/Group 1011.svg";
import PlayPic from "../../assets/icons/pic/PLAY.svg";
import IgtvPic from "../../assets/icons/pic/IGTV.svg";


const Icon = (props) => (
    <small
        className="mx-1"> {props.detail} {React.createElement(props.logo, {style: {width: "20px", ...props.misc}})} </small>
)


const convertSM = (social_media) => {
    const SM = {
        ig: "اینستاگرام",
        tg: "تلگرام",
        tw: "توییتر",
        fb: "فیسبوک",
        yt: "یوتیوب",
        news: "اخبار",
        newspaper: "روزنامه"
    }
    return SM[social_media]
}


//


export const getPageNumber = (url) => {
    if (!url) return 0
    let urlObj = new URL(url)
    let params = new URLSearchParams(urlObj.search);
    return params.get("page") ? parseInt(params.get("page")) : 0
};


export const Pagination = (props) => {
    return (
        <div className="">
        <div className="row my-4  ">
            <div className="col-12 col-md-8">
                <div className="font-gray-color text-center text-md-right ">
                    <span>تعداد ردیف در هر صفحه : </span>
                    {
                        [
                            10, 25, 50, 100
                        ].map((t, i) => <button
                            className="btn main-btn-round-reverse mt-1 bg-white font-weight-bold ml-1 text-dark"

                            onClick={() => props.changePage(1, t)} disabled={props.pageSize == t}>{t}
                        </button>)
                    }


                </div>
            </div>
            <div className="col-12 col-md-4 text-center text-md-left mt-3 mt-md-0">
                <div className="d-inline-block" style={{width: "200px"}}>
                    <div className="d-flex justify-content-around border carousel-control w-100 p-1" >
                        <button className="btn main-btn-round-reverse  bg-white font-weight-bold"
                                onClick={() => props.changePage(1,props.pageSize)} disabled={props.currentPage === 1}><FaAngleDoubleRight/></button>
                        <button className="btn main-btn-round-reverse  bg-white font-weight-bold font-size-sm"
                                onClick={() => props.changePage(props.prevPage,props.pageSize)}
                                disabled={props.prevPage === 0 && props.currentPage !== 2}><FaChevronRight/></button>
                        <span className="mt-1"> صفحه {props.currentPage} </span>
                        <button className="btn main-btn-round-reverse  bg-white font-weight-bold font-size-sm"
                                onClick={() => props.changePage(props.nextPage,props.pageSize)}
                                disabled={!Boolean(props.nextPage)}><FaChevronLeft/></button>
                        <button className="btn main-btn-round-reverse  bg-white font-weight-bold"
                                onClick={() => props.changePage(props.lastPage,props.pageSize)}
                                disabled={(!Boolean(props.lastPage)) || (props.lastPage === props.currentPage)}><FaAngleDoubleLeft/></button>
                    </div>
                </div>

            </div>

        </div>
        </div>
    )
};


export const mediaTypeLinkConvert = (media) => {
    switch (media) {
        case "twitter":
            return <FaTwitter size="2em" color="#1da1f2"/>
        case "tw":
            return <FaTwitter size="1em"/>
        case "instagram":
            return <FaInstagram size="2em" color="#f56040"/>
        case "ig":
            return <FaInstagram size="1em"/>
        case "telegram":
            return <FaTelegram size="2em" color="#0088cc"/>
        case "tg":
            return <FaTelegram size="1em"/>
        default:
            return "لینک اصلی"
    }
}


export const mediaTypeDetailsConverter = (media, details) => {
    switch (media) {
        case "twitter":
            return [<Icon
                key={0}
                detail={details.likes}
                logo={ReactHeartLogo}/>,
                <Icon
                    key={1}
                    detail={details.quotes}
                    misc={{fontSize: "1.8em", fill: "#1da1f2"}}
                    logo={FaQuoteRight}/>,
                <Icon
                    key={2}
                    detail={details.replies}
                    misc={{fontSize: "1.8em", fill: "#1da1f2"}}
                    logo={FaReply}/>,
                <Icon
                    key={3}
                    detail={details.retweets}
                    misc={{fontSize: "1.8em", fill: "#1da1f2"}}
                    logo={FaRetweet}/>,
            ]
        case "instagram":
            return [<Icon
                key={0}
                detail={details.likes}
                logo={ReactHeartLogo}/>,
                <Icon
                    key={1}
                    detail={details.comments}
                    misc={{fontSize: "1.8em", fill: "#f56040"}}
                    logo={FaComment}/>,
                <Icon
                    key={2}
                    detail={details.views}
                    misc={{fontSize: "1.8em", fill: "#f56040"}}
                    logo={ReactEyeLogo}/>,
            ]
        case "telegram":
            return [<Icon
                key={0}
                detail={details.views}
                logo={ReactEyeLogo}/>,
                // <Icon
                //     key={1}
                //     detail={details.likes}
                //     logo={ReactHeartLogo} />,
            ]
        default:
            return "-"
    }
}


export const thumbnailUrl = (igtv, mediaList) => {
    if (igtv) return <img src={IgtvPic} className="card-img-top" alt="asr"/>
    if (Boolean(mediaList.length)) {
        return mediaList[0].exact_url?.includes("/video/") ? (
            <img src={PlayPic} className="card-img-top" alt="asr"/>
        ) : (
            <img src={mediaList[0].exact_url} className="card-img-top" alt="asr"/>
        )
    }
    return <img src={CardPic} className="card-img-top" alt="asr"/>
}


export const formatDate = (date) => date ? date.split(" ")[1] + " " + date.split(" ")[0] : date;


export const Loading = () => (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight: "150px"}}>
        <Spin tip="در حال دریافت ..." size="large"/>
    </div>
)


export const sortConvert = (sortParam) => {
    switch (sortParam) {
        case "-like":
            return " بیشترین لایک "
        case "like":
            return " کمترین لایک "
        case "-date":
            return " جدیدترین "
        case "date":
            return " قدیمی ترین "
        case "-comment":
            return " بیشترین کامنت "
        case "comment":
            return " کمترین کامنت "
        case "-retweet":
            return " بیشترین ریتوییت "
        case "retweet":
            return " کمترین ریتوییت "
        default:
            return " دسته بندی "
    }
}


export const QueryParamToBadge = (props) => {
    let flag = true;
    if (props["value"] === "") flag = false;
    let name = '';
    if (flag) {
        switch (props.item) {
            case "is_tagged":
                name = props.value ? "تگ خورده" : "تگ نخورده";
                break;
            case "o":
                name = ` مرتب سازی بر اساس ${props.value.map(item => sortConvert(item))}`
                break;
            case "tagger":
                name = `تگ زننده ${props.value}`;
                break;
            case "tag":
                name = `تگ ${props.value}`;
                break;
            case "property":
                name = `ویژگی ${props.value}`;
                break;
            case "subject":
                name = `سوژه ${props.value}`;
                break;
            case "type":
                name = `شبکه اجتماعی ${convertSM(props.value)}`;
                break;
            case "url":
                name = `آدرس ${props.value}`;
                break;
            case "date_after":
                name = `از ${props.value.replace(/-/g, "/")}`;
                break;
            case "trend":
                name = "چالشی ترین ها";
                break;
            case "star":
                name = "منتخب ترین ها";
                break;
            case "date_before":
                name = `تا ${props.value.replace(/-/g, "/")}`;
                break;
            default:
                break;
        }
    }
    return flag ? (
        <span className="badge badge-pill font-gray-color px-3 py-2 ml-2 mt-1" style={{backgroundColor: "#E5F5FC"}}>
                    {name}
            <span className="mr-2 font-size-m pointer hover-red"
                  onClick={e => props.deleteParam(props.item)}>&times;</span>
                </span>
    ) : []
}

export const SMPageToBadge = (props) => {
    let borderColor = undefined;
    switch (props.type) {
        case "tg":
            borderColor = "#006596";
            break;
        case "tw":
            borderColor = "#1da1f2";
            break;
        case "ig":
            borderColor = "#f56040";
            break;
        default:
            borderColor = "black"
            break;
    }
    return (
        <span className={`badge badge-pill text-white px-3 py-2 ml-2 my-1 ${props.className}`} onClick={props?.onClick}
              style={{backgroundColor: borderColor}}>
            {props.username}
            <span className="mr-2 font-size-m text-white">{mediaTypeLinkConvert(props.type)}</span>
        </span>
    )
}


export const Sentiment = React.forwardRef((props, ref) => {

    const config = [{index: 0, color: "default", title: "خنثی"}, {index: 1, color: "green", title: "مثبت"}, {
        index: 2,
        color: "red",
        title: "منفی"
    }];

    const [activeTag, setActiveTag] = React.useState(props.sentiment);

    let instance = config.filter(item => item.title === activeTag)[0];

    const cycle = (index) => {
        let temp = config[++index % config.length].title;
        setActiveTag(state => temp);
        props.setSentimentStatus(state => temp);
    };

    return <Tag ref={ref} onClick={() => props.editable ? cycle(instance.index) : null}
                className="float-left pointer ml-2" color={instance.color}>{instance.title}</Tag>
})
