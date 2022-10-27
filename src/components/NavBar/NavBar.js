import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./NavBar.module.css"


export const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(()=> {
        const localParkerUser = localStorage.getItem("parker_user")
   
        if (localParkerUser) {
            const parkerUserObject = JSON.parse(localParkerUser)
            setLoggedIn(true)
            setUser(parkerUserObject)
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
            <li>{loggedIn && user.role === 0? "my profile": ""}</li>
            <li onClick={logout}>{loggedIn && "Logout"}</li>
           
        </ul>
    </div>
  )
}
