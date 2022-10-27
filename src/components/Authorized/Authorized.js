import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../App'


export const Authorized = ({children}) => {
   const {loggedIn} = useContext(UserContext)
   
   if(loggedIn){
      return children
   } else {
      return <Navigate to={"/denied"} replace />
   }
}
