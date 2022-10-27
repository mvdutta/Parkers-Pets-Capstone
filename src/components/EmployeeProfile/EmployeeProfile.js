import React, { useEffect, useState } from 'react'
import { NavBar } from '../NavBar/NavBar'

export const EmployeeProfile = () => {
  const [currentUser, setCurrentUser] = useState()

  // useEffect(()=> {
  //     const localParkerUser = localStorage.getItem("parker_user")
  //     console.log(JSON.parse(localParkerUser))
  //     setCurrentUser(JSON.parse(localParkerUser))
  // }, [])
  return (
    <div>
        <NavBar/>
        <h1>Employee Profile</h1>
        {/* <p>Welcome {currentUser.fullName}</p> */}
    </div>
  )
}
