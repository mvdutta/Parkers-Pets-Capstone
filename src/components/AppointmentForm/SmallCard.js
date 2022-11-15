import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import styles from "./AppointmentForm.module.css"

export const SmallCard = ({imageLink, name, email, phone, bio, medications}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <Card style={{ width: '15rem'}} className="h-100">
      <Card.Img variant="top" src={imageLink} className={styles.cardImgTop}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Button variant="primary" onClick={handleShow}>
        Details
      </Button>
      </Card.Body>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{bio}</p>
            <p>email: {email}</p>
            <p>phone: {phone}</p>
            <p>{name} {medications===0?"cannot":"can"} administer medications</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
