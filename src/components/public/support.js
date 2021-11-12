import React from 'react';
import SupportIcon from "../../assets/icons/suppourt.svg";
import { SUPPORT_TEL, SUPPORT_TEL_VIEW } from "../../utils/constants";


const Support = () => {
    return (
        <div className="support ">
            <a href={`tel:${SUPPORT_TEL}`} className="text-muted  text-decoration-none ">
                <span className="d-none d-lg-inline-block"> {SUPPORT_TEL_VIEW} </span>
                <img src={SupportIcon} alt="support" className="img-fluid mr-1"
                     style={{maxWidth: "23px"}}/>
            </a>

        </div>
    );
};

export default Support;