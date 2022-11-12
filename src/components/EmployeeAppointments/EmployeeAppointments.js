import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar'

export const EmployeeAppointments = () => {

    const [appointments, setAppointments] = useState([])
    const [clientUsers, setClientUsers] = useState([])
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
        fetch(`http://localhost:8088/clients?_expand=user`)
        .then(res => res.json())
        .then((data)=>{
            setClientUsers(data)
        })
    },[])

      useEffect(() => {
        const localParkerUser = localStorage.getItem("parker_user");
        const parkerUserObject = JSON.parse(localParkerUser)
        if (parkerUserObject.role !== 0) {
          navigate("/denied")
        }
        setCurrentUser(parkerUserObject);
        fetch(`http://localhost:8088/appointments?employee_Id=${parkerUserObject.id}&sort=date&_order=desc`)
        .then(res=>res.json())
        .then(data =>{
            setAppointments(data)
        })
      }, []);

      const apptlist = appointments.map((appt,i)=>{
        const clientUser = clientUsers.find(el => el.userId===appt.client_Id)
        console.log(clientUser)
        return(
        clientUser?<tr key={`appts--${i}`}>
        <td>{appt.date}</td>
        <td>{appt.time}</td>
        <td>{clientUser.user.fullName}</td>
        <td>{clientUser.user.streetAddress}, Nashville, TN-{clientUser.user.zipCode}</td>
        <td><Link to={`/employee/clientview/${appt.client_Id}`}>View Client Details</Link></td>
        </tr>:<tr><td>No appointments found</td></tr>
        )
    })

    
  return (
    <>
    <NavBar/>
    <div className="container">
        <h1>Hello {currentUser.fullName}</h1>
        <h2>Your Appointments</h2>
        {appointments.length>0?<table>
        <tbody>
        {apptlist}
        </tbody>
        </table>:<p>You currently do not have any appointments</p>}
    </div>
    </>
  )
}
