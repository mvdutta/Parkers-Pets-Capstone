import React from "react";
import { NavBar } from "../NavBar/NavBar";
import styles from "./OurTeam.module.css";

export const OurTeam = () => {
  return (
    <>
      <NavBar />
      <div className={`card ${styles.myCard}`}>
        <img
          src="https://cdn.pixabay.com/photo/2017/08/02/10/01/people-2570587__340.jpg"
          className={`card-img-top ${styles.profileImage}`}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Selina Kyle</h5>
          <p className="card-text"> Specialty: Cats</p>
          <p className={`card-text ${styles.cardText}`}>
            {" "}
            *Able to give meds/vet tech
          </p>
          <div>
            <img src="/cat-icon.png" className={styles.cardLogo} />
          </div>

          <button className={`${styles.teamButton}`}>See Bio</button>
        </div>
      </div>
    </>
  );
};
