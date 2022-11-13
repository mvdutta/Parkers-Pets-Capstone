import React from 'react'
import { NavBar } from '../NavBar/NavBar'
import styles from "./CatServices.module.css"

export const CatServices = () => {
  return (<>
    <NavBar />
    <h1>Cat Services</h1>
    <hr className={styles.pageBreak}></hr>
      <img src="/cat-image1.png" className={styles.petGroup} />
    <div className={styles.serviceContainer}>
        <div className={styles.catArea}>
        <div className={styles.imageArea}>
            <img src="/whitekitten.jpeg" className={styles.catImage}/>
        </div>
        <div className={styles.textArea}>
        <h3>Basic Visit</h3>
        <h4>15 minutes: $18.00 per visit</h4>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        </div>
        </div>
        <div className={styles.catArea}>
        <div className={styles.imageArea}>
        <img src="/whitekitten.jpeg" className={styles.catImage}/>
        </div>
        <div className={styles.textArea}>
        <h3>Standard Visit</h3>
        <h4>30 minutes: $30.00 per visit</h4>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    </div>
    <div className={styles.catArea}>
        <div className={styles.imageArea}>
        <img src="/whitekitten.jpeg" className={styles.catImage}/>
        </div>
    <div className={styles.textArea}>
        <h3>Extended Visit</h3>
        <h4>45 minutes: $40.00 per visit</h4>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    </div>
    <div className={styles.catArea}>
        <div className={styles.imageArea}>
        <img src="/whitekitten.jpeg" className={styles.catImage}/>
        </div>    
    <div className={styles.textArea}>
        <h3>Plus Visit</h3>
        <h4>1 Hour: $55.00 per visit</h4>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    </div>
    </div>
    </>
  )
}
