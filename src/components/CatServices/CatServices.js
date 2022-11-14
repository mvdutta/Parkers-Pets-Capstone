import React from "react";
import { NavBar } from "../NavBar/NavBar";
import styles from "./CatServices.module.css";

export const CatServices = () => {
  return (
    <>
      <NavBar />
      <h1>Cat Services</h1>
      <hr className={styles.pageBreak}></hr>
      <img src="/cat-image1.png" className={styles.petGroup} />
      <h2 className={styles.serviceSubheader}>Choose the flat-rate plan that's best for your cat. </h2>
      <div className={styles.serviceContainer}>
        <div className={styles.catArea}>
          <div className={styles.imageArea}>
            <img src="/whitekitten.jpeg" className={styles.catImage} />
          </div>
          <div className={styles.textArea}>
            <h3>Basic Visit</h3>
            <h4>15 minutes: $18.00 per visit</h4>
            <h4>Purrfect for cats that need minimal care:</h4>
            <ul>
              <li>Choose one or two visits per day</li>
              <li>Food and water cleaned and filled</li>
              <li>Litter box scooped and waste removed from home </li>
              <li>Love, attention and playtime</li>
              <li>Mail/package collection </li>
              <li>Daily visit reports with photos and/or videos</li>
            </ul>
            <h5>*Note: Our Basic Visit is not available if your cat is medically fragile and/or requires medication</h5>
          </div>
        </div>
        <div className={styles.catArea}>
          <div className={styles.imageArea}>
            <img src="/calico.jpeg" className={styles.catImage} />
          </div>
          <div className={styles.textArea}>
            <h3>Standard Visit</h3>
            <h4>30 minutes: $30.00 per visit</h4>
            <h4>Purrfect for multi-cat households or cats that need basic medications:</h4>
            <ul>
              <li>Choose one or two visits per day</li>
              <li>Includes the care listed in our Basic Visit </li>
              <li>More one-on-one time with your cat(s)</li>
              <li>Administration of basic medications, supplements or treatments</li>
              <li>Scheduled FaceTime with your cat upon request</li>
              <li>Brushing, additional photos, and plant watering upon request </li>
            </ul>
          </div>
        </div>
        <div className={styles.catArea}>
          <div className={styles.imageArea}>
            <img src="/bottle-kitten.jpeg" className={styles.catImage} />
          </div>
          <div className={styles.textArea}>
            <h3>Extended Visit</h3>
            <h4>45 minute: $45.00 per visit</h4>
            <h4>Purrfect bottle fed kittens, shy or anxious cats, and medically fragile cats:</h4>
            <ul>
              <li>Choose one or two visits per day</li>
              <li>Includes all care listed in our Basic and Standard visit</li>
              <li>Great for cats that may need more time to finish a meal or use litter pan</li>
              <li>Recommended for shy or anxious cats that need extra time to feel comfortable with new people</li>
              <li>Essential for bottle feeding kittens and basic litter box training</li>
            </ul>
          </div>
        </div>
        <div className={styles.catArea}>
          <div className={styles.imageArea}>
            <img src="/elderly-cat.jpeg" className={styles.catImage} />
          </div>
          <div className={styles.textArea}>
            <h3>Plus Visit</h3>
            <h4>60 minutes: $55.00 per visit</h4>
            <h4>Recommended for households with 5+ cats and medically fragile cats</h4>
            <ul>
             <li>Choose one or two visits per day</li>
              <li>Includes all services from our Basic, Standard, and Extended visits</li>
              <li>Extra time to care for 5 or more cats</li>
              <li>Extra time to care for cats with complicated medical needs</li>
              <li>Extra time to adhere to special diets or routines</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
