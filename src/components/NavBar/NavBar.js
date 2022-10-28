import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import styles from "./NavBar.module.css"


export const NavBar = () => {
    const [currentUser, setCurrentUser] = useState({})
    const navigate = useNavigate()
    const {loggedIn, setLoggedIn} = useContext(UserContext)

    useEffect(()=> {
        if (loggedIn) {
            const localParkerUser = localStorage.getItem("parker_user")
            setCurrentUser(JSON.parse(localParkerUser))
        } else{
            setCurrentUser({})
        }
       
    },[loggedIn])
    let whichProfile = ""
    if (currentUser.role===1){
        whichProfile = "/clientprofile"
    } else{
        whichProfile = "/employeeprofile"
    }

    const logout = () =>{
        setLoggedIn(false)
        localStorage.clear()
    }
    
  return (
    <div className={styles.navBar}>
        <ul >
            <li>{loggedIn && <div className={styles.navWelcome}>Welcome {currentUser.fullName}!</div>}</li>
            <li><Link className={styles.navLink} to="/">Home</Link></li>
            <li><Link className={styles.navLink}to="/aboutus">About Us</Link></li>
            <li><Link className={styles.navLink} to="/">Our Team</Link></li>
            <li><Link className={styles.navLink} to="/">FAQ</Link></li>
            <li><Link className={styles.navLink} to="/">Contact Us</Link></li>
            <li>{loggedIn && <Link className={styles.navLink}to={whichProfile}>My Dashboard</Link>}</li>
            <li>{loggedIn && <Link className={styles.navLink}to="/" onClick={logout}>Logout</Link>}</li> 
        
        </ul>
    
    </div>
  )
}
