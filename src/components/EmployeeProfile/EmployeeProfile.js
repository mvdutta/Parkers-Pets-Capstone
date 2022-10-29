import { red } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { MyCard } from "../MyCards/MyCard";
import { NavBar } from "../NavBar/NavBar";
import styles from "./EmployeeProfile.module.css";

export const EmployeeProfile = () => {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    fullName: "",
    email: "",
    address: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    const localParkerUser = localStorage.getItem("parker_user");
    setCurrentUser(JSON.parse(localParkerUser));
  }, []);

  const greeting =
    currentUser.fullName[currentUser.fullName.length - 1] === "s"
      ? `${currentUser.fullName}' Dashboard`
      : `${currentUser.fullName}'s Dashboard`;
  return (
    <div>
      <NavBar />
      <h1 className={styles.welcomeMessage}>{greeting}</h1>

      <div className={styles.cardHolder}>
        <MyCard
          title="My Profile"
          body="Review and update your contact details"
          linkTo="/employeeprofileform"
          image="profile.png"
        />
        <MyCard
          title="My Bio"
          body="Create and update your bio and services"
          linkTo="/"
          image="script.png"
        />
        <MyCard
          title="My Clients"
          body="View and edit your client details"
          linkTo="/aboutus"
          image="clientLogo.png"
        />
        <MyCard
          title="Appointments"
          body="View past and current appointments"
          linkTo="/"
          image="appointment.png"
        />
      </div>
      <div className={styles["divider-wrapper"]}>
        <div className={styles["custom-shape-divider-top-1666820762"]}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className={styles["shape-fill"]}
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
