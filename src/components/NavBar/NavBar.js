import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./NavBar.module.css"

export const NavBar = () => {
  return (
    <div>
        <ul className={styles.navBar}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li>Login</li>
        </ul>
    </div>
  )
}
