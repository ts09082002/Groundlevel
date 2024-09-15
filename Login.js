import React, {useState} from 'react'
import "./login.css"
import {Link, useNavigate} from 'react-router-dom'
import {auth} from "../../firebase"
import {signInWithEmailAndPassword} from "firebase/auth";

const Login = () => {
    const [inputs, setinputs] = useState({email: "", password: ""});

    const handleChange = (e) => {
        setinputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };

    const [inputType, setinputType] = useState("password");
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();

        try {
            signInWithEmailAndPassword(auth, inputs.email, inputs.password).then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                alert("Registration Successfull| Go to the Login Page")
                navigate("/home")
            });
        } catch (error) {
            // if (error.code === 'auth/email-already-in-use') { // Handle the case where the email is already in use.
            //     console.log('Email is already in use. Please log in or reset your password.');
            // } else { // Handle other authentication errors.
            //     console.error('Authentication error:', error.message);
            // }
        }
    }

    console.log(inputs);
    return (
        <div className='Login'>
            <h2>Login</h2>
            <form id='lo'>
                <div className="formInput">
                    <input type='email' placeholder='Enter Email'
                        onChange={handleChange}
                        name="email"
                        id='email'
                        required/>
                </div>
                <div className="formInput">
                    <input type={inputType}
                        placeholder='Enter Password'
                        onChange={handleChange}
                        name="password"
                        id='password'
                        required/>
                </div>
                <div className="eyeIcon">
                    {/* {toogleeye ? <Visibility /> : <VisibilityOff />} */} </div>
                <button type="submit"
                    onClick={handleLogin}>Login</button>
                <div className="form-link">
                    <span>Don't have an Account?
                    </span>
                    <Link to="/register" className='signupname'>Sign in</Link>
                </div>

                <div className="lines"></div>
                <div className="media-option">
                    <Link className='face' to="/register">
                        <img src="./images/face.png" alt="" srcset=""/>
                        <button>Welcome to G-Level</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login
