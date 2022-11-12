import React, { useState } from 'react'
import styles from "./OurTeam.module.css"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const TeamCard = ({image, name, petType, meds, icon, bio }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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
            <img src={icon} className={styles.cardIcon} />
          </div>
          <button className={`${styles.teamButton}`} onClick={handleShow}>Read My Bio</button>
        </div>
        <Modal show={show} onHide={handleClose} name={name} bio={bio}>
            <Modal.Header closeButton>
            <Modal.Title>{name}'s Bio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {bio}
            </Modal.Body>
            <Modal.Footer>
            <button className={`${styles.teamButton}`} onClick={handleClose}>Close</button>
            </Modal.Footer>
        </Modal>
      </div>
  </>

  )
}