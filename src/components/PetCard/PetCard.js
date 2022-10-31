import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PetCard.module.css'

export const PetCard = ({id, name, age, breed, linkTo, image}) => {
const navigate = useNavigate()
const getPetDetails = () => {
    navigate(`/petform/${id}`)
}
const deletePet = () =>{
    const confirmed = window.confirm("Are you sure you want to delete this pet?")
    if(!confirmed) return
    fetch(`http://localhost:8088/pets/${id}`, {
        method: "DELETE"
    }).then(()=>{
        navigate(0)//refreshes the page
    })
}
  return (<>
        <div className={styles.card}>
          <img src={image} alt="image" className={styles.cardImage}/>
          <div className={styles.container}>
        <h4 className={styles.cardTitle}>{name}</h4>
        <p className={styles.cardBody}>{breed}</p> 
        <p className={styles.cardText}>Age: {age}</p> 
        <button className={styles.detailButton} onClick={getPetDetails}>Details</button>
        <button className={styles.detailButton} onClick={deletePet}>Delete</button>
          </div>
        </div>
  </>)
  }

