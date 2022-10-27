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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li>{loggedIn && <Link to={whichProfile}>Profile</Link>}</li>
            <li>{loggedIn && <Link to="/" onClick={logout}>Logout</Link>}</li> 
        </ul>
    {loggedIn && <div>Welcome {currentUser.fullName}</div>}
    </div>
  )
}
