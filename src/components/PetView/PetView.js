import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { API } from "../../constants"
import { NavBar } from "../NavBar/NavBar"
import styles from "./PetView.module.css"

const PETTYPES = {
    1: "Cat",
    2: "Dog",
    3: "Fish",
    4: "Bird",
    5: "Insect/Spider",
    6: "Rodent",
    7: "Amphibian/Reptile",
}

const PetView = () => {
    const [pet, setPet] = useState({
        name: "",
        age: "",
        color: "",
        breedSpecies: "",
        medications: 0,
        sex: "",
        instructions: "",
        vetInfo: "",
        image: "",
        client_Id: "",
        petTypeId: "",
    })
    const { petId } = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        const localParkerUser = localStorage.getItem("parker_user")
        const parkerUserObject = JSON.parse(localParkerUser)
        const petCopy = { ...pet }
        petCopy.client_Id = parkerUserObject.id
        setPet(petCopy)
    }, [])

    useEffect(() => {
        fetch(`${API}/pets/${petId}?_expand=petType`)
            .then((res) => res.json())
            .then((data) => {
                const petCopy = { ...pet, ...data }
                setPet(petCopy)
            })
    }, [])

    return (
        <>
            <NavBar />
            <div className="container">
                <h1>{pet.name}</h1>
                <div className={styles.imgholder}>
                    <img src={pet.image} className="img-fluid" alt="employee" />
                </div>
                <div className="d-flex flex-column justify-content-left">
                    <table className={styles.petTable}>
                        <tbody>
                            <tr className={styles.tableRow}>
                                <th>{pet.name}'s Details</th>
                            </tr>
                            <tr>
                                <td>Age</td>
                                <td>{pet.age}</td>
                            </tr>
                            <tr>
                                <td>Type</td>
                                <td>{PETTYPES[pet.petTypeId]}</td>
                            </tr>
                            <tr>
                                <td>Color</td>
                                <td>{pet.color}</td>
                            </tr>
                            <tr>
                                <td>Breed/Species</td>
                                <td>{pet.breedSpecies}</td>
                            </tr>
                            <tr>
                                <td>Medications</td>
                                <td>{pet.medications === 1 ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td>Sex</td>
                                <td>{pet.sex}</td>
                            </tr>
                            <tr>
                                <td>Instructions</td>
                                <td>{pet.instructions}</td>
                            </tr>
                            <tr>
                                <td>Vet Information</td>
                                <td>{pet.vetInfo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button
                    className={`btn btn-outline-light ${styles.backButton}`}
                    onClick={() => navigate(-1)}
                >
                    Go back
                </button>
            </div>
        </>
    )
}

export default PetView
