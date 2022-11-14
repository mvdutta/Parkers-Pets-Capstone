import React, { useEffect, useState } from 'react'
import styles from './Locations.module.css'

export const Locations = () => {
const [locations, setLocations] = useState([])

useEffect(()=>{
    fetch(`http://localhost:8088/zipcodes`)
    .then(res=>res.json())
    .then(data => {
        setLocations(data)
    })
}, [])
const lis = locations.map(el=>(
    <li className={styles.singleLi} key={el.id}>{el.location}</li>
))
  return (<>
    <div className={styles.locationContainer}>
        <h5>Locations We Serve</h5>
        <ul>
            {lis}
        </ul>
    </div>
    </>
  )
}
