import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./NavBar.module.css"

export const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()
    useEffect(()=> {
        if (localStorage.getItem("parker_user")) {
            setLoggedIn(true)
        }
    },[loggedIn])
    const logout = () => {
        localStorage.clear()
        setLoggedIn(false)
    }
  return (
    <div>
        <ul className={styles.navBar}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li>{loggedIn?<Link to="/" onClick={logout}>Logout</Link>:<Link to="/login">Login</Link>}</li>
            <li>{loggedIn?<Link to="/myprofile">My Profile</Link>: ""}</li>
           
        </ul>
    </div>
  )
}
