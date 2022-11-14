import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./NewPetCard.module.css"
import style1 from '../PetCard/PetCard.module.css'


export const NewPetCard = ({key, image, name, breed, age, id}) => {
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
      <div key={key} className={`card ${styles.myCard}`}>
        <img
          src={image}
          className={`card-img-top ${styles.profileImage}`}
          alt="..."
        />
        <div className={`card-body ${styles.cardBody}`}>
          <h5 className="card-title">{name}</h5>
          <p className="card-text"> Breed/Species: {breed}</p>
          <p className={`card-text ${styles.cardText}`}>
           Age: {age}
          </p>
          <button className={style1.detailButton} onClick={getPetDetails}>Details</button>
          <button className={style1.deleteButton} onClick={deletePet}>Delete</button>
        </div>
    
      </div>
  </>

  )
}