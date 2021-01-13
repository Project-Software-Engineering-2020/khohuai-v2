import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Profile.css';
import { useSelector } from 'react-redux';

const Profile = () => {

    const profileData = useSelector(state => state.auth);

    const [Profile, setProfile] = useState();
    const [newProfile, setNewProfile] = useState()

    const [loading, setloading] = useState(false);

    const [editState, setEditState] = useState(true);

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


    const OnClickeditProfile = () => {
        setNewProfile(Profile);
        setEditState(!editState);
    }

    const ChangeDataProfile = (key, newData) => {

        if (key == "firstname") {
            setNewProfile({
                ...newProfile,
                firstname: newData
            })
        }
        if (key == "lastname") {
            setNewProfile({
                ...newProfile,
                lastname: newData
            })
        }
        if (key == "email") {
            setNewProfile({
                ...newProfile,
                email: newData
            })
        }
        if (key == "phone") {
            setNewProfile({
                ...newProfile,
                phone: newData
            })
        }
    }
    const UpdateProfile = async () => {
        const id = profileData.uid;
        await Axios.put("http://localhost:3001/api/profile/" + id, {
            newProfile
        }).then((res) => {
            if(res) {
                setEditState(!editState);
                setProfile(newProfile);
            }
        })
    }
    const CancelUpdate = () => {
        setNewProfile(Profile);
        setEditState(!editState);
    }
    return (
        <div className="bg-profile">
            { loading ?

                <div className="container profile-page">
                    <h2>ข้อมูลส่วนตัว</h2>
                    <div className="my-profile">

                        <section>
                            <figure className="img-profile">
                                <img src={Profile.photoURL} alt="profile"></img>
                            </figure>
                            <div>
                                <label>เลือกรูปโปรไฟล์</label>
                                <input type="file" ></input>
                            </div>
                            
                        </section>
                        {editState ?
                            <section className="information-profile">

                                <div className="profile-data">
                                    <label htmlFor="text"> ชื่อ :</label>
                                    <span>{Profile.firstname}</span>
                                </div>

                                <div className="profile-data">
                                    <label> นามสกุล : </label>
                                    <span>{Profile.lastname}</span>
                                </div>

                                <div className="profile-data">
                                    <label> อีเมลล์ : </label>
                                    <span>{Profile.email}</span>
                                </div>

                                <div className="profile-data">
                                    <label> เบอร์โทร : </label>
                                    <span>{Profile.phone}</span>
                                </div>

                                {/* <div className="profile-data">
                                <fieldset> เลขที่บัญชี : {User.bookBankNo} </fieldset>
                            </div>

                            <div className="profile-data">
                                <fieldset> ธนาคาร : {Users.bankName} </fieldset>
                            </div> */}
                                <div className="profile-data">
                                    <div>
                                    </div>
                                    <div className="group-btn-profile">
                                        <button type="button" className="btn-edit-profile" onClick={OnClickeditProfile}> แก้ไขข้อมูล </button>
                                        <button type="button" className="btn-change-password"> เปลี่ยนรหัสผ่าน </button>
                                    </div>
                                </div>

                            </section>
                            :
                            //edit profile
                            <section className="information-profile">
                                <div className="profile-data">
                                    <label htmlFor="text"> ชื่อ : </label>
                                    <input type="text" className="form-control" value={newProfile.firstname} onChange={(event) => { ChangeDataProfile("firstname", event.target.value) }}></input>
                                </div>

                                <div className="profile-data">
                                    <label htmlFor="text"> นามสกุล : </label>
                                    <input type="text" className="form-control" value={newProfile.lastname} onChange={(event) => { ChangeDataProfile("lastname", event.target.value) }}></input>
                                </div>

                                <div className="profile-data">
                                    <label htmlFor="text"> อีเมลล์ : </label>
                                    <input type="text" className="form-control" value={newProfile.email} onChange={(event) => { ChangeDataProfile("email", event.target.value) }}></input>
                                </div>
                                <div className="profile-data">
                                    <label htmlFor="text"> เบอร์โทร : </label>
                                    <input type="text" className="form-control" value={newProfile.phone} onChange={(event) => { ChangeDataProfile("phone", event.target.value) }}></input>
                                </div>
                                <div className="profile-data">
                                    <div></div>
                                    <div className="group-btn-profile">
                                        <button type="button" className="btn-edit-profile" onClick={UpdateProfile}>บันทึก</button>
                                        <button type="button" className="btn-cancel-updateprofile" onClick={CancelUpdate}> ยกเลิก </button>
                                    </div>
                                </div>


                            </section>
                        }
                    </div>
                </div>
                :
                <div className="loader">Loading...</div>
            }
        </div>
    )

}

export default Profile