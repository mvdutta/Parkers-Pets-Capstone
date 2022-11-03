import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const {loggedIn, setLoggedIn} = useContext(UserContext)
  const localParkerUser = localStorage.getItem("parker_user")
  const parkerUserObject = JSON.parse(localParkerUser)
  const navigate = useNavigate()
  useEffect(() => {
    const localParkerUser = localStorage.getItem("parker_user");
    const parkerUserObject = JSON.parse(localParkerUser)
    if (parkerUserObject.role !== 0) {
      navigate("/denied")
    }
    setCurrentUser(parkerUserObject);
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
          linkTo="/employeebioform"
          image="script.png"
        />
        <MyCard
          title="My Clients"
          body="View and edit your client's details"
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
      <button className={styles.deleteButton} 
        onClick={()=> {
            const confirmed = window.confirm("Are you sure you want to delete your account?")
            if(!confirmed) return
            fetch(`http://localhost:8088/users/${parkerUserObject.id}`, {
                method: "DELETE"
            })
            .then(() => {
                setLoggedIn(false)
                localStorage.clear()
                navigate("/")
            })
        }}
    >Delete Account</button>
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
