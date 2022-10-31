import React from 'react'
import styles from './PetCard.module.css'

export const PetCard = ({name, age, breed, linkTo, image}) => {

  return (<>
        <div className={styles.card}>
          <img src={image} alt="image" className={styles.cardImage}/>
          <div className={styles.container}>
        <h4 className={styles.cardTitle}>{name}</h4>
        <p className={styles.cardBody}>{breed}</p> 
        <p className={styles.cardBody}>{age} old</p> 
          </div>
        </div>
  </>)
  }

