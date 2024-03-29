import React, { useEffect, useState } from "react"
import { API } from "../../constants"
import { NavBar } from "../NavBar/NavBar"
import styles from "./OurTeam.module.css"
import { TeamCard } from "./TeamCards"

export const OurTeam = () => {
    const [team, setTeam] = useState([])

    useEffect(() => {
        fetch(`${API}/employees?_expand=user&_expand=petType`)
            .then((res) => res.json())
            .then((data) => {
                const petTypeHasBeenSet = data.filter((el) =>
                    el.hasOwnProperty("petType")
                )
                setTeam(petTypeHasBeenSet)
            })
    }, [])

    const icons = {
        Cats: "/cat-icon2.png",
        Dogs: "/poodle-icon.png",
        "Insects and Spiders": "/spider-icon.png",
        Fish: "/fish-icon.png",
        Birds: "/macaw-icon.png",
        "Rodents and Rabbits": "/hamster-icon.png",
        "Amphibians and Reptiles": "/snake-icon.png",
    }

    const teamCards = team.map((teamMember) => (
        <TeamCard
            key={`teamMember--${teamMember.id}`}
            image={teamMember.profileImage}
            name={teamMember.user.fullName}
            petType={teamMember.petType.type}
            meds={
                teamMember.medications === 1 ? (
                    <span>*Able to give meds/vet tech</span>
                ) : (
                    <span className={styles.invisible}>
                        *Able to give meds/vet tech
                    </span>
                )
            }
            icon={icons[teamMember.petType.type]}
            bio={
                teamMember.biography === ""
                    ? `${teamMember.user.fullName} has not created a bio yet`
                    : teamMember.biography
            }
        />
    ))
    return (
        <>
            <NavBar />
            <h1>Meet Our Pet Sitters!</h1>
            <hr className={styles.pageBreak}></hr>
            <img src="/pet-line2.png" className={styles.petGroup} />
            <div className="container">
                <div className={styles.cardHolder}>{teamCards}</div>
            </div>
        </>
    )
}
