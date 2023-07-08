import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "../../constants"
import { NavBar } from "../NavBar/NavBar"
import { NewPetCard } from "../NewPetCard/NewPetCard"
import { PetCard } from "../PetCard/PetCard"
import styles from "./pets.module.css"

export const PetList = () => {
    const [pets, setPets] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const localParkerUser = localStorage.getItem("parker_user")
        const parkerUserObject = JSON.parse(localParkerUser)
        fetch(`${API}/pets?client_Id=${parkerUserObject.id}`)
            .then((res) => res.json())
            .then((data) => {
                setPets(data)
            })
    }, [])

    const makeNameString = (names) => {
        let namestring = ""
        if (names.length === 1) {
            namestring = names[0]
        }
        if (names.length === 2) {
            namestring = names.join(" and ")
        }
        if (names.length > 2) {
            const last = names[names.length - 1]
            const allButLast = names.slice(0, names.length - 1)
            namestring = allButLast.join(", ") + " and " + last
        }
        return namestring
    }

    const petNamelist = makeNameString(pets.map((pet) => pet.name))
    const petCards = pets.map((pet) => (
        <NewPetCard
            key={pet.id}
            id={pet.id}
            name={pet.name}
            breed={pet.breedSpecies}
            age={pet.age}
            image={pet.image}
            pets={pets}
            setPets={setPets}
        />
    ))

    return (
        <>
            <NavBar />
            <div>
                <div className={styles.welcomeMessage}>
                    Your Pet(s):{" "}
                    <span className={styles.petName}>{petNamelist}</span>
                    <div className={styles.addPetLink}>
                        <button
                            className={styles.newPetButton}
                            onClick={() => {
                                navigate("/petform")
                            }}
                        >
                            {" "}
                            Add A Pet
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.petCardHolder}>{petCards}</div>
        </>
    )
}
