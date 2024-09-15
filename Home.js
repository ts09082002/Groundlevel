import React, {useState} from 'react'
import "./home.css"
import {ref, uploadBytes} from 'firebase/storage';
import {imagedb} from '../../firebase';
import {v4} from 'uuid';
import {storage} from '../../firebase';

const Home = () => {
    const [image, setImage] = useState();
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        problem: ""
    });

    let name,
        value;

    const postUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUserData({
            ...userData,
            [name]: value
        });
    }

    const submitData = async (event) => {
        event.preventDefault();
        const imgref = ref(imagedb, 'files/${v4 ()}')
        uploadBytes(imgref, image)
        const {
            firstName,
            lastName,
            phone,
            address,
            email,
            problem
        } = userData;

        if (firstName && lastName && phone && address && problem && email) {
            const res = await fetch('https://login-register-web-default-rtdb.firebaseio.com/userDataRecords.json', {
                method: "POST",
                Headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        firstName,
                        lastName,
                        phone,
                        email,
                        address,
                        problem
                    }
                )
            });

            if (res) {
                alert("Appointment has been registered");
            } else {
                alert("Please Fill the DETAILS")
            }
        }
    }
    return (
        <div className='q' id='q'>
            <div className="containerform">
                <img src="/images/nulo.png" alt="" srcset=""/>
                <h3>FILL THIS FORM TO GET SERVICE AS PER YOUR COMFORTABILITY</h3>
                <form id='main'>
                    <input id="img" type='file'
                        onChange={
                            (e) => setImage(e.target.files[0], imagedb)
                        }/>
                    <div className="name">
                        <input type="text" placeholder='First Name' name='firstName'
                            value={
                                userData.firstName
                            }
                            onChange={postUserData}
                            id='frts'/>
                        <input type="text" placeholder='Last Name' name='lastName' id='frt'
                            value={
                                userData.lastName
                            }
                            onChange={postUserData}/>
                    </div>
                    <div className="number">
                        <input type="number" placeholder='Phone number' name='phone'
                            value={
                                userData.phone
                            }
                            onChange={postUserData}
                            id='frts'/>
                        <input type="text" placeholder='Email Address' name='email' id='frt'
                            value={
                                userData.email
                            }
                            onChange={postUserData}/>
                    </div>
                    <input type="text" placeholder='Home Address' name='address'
                        value={
                            userData.address
                        }
                        onChange={postUserData}
                        id='frts'/>
                    <input type="text" placeholder='Enter your Problem' name='problem'
                        value={
                            userData.problem
                        }
                        onChange={postUserData}
                        id='frts'/>

                    <button onClick={submitData}>Submit</button>

                </form>
            </div>
        </div>
    )
}

export default Home
