import  React  from "react"
import { Card, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Slider from "./slider";


const CardProps = {
    className: "text-royal pointer",
    style: { fontSize: '1.75em' },
}

const CommentCard = (props) => (
    <Card
        // hoverable
        className="text-right comment-card"
        // style={{ width: "380px" }}
        title={
            <div>
                <span className="divider"></span>
                <h5 className="pt-2">انگشتر اوال و چند نگین کوچک اوال سبز</h5>
            </div>
        }
        // extra={<HeartOutlined {...CardProps} /> }
        headStyle={{border: "none"}}
        // cover={
        //     <img alt="example" src={RingPic} />
        // }
        // actions={[
        //     <div className="text-left position-relative ml-4">
        //         29345000
        //         <span className="position-absolute pt-3 pl-2" style={{transform: "rotate(-90deg)"}}>تومان</span>
        //     </div>
        // ]}
    >
        <Card.Meta 
            // title="انگشتر اوال و چند نگین کوچک اوال سبز" 
            avatar={<Avatar size="large" icon={<UserOutlined />} />}
            description={
                <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                </p>
            } />
    </Card>
)

export default () => {

    const sliderCommentPrevRef = React.useRef(null);
    const sliderCommentNextRef = React.useRef(null);

    return (
        <>
            <div>
                <div className="pr-md-5 pr-0 mr-5 text-right">
                    <span className="divider"></span>
                    <h4 className="pt-2">تجربه‌های شما</h4>
                    تجربه‌های ناب و درخشش‌های وصف ناشدنی شما عزیزان
                </div>
                <div className="my-5">
                    <Slider
                        sliderPrevRef={sliderCommentPrevRef}
                        sliderNextRef={sliderCommentNextRef}
                        slides={[<CommentCard />, <CommentCard />, <CommentCard />, <CommentCard />]}
                    />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <div ref={sliderCommentNextRef} ><BsArrowRight className="pointer ml-2 text-gray" size="3rem" /></div>
                    <div ref={sliderCommentPrevRef} ><BsArrowLeft className="pointer mr-2 text-gray" size="3rem" /></div>
                </div>
            </div>
        </>
    );
};
