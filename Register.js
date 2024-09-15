import React, {useState} from 'react'
import "./register.css"
import Forminput from '../../component/Forminput'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from "../../firebase"
import Login from "../login/Login"
import {updateProfile, createUserWithEmailAndPassword} from "firebase/auth";


const Register = () => {
    const [inputvalue, setinputvalue] = useState({username: "", email: "", password: "", confirmpassword: ""});
    const navigate = useNavigate();
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errormessage: "Username should be around 3-16 words and should include any special character",
            // pattern: "^[A-Za-z0-9],{3,16}",
            required: true
        }, {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errormessage: "It should be a valid username",
            required: true
        }, {
            id: 3,
            name: "password",
            type: "text",
            placeholder: "Password",
            errormessage: "Password should be around 8-20 character and haveing at least 1 number, 1 special charater, 1 letter",
            pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A_Za-z0-9!@#$%^&*()_+]{8,20}$",
            required: true
        }, {
            id: 4,
            name: "confirmpassword",
            type: "text",
            placeholder: "confirmpassword",
            errormessage: "Password Don't Matched",
            pattern: inputvalue.password,
            required: true
        },
    ]

    const handleChange = (e) => {
        setinputvalue({
            ...inputvalue,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, inputvalue.email, inputvalue.password).then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {displayName: inputvalue.username});
                navigate("/home");
            });
        } catch (error) {
            // if (error.code === 'auth/email-already-in-use') { // Handle the case where the email is already in use.
            //     console.log('Email is already in use. Please log in or reset your password.');
            // } else { // Handle other authentication errors.
            //     console.error('Authentication error:', error.message);
            // }
        }

    }

    console.log(inputvalue);
    return (
        <>
            <div className='register'>
                <h2>Register</h2>
                <div className="regis">
                    <form> {
                        inputs.map((input) => (
                            <Forminput key={
                                    input.id
                                }
                                {...input}
                                value={
                                    inputvalue[input.name]
                                }
                                onChange={handleChange}/>
                        ))
                    }
                        <button type="submit"
                            onClick={handleRegister}>Register</button>
                        <div className="form-link">
                            <span>Already have an Account?
                            </span>
                            <Link to="/" className='signupname'>Login in</Link>
                        </div>

                        <div className="line"></div>
                        <div className="media-option">
                            <Link className='face' to="">
                                <img src="/images/face.png" alt="" srcset=""/>
                                <button>Welcome to G-level</button>
                            </Link>
                            <Link className='face' to="">
                                <img src="" alt="" srcset=""/>
                                <button>Let's Register yourself</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
