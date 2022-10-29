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

  const greeting = currentUser.fullName[currentUser.fullName.length-1] === 's' ? `${currentUser.fullName}' Dashboard`:`${currentUser.fullName}'s Dashboard`

  return (
    <div>
        <NavBar/>
        <h1 className={styles.welcomeMessage}>{greeting}</h1>
        
        <div className={styles.cardHolder}>
         <MyCard
         title="My Profile"
         body="Edit and update your contact details"
         linkTo="/"
         image="profile.png"
         />
          <MyCard
         title="My Pets"  
         body="Add and update your pet's information"
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