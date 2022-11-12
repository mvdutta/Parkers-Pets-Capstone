import { waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./MyCard.module.css"

export const MyCard = ({title, body, linkTo, image, bio}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(linkTo)
    }
  return (<>
        <div className={styles.card} onClick={handleClick}>
          <img src={image} alt="image" className={styles.cardImage}/>
          <div className={styles.container}>
        <h4 className={styles.cardTitle}>{title}</h4>
        <p className={styles.cardBody}>{body}</p> 
          </div>
        </div>
  </>

  )
}


