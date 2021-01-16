import React, { useState } from 'react';
import { storage, firestore } from '../../firebase/firebase'



const UploadLottery = () => {


    const [image, setImage] = useState(null);
    const [number, setNumber] = useState();
    const [s, setS] = useState();
    const [t, setT] = useState();
    const [r, setR] = useState();

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
        console.log(e.target.files[0].name);
        console.log(image);
    };

    const handleUpload = (e) => {

        const imageName = image.name;
        const uploadTask = storage.ref("lotterys/" + imageName).put(image);
        uploadTask.on(
            "state_change",
            (snapshot) => { },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("lotterys")
                    .child(imageName)
                    .getDownloadURL()
                    .then((url) => {
                        // setImgUrl(url);
                        // console.log(url);
                        firestore.collection("LotteriesAvailable").doc().set({
                            number: number,
                            s: s,
                            t: t,
                            r: r,
                            photoURL: url,
                        });
                    });
                alert("upload complete")
            }
            
        )
    };

    return (
        <div>
            <div>
                <label htmlFor="">เลขสลาก</label>
                <input type="text" onChange={(e) => { setNumber(e.target.value) }} required></input>
            </div>
            <div>
                <label htmlFor="">งวดที่</label>
                <input type="text" onChange={(e) => { setS(e.target.value) }} required></input>
            </div>
            <div>
                <label htmlFor="">ชุดที่</label>
                <input type="text" onChange={(e) => { setT(e.target.value) }} required></input>

            </div>
            <div>
                <label htmlFor="">Ref.</label>
                <input type="text" onChange={(e) => { setR(e.target.value) }} required></input>

            </div>


            <div>
                <label htmlFor="">รูปสลาก</label>
                <input type="file" onChange={(e) => { handleChange(e) }} required></input>
            </div>

            


            <button type="button" onClick={(e) => handleUpload(e)}>Upload</button>
        </div>
    )
}

export default UploadLottery;