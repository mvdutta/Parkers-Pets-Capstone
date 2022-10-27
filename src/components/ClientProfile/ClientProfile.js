import React, { useEffect, useState } from 'react'
import { NavBar } from '../NavBar/NavBar'

export const ClientProfile = () => {
  const [currentUser, setCurrentUser] = useState()

  // useEffect(()=> {
  //     const localParkerUser = localStorage.getItem("parker_user")
  //     setCurrentUser(JSON.parse(localParkerUser))
  // }, [])
  return (
    <div>
        <NavBar/>
        <h1>Client Profile</h1>
        {/* <p>Welcome {currentUser.fullName}</p> */}
    </div>
  )
}