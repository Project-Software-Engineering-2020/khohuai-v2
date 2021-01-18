import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {

    auth,

} from "../../firebase/firebase";
import { useDispatch, useSelector } from 'react-redux';

const Forgotpassword = () => {
    const stetus = useSelector(state => state.auth)
    const [redirect, setredirect] = useState(stetus.status)
    const [loading, setloading] = useState(false)
    const [email, setemail] = useState("")
    useEffect(() => {
        setloading(false);
        setTimeout(() => {
            setloading(true)
        }, 500)
    }, [redirect])
    const sendpasswordreset = (e) => {
        auth.sendPasswordResetEmail(email).then((res) => {
            console.log("Send Success")
        })
            .catch(function (error) {
                console.log("Cannot Send")
            });
    }
    return (
        <div className="mt-5 p-2">
            {redirect ? (
                <Redirect to="/"></Redirect>

            ) : (
                    <div>
                        {loading ? (
                            <div class="container col-xl-4 col-md-6 col-sm-12 update-password-page mt-auto p-md-5 p-4">
                                <div className="head-change-password">กู้คืนรหัสผ่าน</div>
                                <div className="mt-3">
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="กรอกอีเมลของคุณ"
                                        onChange={(e) => {
                                            setemail(e.target.value);
                                        }}
                                    >
                                    </input>
                                </div>

                                <button type="button" class="button-change-password mt-3" onClick={sendpasswordreset}>ยืนยัน</button>

                            </div>
                        ) : (
                                <div className="loader">Loading...</div>
                            )}
                    </div>

                )}
        </div>


    )
}
export default Forgotpassword;