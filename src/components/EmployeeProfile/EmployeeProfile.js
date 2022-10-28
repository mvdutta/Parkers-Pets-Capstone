import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { MyCard } from '../MyCards/MyCard'
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
        <h1 className={styles.welcomeMessage}>{currentUser.fullName}'s Dashboard</h1>
        
        <div className={styles.cardHolder}>
        <MyCard
         title="My Profile"
         body="Review and update your contact details"
         linkTo="/"
         image="profile.png"
         />
         <MyCard
         title="My Bio"
         body="Create and update your bio and services" 
         linkTo="/"
         image="script.png"
         />
          <MyCard
         title="My Clients"  
         body="View and edit your client details"
         linkTo="/aboutus"
         image="pets.png"
         />
          <MyCard
         title="Appointments"
         body="View past and current appointments" 
         linkTo="/"
         image="appointment.png"
         />  
        </div>
    </div>
  )
}
