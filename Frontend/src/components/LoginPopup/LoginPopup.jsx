import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'

const LoginPopup = ({ setShowLogin }) => {

    const [currentState, setCurrentState] = useState("Login")

    return (
        <div className='login-popup'>

            <form className="login-popup-container">

                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="cross-icon" />
                </div>

                <div className="login-popup-inputs">
                    {currentState === "Login" ? <></> : <input type="text" placeholder='Your Name' required />}
                    <input type="email" placeholder='Your email' required />
                    <input type="password" placeholder='Password' required />
                </div>

                <button>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the Terms of Use & Privacy Policy </p>
                </div>

                {currentState === "Login"
                    ? <p>Create a new Account? <span onClick={() => setCurrentState("Sign Up")}>Click Here</span></p>
                    : <p>Already have an Account? <span onClick={() => setCurrentState("Login")}>Login Here</span></p>
                }

            </form>

        </div>
    )
}

export default LoginPopup
