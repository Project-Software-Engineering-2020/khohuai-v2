import React, { useState, useEffect } from 'react';
import {Redirect} from  'react-router-dom';
import Axios from 'axios';
import {auth} from '../../firebase/firebase'
import './Profile.css';
import { useDispatch , useSelector } from 'react-redux';
import { storage, firestore } from '../../firebase/firebase'

const Profile = () => {

    const dispatch = useDispatch();
    const profileData = useSelector(state => state.auth);

    const [Profile, setProfile] = useState();
    const [newProfile, setNewProfile] = useState();
    const [updateImage, setUpdateImage] = useState(null);
    const [imagePreview, setImagePreview] = useState();
    const [loading, setloading] = useState(false);

    const [editState, setEditState] = useState(true);

    const stetus = useSelector(state => state.auth)
    const [redirect, setredirect] = useState(true)
    const stotus = stetus.status;

    useEffect(() => {
        setredirect(stotus)
        const id = profileData.uid;
        const fetchUserProfile = async () => {
            await Axios.get("http://localhost:3001/api/profile/" + id).then((profile) => {
                setProfile(profile.data);
            })
            await setloading(true);
        }
        fetchUserProfile();

    }, [stotus]);


    const OnClickeditProfile = () => {
        setNewProfile(Profile);
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
        const uid = profileData.uid;
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
            
        }
        else {
            console.log("No image")
            await Axios.put("http://localhost:3001/api/profile/" + uid, {
                newProfile
            }).then((res) => {
                if (res) {
                    setEditState(!editState);
                    setProfile(newProfile);
                }
            })
        }


    }
    const CancelUpdate = () => {
        setNewProfile(Profile);
        setEditState(!editState);
    }

    const signouthandle = () => {
        auth.signOut().then(() => {
            console.log("Logout OK");
            dispatch({ type: "SET_LOGOUT" });
            // return <Redirect to={{ pathname: "/login" }} />
        })
            .catch((err) => {
                console.log("Logout Not work" + err)
            })
    }
    return (
        <div>
            {redirect ? (
        <div className="bg-profile">
        { loading ?

            <div className="container profile-page">
                <h2>ข้อมูลส่วนตัว</h2>
                {editState ?
                    <div className="my-profile">
                        <section>
                            <figure className="img-profile">
                                <img src={imagePreview || Profile.photoURL} alt="profile"></img>
                            </figure>

                        </section>
                        <section className="information-profile">
                            <div className="profile-data">
                                <label htmlFor="text"> ชื่อในแอป :</label>
                                <span>{Profile.displayName}</span>
                            </div>

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
                            <div className="profile-data">
                                <div>
                                </div>
                                <div className="group-btn-profile">
                                    <button type="button" className="btn-edit-profile" onClick={OnClickeditProfile}> แก้ไขข้อมูล </button>
                                    <button type="button" className="btn-change-password" onClick={signouthandle}> Logout </button>
                                </div>
                            </div>

                        </section>
                    </div>
                    :
                    <div className="my-profile">

                        <section>
                            <figure className="img-profile">
                                <img src={imagePreview || Profile.photoURL} alt="profile"></img>

                            </figure>
                            <div className="upload-img-profile">
                                <p htmlFor="upploadimg" >เลือกรูปภาพ</p>
                                <input type="file"  onChange={handleChangeImage} />
                            </div>

                        </section>
                        <section className="information-profile">
                            <div className="profile-data">
                                <label htmlFor="text"> ชื่อในแอป : </label>                                                                              
                                <input type="text" className="form-control" value={newProfile.displayName} onChange={(event) => { ChangeDataProfile("displayName", event.target.value) }}></input>
                            </div>

                            <div className="profile-data">
                                <label htmlFor="text"> ชื่อ : </label>
                                <input type="text" className="form-control" value={newProfile.firstname} onChange={(event) => { ChangeDataProfile("firstname", event.target.value) }}></input>
                            </div>

                            <div className="profile-data">
                                <label htmlFor="text"> นามสกุล : </label>
                                <input type="text" className="form-control" value={newProfile.lastname} onChange={(event) => { ChangeDataProfile("lastname", event.target.value) }}></input>
                            </div>
                            <div className="profile-data">
                                <label> อีเมลล์ : </label>
                                <span>{Profile.email}</span>
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
                }

            </div>
            :
            <div className="loader">Loading...</div>
        }
    </div>
            ) : (
                <Redirect to='/login'></Redirect>
            )}
        </div>

    )

}

export default Profile