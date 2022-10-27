import React from 'react'
import { NavBar } from './NavBar/NavBar'

export const Page404 = () => {
  return (
    <div>
        <NavBar/>
        <h1>Something went wrong</h1>
    </div>
  )
}
export const Denied = () => {
  return (
    <div>
        <NavBar/>
        <h1>You are not authorized to access this resource</h1>
    </div>
  )
}
