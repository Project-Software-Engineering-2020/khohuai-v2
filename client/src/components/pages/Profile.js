import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
import './Profile.css';
import { useDispatch } from 'react-redux';

const Profile = () => {

    const dispatch = useDispatch();

    const [Profile, setProfile] = useState()

    const [loading, setloading] = useState(false);

    const fetchData = async () => {
        // const demoData = {
        //     id: 61090500444,
        //     firstname: "Boss",
        //     lastname: "Zaaa",
        //     photoURL: "https://scontent.fbkk5-7.fna.fbcdn.net/v/t31.0-8/966951_524915017575552_106824054_o.jpg?_nc_cat=108&ccb=2&_nc_sid=85a577&_nc_eui2=AeFFSb20QuKJw_3rSQCzle35lpkMdvSOJPyWmQx29I4k_C-gQIIz9ZFeq_H3AiOx7n4HJOLxygWY3U8WwWq02M7t&_nc_ohc=Gt7Cc_4_qHwAX-Vsx9R&_nc_ht=scontent.fbkk5-7.fna&oh=116e4714280e7dd3aa2f01f9b610793d&oe=601A6811",
        //     bookBankNo: 4084463559,
        //     bankName: "ธนาคารไทยพาณิชย์",
        //     IDcard: 124893971233,
        //     phone: "0837224629"
        // }

        const profileData = await dispatch({ type: 'GET_STATUS_LOGIN' })
        setProfile(profileData);

        // setloading(true);
        console.log(Profile);
        
    }

    useEffect(() => {
        fetchData();
        
        // setloading(true);
        // console.log(dispatch({type:'GET_STATUS_LOGIN'}));
    }, [])

    return (
        <div className="bg-profile">
            { loading ?
                <div className="container">
                    <div className="my-profile">
                        <section>
                            <figure className="img-profile">
                                <img src={Profile.photoURL} alt="profile"></img>
                            </figure>
                        </section>

                        <section className="information-profile">

                            <div className="profile-data">
                                <fieldset> ชื่อ : {Profile.firstname} </fieldset>
                            </div>

                            <div className="profile-data">
                                <fieldset> นามสกุล : {Profile.lastname} </fieldset>
                            </div>

                            <div className="profile-data">
                                <fieldset> เบอร์โทร : {Profile.phone} </fieldset>
                            </div>

                            <div className="profile-data">
                                <fieldset> เลขที่บัญชี : {Profile.bookBankNo} </fieldset>
                            </div>

                            <div className="profile-data">
                                <fieldset> ธนาคาร : {Profile.bankName} </fieldset>
                            </div>

                            <div>
                                <button type="button" className="btn-edit-profile"> แก้ไขข้อมูล </button>
                                <button type="button" className="btn-change-password"> เปลี่ยนรหัสผ่าน </button>
                            </div>
                        </section>
                    </div>
                </div>
                :
                <div className="loader">Loading...</div>
            }
        </div>
    )

}

export default Profile