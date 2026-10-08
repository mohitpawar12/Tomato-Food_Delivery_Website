import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const [showProfile, setShowProfile] = useState(false);

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setShowProfile(false);
        navigate("/");
    }

    return (
        <div className='navbar'>

            <div className="navbar-brand">
                <Link to='/'>
                    <img className='logo' src="./favicon.png" alt="logo" />
                    <span className="logo-text">Tomato</span>
                </Link>
            </div>

            <ul className="navbar-menu">
                <Link
                    to='/'
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                >
                    Home
                </Link>

                <a
                    href='#explore-menu'
                    onClick={() => setMenu("menu")}
                    className={menu === "menu" ? "active" : ""}
                >
                    Menu
                </a>

                <a
                    href='#app-download'
                    onClick={() => setMenu("mobile-app")}
                    className={menu === "mobile-app" ? "active" : ""}
                >
                    Mobile App
                </a>

                <a
                    href='#footer'
                    onClick={() => setMenu("contact-us")}
                    className={menu === "contact-us" ? "active" : ""}
                >
                    Contact Us
                </a>
            </ul>

            <div className="navbar-right">

                <img
                    src={assets.search_icon}
                    alt="search icon"
                />

                <div className="navbar-search-icon">
                    <Link to='/cart'>
                        <img
                            src={assets.basket_icon}
                            alt="basket icon"
                        />
                    </Link>

                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {!token
                    ? <button onClick={() => setShowLogin(true)}>
                        Sign in
                    </button>

                    : <div className="navbar-profile">

                        <img
                            src={assets.profile_icon}
                            alt="profile"
                            onClick={() => setShowProfile(!showProfile)}
                        />

                        {showProfile && (
                            <ul className="nav-profile-dropdown">

                                <li onClick={() => navigate("/myorders")}>
                                    <img src={assets.bag_icon} alt="" />
                                    <p>Orders</p>
                                </li>

                                <hr />

                                <li onClick={logout}>
                                    <img src={assets.logout_icon} alt="" />
                                    <p>Logout</p>
                                </li>

                            </ul>
                        )}

                    </div>
                }

            </div>

        </div>
    )
}

export default Navbar