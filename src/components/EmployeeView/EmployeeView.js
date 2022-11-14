import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import styles from './EmployeeView.module.css'

export const EmployeeView = () => {
    const { employeeId } = useParams();


    const [employee, setEmployee] = useState({
        id:"",
        userId:"",
        biography:"",
        medications:0,
        profileImage:"",
        petTypeId:0,
        user:{},
        petType:{}
      })

    useEffect(()=>{
        fetch(`http://localhost:8088/employees?userId=${employeeId}&_expand=user&_expand=petType`)
        .then(res => res.json())
        .then((data)=>{
            setEmployee(data[0])
        })
    },[])

    const navigate = useNavigate()

  return (
    <>
      <NavBar/>
        <div className='container'> 

             <h1>{employee.user.fullName}</h1>

        <div className={styles.imgholder}>
            <img src={employee.profileImage}  className="img-fluid" alt="employee"/>
        </div>

        <div className="card mt-4">
            <div className="card-body">
                <h5 className="card-title">{employee.user.fullName}'s Bio</h5>
                <p className="card-text">{employee.biography}</p>
            </div>
        </div>


                <div className="d-flex flex-column justify-content-left">
                    <table className='table w-25'>
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{employee.user.email}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{employee.user.phone}</td>
                        </tr>
                        <tr>
                            <td>Specialty</td>
                            <td>{employee.petType.type}</td>
                        </tr>
                    </tbody>
                    </table>
                    <h3>{employee.user.fullName} {employee.medications===0?"cannot":"can"} deliver medications</h3>
                </div>

            
        <button className='btn btn-primary' onClick={()=>{navigate(-1)}}>Back</button>
        </div>
    </>
  )
}
