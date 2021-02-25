import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { storage, firestore } from '../../firebase/firebase'
import { updateUserProfile, getProfile } from "../../redux/action/profileAction"

const Profile = () => {

    const dispatch = useDispatch();
    //status user login
    const auth = useSelector(state => state.auth);
    const UserProfile = useSelector(state => state.profile)
    // const status = auth.status;
    const uid = auth.uid;

    const [Profile, setProfile] = useState();
    const [newProfile, setNewProfile] = useState();
    const [updateImage, setUpdateImage] = useState(null);
    const [imagePreview, setImagePreview] = useState();
    const [editState, setEditState] = useState(false);

    useEffect(async () => {
        await dispatch(getProfile(uid));
        // await setProfile(UserProfile.data);
    }, []);


    const OnClickeditProfile = () => {
        setNewProfile(UserProfile.data);
        setEditState(!editState);
    }

    const CancelUpdate = () => {
        // setNewProfile(Profile);
        setEditState(!editState);
    }

    const ChangeDataProfile = (key, newData) => {

        if (key == "displayName") {
            setNewProfile({
                ...newProfile,
                displayName: newData
            })
        }
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
        if (key == "phone") {
            setNewProfile({
                ...newProfile,
                phone: newData
            })
        }
    }
    const handleChangeImage = (e) => {
        let file = e.target.files[0];
        if (file) {
            setUpdateImage(file);
            let reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    };
    const UpdateProfile = async () => {
        // const uid = status.uid;
        if (updateImage) {
            console.log("Update image")
            const uploadTask = storage.ref("images/" + uid).put(updateImage);
            uploadTask.on(
                "state_change",
                (snapshot) => { },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(uid)
                        .getDownloadURL()
                        .then((url) => {
                            // setImgUrl(url);
                            firestore.collection("users").doc(uid).update({
                                firstname: newProfile.firstname,
                                lastname: newProfile.lastname,
                                phone: newProfile.phone,
                                photoURL: url,
                            });
                            setEditState(!editState);
                        });
                }
            );


            // await dispatch({
            //     type: 'UPDATE_PROFILE',
            //     uid: pro.uid,
            //     displayName: pro.displayName,
            //     photoURL: pro.photoURL,
            //     email: pro.email,
            //     role: "user",
            //     status: true
            // });
        }
        else {
            dispatch(updateUserProfile(newProfile))
                .then(() => {
                    setEditState(!editState)
                    setProfile(newProfile)
                }
                )
            // console.log("No image")
            // await Axios.put("http://localhost:3001/api/profile",
            //     {
            //         uid,
            //         newProfile,
            //         token
            //     }).then((res) => {
            //         if (res.status === 200) {
            //             setEditState(!editState);
            //             setProfile(newProfile);
            //         }
            //     })
            // const pro = await fetchUserProfile();
            // await dispatch({
            //     type: 'UPDATE_PROFILE',
            //     uid: pro.uid,
            //     displayName: pro.displayName,
            //     photoURL: pro.photoURL,
            //     email: pro.email,
            //     role: "user",
            //     status: true
            // });
        }
    }
    


    return (
        <div>
            <div className="bg-profile">
                {UserProfile.loading ?
                    <div className="loader">Loading...</div>
                    :
                    <div className="container profile-page">

                        <h3>ข้อมูลส่วนตัว</h3>
                        {editState ?

                            //before edit
                            <div className="my-profile">

                                <section>
                                    <figure className="img-profile">
                                        <img src={imagePreview || UserProfile.data.photoURL} alt="profile"></img>

                                    </figure>
                                    <div className="upload-img-profile">
                                        <p htmlFor="upploadimg" >เลือกรูปภาพ</p>
                                        <input type="file" onChange={handleChangeImage} />
                                    </div>

                                </section>
                                <section className="information-profile">
                                    <div className="profile-data">
                                        <label htmlFor="text"> ชื่อผู้ใช้ : </label>
                                        <input type="text" className="form-control" value={newProfile.displayName} onChange={(event) => { ChangeDataProfile("displayName", event.target.value) }}></input>
                                    </div>

                                    <div className="profile-data">
                                        <label htmlFor="text"> ชื่อจริง : </label>
                                        <input type="text" className="form-control" value={newProfile.firstname} onChange={(event) => { ChangeDataProfile("firstname", event.target.value) }}></input>
                                    </div>

                                    <div className="profile-data">
                                        <label htmlFor="text"> นามสกุล : </label>
                                        <input type="text" className="form-control" value={newProfile.lastname} onChange={(event) => { ChangeDataProfile("lastname", event.target.value) }}></input>
                                    </div>
                                    <div className="profile-data">
                                        <label> อีเมล : </label>
                                        <span>{UserProfile.data.email}</span>
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
                            </div>

                            :
                            <div className="my-profile">
                                <section>
                                    <figure className="img-profile">
                                        <img src={imagePreview || UserProfile.data.photoURL} alt="profile"></img>
                                    </figure>

                                </section>
                                <section className="information-profile">
                                    <div className="profile-data">
                                        <label htmlFor="text"> ชื่อผู้ใช้ : </label>
                                        <span>{UserProfile.data.displayName}</span>
                                    </div>

                                    <div className="profile-data">
                                        <label htmlFor="text"> ชื่อจริง : </label>
                                        <span>{UserProfile.data.firstname}</span>
                                    </div>

                                    <div className="profile-data">
                                        <label> นามสกุล : </label>
                                        <span>{UserProfile.data.lastname}</span>
                                    </div>

                                    <div className="profile-data">
                                        <label> อีเมล : </label>
                                        <span>{UserProfile.data.email}</span>
                                    </div>

                                    <div className="profile-data">
                                        <label> เบอร์โทร : </label>
                                        <span>{UserProfile.data.phone}</span>
                                    </div>
                                    <div className="profile-data">
                                        <div>
                                        </div>
                                        <div className="group-btn-profile">
                                            <button type="button" className="btn-edit-profile" onClick={OnClickeditProfile}> แก้ไขข้อมูล </button>
                                            {auth.provider != "google" ?
                                                <button type="button" className="btn-change-password" ><a href="/updatepassword">เปลี่ยนรหัสผ่าน</a></button>
                                                :
                                                null
                                            }

                                        </div>
                                    </div>

                                </section>
                            </div>
                        }

                    </div>
                }
            </div>

        </div>

    )

}

export default Profile