import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { storage, firestore } from '../../firebase/firebase'
import { updateUserProfile, getProfile } from "../../redux/action/profileAction"
import { api } from '../../environment';
import {uiddecoded} from '../../util/decodeUID'

const Profile = (props) => {

    let completeProfile = props.match.params.complete;

    const history = useHistory();

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token);
    const UserProfile = useSelector(state => state.profile);

    const uid = auth.uid;

    const [newProfile, setNewProfile] = useState();
    const [updateImage, setUpdateImage] = useState(null);
    const [imagePreview, setImagePreview] = useState();
    const [editState, setEditState] = useState(false);

    const checkComplete = async () => {
        // console.log(completeProfile);
        if(completeProfile == "false") {
            await setEditState(true)
        }
    } 

    useEffect(async () => {
       
        await dispatch(getProfile(uiddecoded(token)));
        // await checkComplete();
        
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
        if (key == "book_name") {
            setNewProfile({
                ...newProfile,
                book_name: newData
            })
        }
        if (key == "book_number") {
            setNewProfile({
                ...newProfile,
                book_number: newData
            })
        }
        if (key == "book_provider") {
            setNewProfile({
                ...newProfile,
                book_provider: newData
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
        const uid = uiddecoded(token);
        // const uid = status.uid;
        if (updateImage) {
          
            const uploadTask = storage.ref("images/" + uid).put(updateImage);
            await uploadTask.on(
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
                        .then(async(url) => {
                     
                            await firestore.collection("users").doc(uid).update({
                                firstname: newProfile.firstname,
                                lastname: newProfile.lastname,
                                phone: newProfile.phone,
                                book_name: newProfile.book_name,
                                book_number: newProfile.book_number,
                                book_provider: newProfile.book_provider,
                                photoURL: url,
                            });
                            setEditState(!editState);
                            
                            if(completeProfile === "false") {
                                history.push("/cart")
                            }
                        });
                }
            );
        }
        else {

            await firestore.collection("users").doc(uid).update({
                firstname: newProfile.firstname,
                lastname: newProfile.lastname,
                phone: newProfile.phone,
                book_name: newProfile.book_name,
                book_number: newProfile.book_number,
                book_provider: newProfile.book_provider,

            });
        
            await setEditState(!editState)
            if(completeProfile === "false") {
                history.push("/cart")
            }
                
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
                                        <label htmlFor="text"> ชื่อบัญชี : </label>
                                        <input type="text" className="form-control" value={newProfile.book_name} onChange={(event) => { ChangeDataProfile("book_name", event.target.value) }}></input>
                                    </div>
                                    <div className="profile-data">
                                        <label htmlFor="text"> เลขที่บัญชี : </label>
                                        <input type="text" className="form-control" value={newProfile.book_number} onChange={(event) => { ChangeDataProfile("book_number", event.target.value) }}></input>
                                    </div>
                                    <div className="profile-data">
                                        <label htmlFor="text"> ธนาคาร : </label>
                                        <select className="form-control" value={newProfile.book_provider} onChange={(event) => { ChangeDataProfile("book_provider", event.target.value) }}>
                                            <option selected></option>
                                            <option value="ไทยพาณิชย์">ไทยพาณิชย์</option>
                                            <option value="กสิกรไทย">กสิกร</option>
                                            <option value="กรุงไทย">กรุงไทย</option>
                                            <option value="กรุงเทพ">กรุงเทพ</option>
                                        </select>
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

            {/* <SweetAlert
                show={alert.open}
                title={alert.title}
                text={alert.text}
                onConfirm={e => dispatch(closeAlert())}
                type={alert.types}
                timeout={1800}
                showConfirm={alert.showCloseButton}
                hideOverlay={alert.overlay}
            >
            </SweetAlert> */}
        </div>

    )

}

export default Profile