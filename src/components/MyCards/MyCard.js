import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./MyCard.module.css"

export const MyCard = ({title, body}) => {
  return (<>
    <div className={styles.card}>
  <img src="logo512.png" alt="image" className={styles.cardImage}/>
  <div className={styles.container}>
    <h4><b>{title}</b></h4> 
    <p>{body}</p> 
  </div>
</div>
  </>

  )
}
