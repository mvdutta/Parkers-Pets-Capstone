import React from 'react'
import { NavBar } from '../NavBar/NavBar'
import styles from "./ContactUs.module.css"

export const ContactUs = () => {
  return (<>
  <NavBar />
    <h1>Contact Us</h1>
    <hr className={styles.pageBreak}></hr>
      <img src="/pet-line2.png" className={styles.petGroup} />
      <div>
        <h2 className={styles.contactSubHead}>Have a Question? Get in Touch.</h2>
      </div>
      <div className={styles.contactContainer}>
        <div>
        <div className={styles.iconContainer}>
        <img src="/location-icon.png" className={styles.contactIcon} />
        </div>
        <div className={styles.contactText}>
           <h5>Visit Us</h5>
           <h6>1289 Pet Way</h6>
           <h6>Nashville, TN 37215</h6>
           </div>
        </div>
        <div className={styles.contactGroup}>
        <div className={styles.iconContainer}>
        <img src="/contact-icon.png" className={styles.contactIcon} />
        </div>
        <div className={styles.contactText}>
            <h5>Call or Email Us</h5>
            <h6>(615) 555-2022</h6>
            <h6>parkerspetsit@email.com</h6>
        </div>
        </div>
        <div>
        <div className={styles.iconContainer}>
        <img src="/open-icon.png" className={styles.openIcon} />
        </div>
        <div className={styles.contactText}>
            <h5>Business Hours</h5>
            <h6>Mon-Fri: 9:00 am - 5:00 pm</h6>
            <h6>Sat & Sun: closed</h6>
        </div> 
        </div>
      </div>
    </>
  )
}
