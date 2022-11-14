import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import styles from './ClientView.module.css'

export const ClientView = () => {
    const { clientId } = useParams();
    const [pets, setPets] = useState([])

    const [clientUser, setClientUser] = useState({
        id: "",
        userId: "",
        user:{}
      })

    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`http://localhost:8088/clients?userId=${clientId}&_expand=user`)
        .then(res => res.json())
        .then((data)=>{
            setClientUser({...clientUser, ...data[0]})
        })
    },[])

    useEffect(()=>{
        fetch(`http://localhost:8088/pets?client_Id=${clientId}`)
        .then(res => res.json())
        .then((data)=>{
            console.log(data)
            setPets(data)
        })
    },[])

    const petlist = pets.map(el=><li key={el.id}>
        <Link to={`/employee/petview/${el.id}`}>{el.name}</Link>
    </li>)
  return (
    <>
      <NavBar/>
        <div className='container'> 
        <button className='btn btn-primary' onClick={()=>{navigate("/employee/appointments")}}>Appointments</button>
            <h1>{clientUser.user.fullName}</h1>
            <table className='table w-50'>
            <tbody>
                <tr>
                    <td>Email</td>
                    <td>{clientUser.user.email}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{clientUser.user.streetAddress}, Nashville, TN-{clientUser.user.zipCode}</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>{clientUser.user.phone}</td>
                </tr>
            </tbody>
            </table> 
            <h3>{clientUser.user.fullName}'s Pets</h3>
            <ul>
            {petlist}
            </ul>
            

        </div>
    </>
  )
}

