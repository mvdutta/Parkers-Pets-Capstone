import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import styles from "./OtherPetServices.module.css";

export const OtherPetServices = () => {
  const navigate = useNavigate()
  return (
    <>
      <NavBar />
      <h1>Other Pet Services</h1>
      <hr className={styles.pageDivider}></hr>
      <img src="/parrot-image1.png" className={styles.petGroup} />
      <div className={styles.buttonContainer}>
      <button className={styles.backButton} onClick={()=> {navigate(-1)}}>Go Back</button>
      </div>
      <div>
      <h2 className={styles.serviceInfo}>We love all pets and provide each one with the love and care they deserve when you're away.</h2>
      <h2 className={styles.serviceTypes}> Currently, we can provide excellent care for insects/spiders, amphibians/reptiles, rodents/rabbits, birds, and fish.</h2>
      <h2 className={styles.serviceSubheader}>Choose the flat-rate plan that's best for your pet. </h2>
      </div>
      <div className={styles.serviceContainer}>
        <div className={styles.catArea}>
          <div className={styles.imageArea}>
            <img src="/spider.jpeg" className={styles.catImage} />
          </div>
          <div className={styles.textArea}>
            <h3>Basic Visit</h3>
            <h4>15 minutes: $18.00 per visit</h4>
            <h4>Ideal for low maintenance pets</h4>
            <ul>
              <li>Choose one or two visits per day</li>
              <li>Basic care provided based on instructions</li>
              <li>Mail/package collection </li>
              <li>Daily visit reports with photos and/or videos</li>
            </ul>
            <h5>*Note: Our Basic Visit is not available if your pet is medically fragile and/or requires medication</h5>
          </div>
        </div>
        <div className={styles.catArea}>
          <div className={styles.imageArea}>
            <img src="/rabbit2.jpeg" className={styles.catImage} />
          </div>
          <div className={styles.textArea}>
            <h3>Standard Visit</h3>
            <h4>30 minutes: $30.00 per visit</h4>
            <h4>Great for more playtime, special diets and basic medications:</h4>
            <ul>
              <li>Choose one or two visits per day</li>
              <li>Includes the care listed in our Basic Visit </li>
              <li>Water dish cleaned and filled</li>
              <li>Meal or treats provided </li>
              <li>Administration of basic medications, supplements or treatments</li>
              <li>More playtime and extra love for those who enjoy it!</li>
            </ul>
          </div>
        </div>
        <div className={styles.catArea}>
          <div className={styles.imageArea}>
            <img src="/cockatoo.jpeg" className={styles.catImage} />
          </div>
          <div className={styles.textArea}>
            <h3>Extended Visit</h3>
            <h4>45 minute: $45.00 per visit</h4>
            <h4>Recommended for large birds, medically fragile pets, or for some basic saltwater aquariums</h4>
            <ul>
              <li>Choose one or two visits per day</li>
              <li>Includes all care listed in our Basic and Standard visit</li>
              <li>Provides more playtime and enrichment for large birds and other pets</li>
              <li>Bathing, brushing, nail trimming, and plant watering upon request</li>
            </ul>
          </div>
        </div>
        <div className={styles.catArea}>
          <div className={styles.imageArea}>
            <img src="/saltwater-aquarium.jpeg" className={styles.catImage} />
          </div>
          <div className={styles.textArea}>
            <h3>Plus Visit</h3>
            <h4>60 minutes: $55.00 per visit</h4>
            <h4>Recommended for households with multiple pets, large birds, and complex saltwater aquariums</h4>
            <ul>
             <li>Choose one or two visits per day</li>
              <li>Includes all services from our Basic, Standard, and Extended visits</li>
              <li>Extra time to care for multiple pets</li>
              <li>Includes cage or aquarium cleaning</li>
              <li>Extra time to adhere to special diets or routines</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
