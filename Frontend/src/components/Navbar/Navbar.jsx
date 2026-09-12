import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'

const Navbar = () => {

    const [menu, setMenu] = useState("home")

    return (
        <div className='navbar'>

            <div className="navbar-brand">
                <img className='logo' src="./favicon.png" alt="logo"  />
                {/* <img src={assets.logo} alt="logo-text" className="logo-text" /> */}
                <span className="logo-text">Tomato</span>
            </div>

            <ul className="navbar-menu">
                <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li>
                <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li>
                <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</li>
                <li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</li>
            </ul>

            <div className="navbar-right">
                <img src={assets.search_icon} alt="search icon" />

                <div className="navbar-search-icon">
                    <img src={assets.basket_icon} alt="basket icon" />

                    <div className="dot"></div>
                </div>
                <button>Sign in</button>
            </div>

        </div>
    )
}

export default Navbar
