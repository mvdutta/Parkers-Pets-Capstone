import React from 'react'
import { Navigate } from 'react-router-dom'

export const Authorized = ({children}) => {
 if(localStorage.getItem("parker_user")){
    return children
 } else {
    return <Navigate to={"/login"} replace />
 }
}
