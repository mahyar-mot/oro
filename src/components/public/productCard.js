import  React  from "react"
import { Card } from "antd";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { BiDroplet } from "react-icons/bi";
import RingPic from "../../assets/icon/11.png";

const CardProps = {
    className: "text-royal",
    style: { fontSize: '1.75em' },
}


export default () => {

  return (
    <Card
        // hoverable
        style={{ width: 320 }}
        extra={<HeartOutlined {...CardProps} /> }
        headStyle={{position: "absolute", border: "none", left: 0}}
        cover={
            <img alt="example" src={RingPic} />
        }
        actions={[
            <div className="text-left position-relative ml-4">
                29345000
                <span className="position-absolute pt-2" style={{transform: "rotate(-90deg)"}}>تومان</span>
            </div>
        ]}
    >
        <Card.Meta 
            title="انگشتر اوال و چند نگین کوچک اوال سبز" 
            description={
                <div>
                    <BiDroplet /> رزگلد . زرد . سفید 
                </div>
            } />
    </Card>
  );
};
