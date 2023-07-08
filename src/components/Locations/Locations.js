import React, { useEffect, useState } from "react"
import { API } from "../../constants"
import styles from "./Locations.module.css"

export const Locations = () => {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        fetch(`${API}/zipcodes`)
            .then((res) => res.json())
            .then((data) => {
                setLocations(data)
            })
    }, [])
    const lis = locations.map((el) => (
        <li className={styles.singleLi} key={el.id}>
            {el.location}
        </li>
    ))
    return (
        <>
            <div className={styles.locationContainer}>
                <h5>Locations We Serve</h5>
                <ul>{lis}</ul>
            </div>
        </>
    )
}
