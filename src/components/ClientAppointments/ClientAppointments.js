import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar'
import styles from './ClientAppointments.module.css'

export const ClientAppointments = () => {

    const [appointments, setAppointments] = useState([])
    const [employeeUsers, setEmployeeUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({
        id: "",
        fullName: "",
        email: "",
        address: "",
        phone: "",
        role: "",
      });

      const navigate = useNavigate()


    useEffect(()=>{
        fetch(`http://localhost:8088/employees?_expand=user`)
        .then(res => res.json())
        .then((data)=>{
            setEmployeeUsers(data)
        })
    },[])

      useEffect(() => {
        const localParkerUser = localStorage.getItem("parker_user");
        const parkerUserObject = JSON.parse(localParkerUser)
        if (parkerUserObject.role !== 1) {
          navigate("/denied")
        }
        setCurrentUser(parkerUserObject);
        fetch(`http://localhost:8088/appointments?client_Id=${parkerUserObject.id}&_expand=pet&_expand=service&sort=date&_order=desc`)
        .then(res=>res.json())
        .then(data =>{
            setAppointments(data)
        })
      }, []);

      const handleDelete = (id) =>{
        window.alert("Are you sure you want to delete this appointment?")
        fetch(`http://localhost:8088/appointments/${id}`, {method:"DELETE"})
        .then(()=>{
            setAppointments(x=>x.filter(el=>el.id!==id))
        })
        
      } 

      const apptlist = appointments.map((appt,i)=>{
        const employeeUser = employeeUsers.find(el => el.userId===appt.employee_Id)
        return(
        employeeUser?<tr key={`appts--${i}`}>
        <td>{appt.startDate}</td>
        <td>{appt.endDate}</td>
        <td>{appt.service.serviceName}</td>
        <td><Link className={styles.apptLink} to={`/petform/${appt.pet.id}`}>{appt.pet.name}</Link></td>
        <td><Link className={styles.apptLink} to={`/client/employeeview/${employeeUser.id}`}>{employeeUser.user.fullName}</Link></td>
    
        <td>{employeeUser.user.phone}</td>
        <td><button type="button" className={`btn btn-sm btn-outline-light ${styles.deleteButton}`} onClick={()=>{handleDelete(appt.id)}}>Delete</button></td>
        </tr>:<tr><td>No appointments found</td></tr>
        )
    })

    
  return (
    <>
    <NavBar/>
    <div className="container">
        <h1>Hello {currentUser.fullName}</h1>
        <h2>Your Appointments</h2>
        {appointments.length>0 ?
        <table className={`table ${styles.apptTable}`}>
            <thead>
                <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Service</th>
                    <th>Pet</th>
                    <th>Pet Sitter</th>
                    <th>Phone</th>
                    <td></td>
                </tr>
            </thead>
        <tbody>
        {apptlist}
        </tbody>
        </table>:<p>You currently do not have any appointments</p>}
        <button className={`btn btn-outline-light ${styles.apptButton}`}onClick={()=>{navigate("/client/appointment")}}>Make New Appointment</button>
    </div>
    </>
  )
}
