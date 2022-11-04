import React, { useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import styles from "./OurTeam.module.css";
import { TeamCard } from "./TeamCards";

export const OurTeam = () => {

const [team, setTeam] = useState([])

useEffect(() => {
    fetch(`http://localhost:8088/employees?_expand=user&_expand=petType`)
    .then(res => res.json())
    .then((data) => {
        setTeam(data)
    })
}, [])

const teamCards = team.map(teamMember => (
    <TeamCard
            key={`teamMember--${teamMember.id}`}
            image = {teamMember.profileImage}
            name = {teamMember.user.fullName}
            petType = {teamMember.petType.type}
            meds = "*Able to give meds/vet tech"
            logo = "/cat-icon.png"
            />
))
  return (
    <>
      <NavBar />
      <h1>Meet Our Pet Sitters!</h1>
      <div className="container">
          <div className={styles.cardHolder}>
            {teamCards}
         </div>
          
      </div>

     
    </>
  );
};
