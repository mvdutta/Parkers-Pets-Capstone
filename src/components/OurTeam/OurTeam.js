import React from "react";
import { NavBar } from "../NavBar/NavBar";
import styles from "./OurTeam.module.css";
import { TeamCard } from "./TeamCards";

export const OurTeam = () => {
  return (
    <>
      <NavBar />
      <h1>Meet Our Pet Sitters!</h1>
      <div class="container">
          <div className={styles.cardHolder}>
            <TeamCard
            image = "https://cdn.pixabay.com/photo/2017/08/02/10/01/people-2570587__340.jpg"
            name = "Selena Kyle"
            petType = "Cats"
            meds = "*Able to give meds/vet tech"
            logo = "/cat-icon.png"
            />
         </div>
          
      </div>

     
    </>
  );
};
