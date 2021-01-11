import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Profile.css';
import { useSelector } from 'react-redux';

const Profile = () => {

    const profileData = useSelector(state => state.auth);

    const [Profile, setProfile] = useState()

    const [loading, setloading] = useState(false);

    useEffect(() => {

        const id = profileData.uid;
        const fetchUserProfile = async () => {
            await Axios.get("http://localhost:3001/api/profile/" + id).then((profile) => {
                setProfile(profile.data);
               
            })
            await setloading(true);
        }
       
        fetchUserProfile();
        
    }, [])

    return (
        <div className="bg-profile">
            { loading ?
               
                <div className="container">
                    <h2>ข้อมูลส่วนตัว</h2>
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
                                <fieldset> อีเมลล์ : {Profile.email} </fieldset>
                            </div>

                            {/* <div className="profile-data">
                                <fieldset> เลขที่บัญชี : {User.bookBankNo} </fieldset>
                            </div>

                            <div className="profile-data">
                                <fieldset> ธนาคาร : {Users.bankName} </fieldset>
                            </div> */}

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