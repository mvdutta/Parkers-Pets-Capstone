import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../NavBar/NavBar'
import styles from "./DogServices.module.css"

export const DogServices = () => {
  return (<>
  <NavBar />
    <h1>Dog Sitting Services</h1>
    <hr className={styles.pageBreak}></hr>
      <img src="/dog-image2.png" className={styles.petGroup} />
  
    </>
  )
}
