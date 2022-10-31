import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PetCard.module.css'

export const PetCard = ({id, name, age, breed, linkTo, image}) => {
const navigate = useNavigate()
const getPetDetails = () => {
    navigate(`/petform/${id}`)
}
  return (<>
        <div className={styles.card}>
          <img src={image} alt="image" className={styles.cardImage}/>
          <div className={styles.container}>
        <h4 className={styles.cardTitle}>{name}</h4>
        <p className={styles.cardBody}>{breed}</p> 
        <p className={styles.cardText}>{age} years old</p> 
        <button className={styles.detailButton} onClick={getPetDetails}>Details</button>
          </div>
        </div>
  </>)
  }

