import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../NavBar/NavBar'

export const Login = () => {
  const navigate = useNavigate()
    const login = () => {
        localStorage.setItem("parker_user", 1)
        navigate("/")
    }
  return (
    <div>
        <NavBar/>
        <h1>Login</h1>
        <input type="email"></input>
        <button onClick={login}>Login</button>
    </div>
  )
}
