import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../NavBar/NavBar'
import styles from "./DogServices.module.css"

export const DogServices = () => {
  return (<>
  <NavBar />
    <h1>Dog Sitting Services</h1>
    <hr className={styles.pageBreak}></hr>
      <img src="/dog-image2.png" className={styles.petGroup} />
      <h2 className={styles.serviceSubheader}>Choose the flat-rate plan that's best for your dog. </h2>
      <div className={styles.serviceContainer}>
        <div className={styles.catArea}>
          <div className={styles.imageArea}>
            <img src="/dog-walking.jpeg" className={styles.dogImage} />
          </div>
          <div className={styles.textArea}>
            <h3>Basic Visit</h3>
            <h4>15 minutes: $18.00 per visit</h4>
            <h4>Ideal for potty breaks</h4>
            <ul>
              <li>Choose one or two visits per day</li>
              <li>Potty break around your neighborhood or yard</li>
              <li>Waste picked up and removed </li>
              <li>Paws cleaned and dried if needed</li>
              <li>Mail/package collection </li>
              <li>Daily visit reports with photos and/or videos</li>
            </ul>
            <h5>*Note: Our Basic Visit is not available if your dog is medically fragile and/or requires medication</h5>
          </div>
        </div>
        <div className={styles.catArea}>
          <div className={styles.imageArea}>
            <img src="/dog-eating.jpeg" className={styles.dogImage} />
          </div>
          <div className={styles.textArea}>
            <h3>Standard Visit</h3>
            <h4>30 minutes: $30.00 per visit</h4>
            <h4>Great for meals, more playtime and basic medications:</h4>
            <ul>
              <li>Choose one or two visits per day</li>
              <li>Includes the care listed in our Basic Visit </li>
              <li>Water dish cleaned and filled</li>
              <li>Meal or treats provided according to instructions</li>
              <li>Administration of basic medications, supplements or treatments</li>
              <li>Longer walks, more playtime, and extra love</li>
              <li>Scheduled FaceTime session upon request</li>
            </ul>
          </div>
        </div>
        <div className={styles.catArea}>
          <div className={styles.imageArea}>
            <img src="/dog-toy.jpeg" className={styles.dogImage} />
          </div>
          <div className={styles.textArea}>
            <h3>Extended Visit</h3>
            <h4>45 minute: $45.00 per visit</h4>
            <h4>Recommended for puppies, medically fragile dogs, or 2 a dogs:</h4>
            <ul>
              <li>Choose one or two visits per day</li>
              <li>Includes all care listed in our Basic and Standard visit</li>
              <li>Great for dogs that may need more time to finish a meal or go potty</li>
              <li>Bathing, brushing, nail trimming, and plant watering upon request</li>
              <li>Essential for bottle feeding puppies and basic house training</li>
            </ul>
          </div>
        </div>
        <div className={styles.catArea}>
          <div className={styles.imageArea}>
            <img src="/sick-dog.jpeg" className={styles.dogImage} />
          </div>
          <div className={styles.textArea}>
            <h3>Plus Visit</h3>
            <h4>60 minutes: $55.00 per visit</h4>
            <h4>Recommended for households with 3+ dogs, new puppies, and medically fragile dogs</h4>
            <ul>
             <li>Choose one or two visits per day</li>
              <li>Includes all services from our Basic, Standard, and Extended visits</li>
              <li>Extra time to care for 3 or more dogs</li>
              <li>Extra time to care for dogs with complicated medical needs or new puppies</li>
              <li>Extra time to adhere to special diets or routines</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
