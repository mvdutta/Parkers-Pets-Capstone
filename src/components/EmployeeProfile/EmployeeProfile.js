import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { NavBar } from '../NavBar/NavBar'
import styles from './EmployeeProfile.module.css'


export const EmployeeProfile = () => {
  const [currentUser, setCurrentUser] = useState({
    id:"",
    fullName:"",
    email:"",
    address:"",
    phone:"",
    role:""
  })

  useEffect(()=> {
    const localParkerUser = localStorage.getItem("parker_user")
    setCurrentUser(JSON.parse(localParkerUser))
  }, [])
  return (
    <div>
        <NavBar/>
        <h1>Employee Profile</h1>
        <p>Welcome {currentUser.fullName}</p>
        <div className={styles.cardHolder}>
        </div>
    </div>
  )
}
