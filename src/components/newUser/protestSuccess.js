import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from "../../redux/newUser";
import { FaCheckCircle } from "react-icons/fa"


function ProtestSuccess(props) {

    const dispatch = useDispatch()
    const { protestTrackCode } = useSelector( state => state.newUser)

    useEffect(() => {
        return () => {
            dispatch(resetUser())
        }
    }, [])

    return (
        <div className="content text-center p-5">
            <FaCheckCircle size="2em" className="text-oldSuccess" />
            {
                protestTrackCode ? (
                    <>
                        <p className="mt-4">داوطلب محترم شکایت شما با موفقیت ثبت شد لطفا برای بررسی های بعدی کد پیگیری خود را ذخیره کنید</p>
                        <div>
                            <span>کد پیگیری : {protestTrackCode}</span>
                        </div>
                    </>
                ) : (
                    <p className="mt-4">داوطلب محترم گزارش تخلف شما با موفقیت ثبت شد </p>
                )
            }

        </div>
    )
}

export default ProtestSuccess
