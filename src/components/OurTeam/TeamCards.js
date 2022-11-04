import React from 'react'
import styles from "./OurTeam.module.css"

export const TeamCard = ({image, name, petType, meds, logo }) => {
    
  return (<>
      <div className={`card ${styles.myCard}`}>
        <img
          src={image}
          className={`card-img-top ${styles.profileImage}`}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text"> Specialty: {petType}</p>
          <p className={`card-text ${styles.cardText}`}>
            {meds}
          </p>
          <div>
            <img src={logo} className={styles.cardLogo} />
          </div>

          <button className={`${styles.teamButton}`}>See Bio</button>
        </div>
      </div>
  </>

  )
}