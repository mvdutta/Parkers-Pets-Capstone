import React, { useEffect, useState } from 'react'
import { MyCard } from '../MyCards/MyCard'
import { NavBar } from '../NavBar/NavBar'
import styles from "./ClientProfile.module.css"

export const ClientProfile = () => {
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
        <h1 className={styles.welcomeMessage}>{currentUser.fullName}'s Dashboard</h1>
        
        <div className={styles.cardHolder}>
         <MyCard
         title="My Profile"
         body="Edit and update your contact details"
         linkTo="/"
         />
          <MyCard
         title="My Pets"  
         body="Add and update your pets"
         linkTo="/aboutus"
         />
          <MyCard
         title="Appointments"
         body="View past and current appointments" 
         linkTo="/"
         />
        </div>
    </div>
  )
}