import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./MyCard.module.css"

export const MyCard = ({title, body, linkTo}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(linkTo)
    }
  return (<>
        <div className={styles.card} onClick={handleClick}>
          <img src="logo512.png" alt="image" className={styles.cardImage}/>
          <div className={styles.container}>
        <h4><b>{title}</b></h4>
        <p>{body}</p> 
          </div>
        </div>
  </>

  )
}
