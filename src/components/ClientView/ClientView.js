import React, { useState } from "react"
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { API } from "../../constants"
import { NavBar } from "../NavBar/NavBar"
import styles from "./ClientView.module.css"

export const ClientView = () => {
    const { clientId } = useParams()
    const [pets, setPets] = useState([])

    const [clientUser, setClientUser] = useState({
        id: "",
        userId: "",
        user: {},
    })

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${API}/clients?userId=${clientId}&_expand=user`)
            .then((res) => res.json())
            .then((data) => {
                setClientUser({ ...clientUser, ...data[0] })
            })
    }, [])

    useEffect(() => {
        fetch(`${API}/pets?client_Id=${clientId}`)
            .then((res) => res.json())
            .then((data) => {
                setPets(data)
            })
    }, [])

    const petList = pets.map((el) => (
        <span key={el.id}>
            <Link className={styles.petLink} to={`/employee/petview/${el.id}`}>
                {el.name}
            </Link>
            {",  "}
        </span>
    ))

    return (
        <>
            <NavBar />
            <div className="container">
                <h1>{clientUser.user.fullName}</h1>
                <table className={styles.clientTable}>
                    <tbody>
                        <tr className={styles.tableRow}>
                            <th>Client Details</th>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{clientUser.user.email}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>
                                {clientUser.user.streetAddress}, Nashville, TN-
                                {clientUser.user.zipCode}
                            </td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{clientUser.user.phone}</td>
                        </tr>
                        <tr>
                            <td>Pets</td>
                            <td>{petList}</td>
                        </tr>
                    </tbody>
                </table>

                <button
                    className={`btn btn-outline-light ${styles.backButton}`}
                    onClick={() => {
                        navigate("/employee/appointments")
                    }}
                >
                    Go Back
                </button>
            </div>
        </>
    )
}
