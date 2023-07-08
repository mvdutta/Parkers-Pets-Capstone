import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { API } from "../../constants"
import { MyCard } from "../MyCards/MyCard"
import { NavBar } from "../NavBar/NavBar"
import styles from "./ClientProfile.module.css"

export const ClientProfile = () => {
    const [currentUser, setCurrentUser] = useState({
        id: "",
        fullName: "",
        email: "",
        address: "",
        phone: "",
        role: "",
    })
    const { loggedIn, setLoggedIn } = useContext(UserContext)
    const localParkerUser = localStorage.getItem("parker_user")
    const parkerUserObject = JSON.parse(localParkerUser)
    const navigate = useNavigate()
    useEffect(() => {
        const localParkerUser = localStorage.getItem("parker_user")
        const parkerUserObject = JSON.parse(localParkerUser)
        if (parkerUserObject.role !== 1) {
            navigate("/denied")
        }
        setCurrentUser(parkerUserObject)
    }, [])

    const greeting =
        currentUser.fullName[currentUser.fullName.length - 1] === "s"
            ? `${currentUser.fullName}' Dashboard`
            : `${currentUser.fullName}'s Dashboard`

    return (
        <div>
            <NavBar />
            <h1 className={styles.welcomeMessage}>{greeting}</h1>

            <div className={styles.cardHolder}>
                <MyCard
                    title="My Profile"
                    body="Edit and update your contact details"
                    linkTo="/clientprofileform"
                    image="profile.png"
                />
                <MyCard
                    title="My Pets"
                    body="Add, view, and update your pet's information"
                    linkTo="/petList"
                    image="pets.png"
                />
                <MyCard
                    title="Appointments"
                    body="View past and current appointments"
                    linkTo="/client/appointments"
                    image="appointment.png"
                />
            </div>
            <button
                className={styles.deleteButton}
                onClick={() => {
                    const confirmed = window.confirm(
                        "Are you sure you want to delete your profile?"
                    )
                    if (!confirmed) return
                    fetch(`${API}/users/${parkerUserObject.id}`, {
                        method: "DELETE",
                    }).then(() => {
                        setLoggedIn(false)
                        localStorage.clear()
                        navigate("/")
                    })
                }}
            >
                Delete Account
            </button>
        </div>
    )
}
