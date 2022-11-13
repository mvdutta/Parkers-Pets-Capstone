import React from "react";
import { NavBar } from "../NavBar/NavBar";
import styles from "./OtherPetServices.module.css";

export const OtherPetServices = () => {
  return (
    <>
      <NavBar />
      <h1>Other Pet Services</h1>
      <hr className={styles.pageBreak}></hr>
      <img src="/parrot-image1.png" className={styles.petGroup} />
    </>
  );
};
