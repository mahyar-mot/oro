import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink as NavLinkRouter, useParams, useHistory} from "react-router-dom";
import { Skeleton, Divider, Table, Button, Popconfirm, Input } from "antd";
import {BsArrowLeft} from 'react-icons/bs';
import { getUserComplaint, resetComplaint } from "../../redux/complaints/userComplaintRetrieve";
import { getComplaintAttachments, resetComplaintAttachments } from "../../redux/complaints/attachments";
import { ReactComponent as ProfileLogo } from "../../assets/icons/profile picture.svg";
import { ReactComponent as EditPic } from "../../assets/icons/edit_black_24dp.svg"


function SingleComplaint(props) {

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const { complaint, isLoading, error } = useSelector( state => state.complaint.retrieve )
    const { attachments , isLoading: attachemtsLoading } = useSelector( state => state.complaint.attachments)

    React.useEffect( () => {
        dispatch(getUserComplaint(id))
        dispatch(getComplaintAttachments(id))
        return () => {
            dispatch(resetComplaint());
            dispatch(resetComplaintAttachments());
        }
    }, [dispatch])

    return (
        <div className="content p-5 mb-5">
            {
                !isLoading && (
                    <>
                        <div className="d-flex justify-content-between">
                            <div>
                                <span className="square-indicator">اعتراض {complaint.candidateName}</span>
                                <span className="text-muted font-size-sm">{complaint.createDate}</span>
                            </div>
                            <div className="ml-2">
                                <NavLinkRouter className="text-decoration-none" to="/complaints">
                                    <span>بازگشت به لیست اعتراضات <BsArrowLeft /></span>
                                </NavLinkRouter> 
                            </div>
                        </div>
                        <div className="my-3 text-muted font-size-sm">
                            <NavLinkRouter className="text-decoration-none" to="/complaints">
                                    <span> <ProfileLogo />  مشاهده مشخصات کاربر </span>
                                </NavLinkRouter> 
                        </div>

                        <div className="p-2 mt-3">
                            <span>متن اعتراض</span>
                                <p className="text-wrapper p-4">
                                    {complaint.description}
                                </p>
                        </div>
                        <div>
                            <span>فایل ضمیمه</span>
                        </div>
                        <div className="d-flex justify-content-end mt-5">
                            <Button type="primary" size="large">  <EditPic className="ml-2" />ویرایش اعتراض</Button>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default SingleComplaint
