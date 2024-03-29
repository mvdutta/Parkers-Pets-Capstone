import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { NavBar } from "../NavBar/NavBar"
import styles from "./AppointmentForm.module.css"
import DateRangePicker from "@wojtekmaj/react-daterange-picker"
import { Link, useNavigate } from "react-router-dom"
import { SmallCard } from "./SmallCard"
import { ButtonToolbar } from "react-bootstrap"
import { API } from "../../constants"

const ZIPDATA = {
    37201: 1,
    37203: 2,
    37204: 3,
    37205: 4,
    37206: 5,
    37207: 6,
    37208: 7,
    37209: 8,
    37210: 9,
    37211: 10,
    37212: 11,
    37214: 12,
    37215: 13,
    37216: 14,
    37217: 15,
    37218: 16,
    37219: 17,
    37220: 18,
    37221: 19,
}

export const AppointmentForm = () => {
    const [dates, setDates] = useState([new Date(), new Date()])
    const [clientUser, setClientUser] = useState({
        id: "",
        userId: "",
        user: {},
    })
    const [pets, setPets] = useState([])
    const [services, setServices] = useState([])
    const [sitters, setSitters] = useState([])
    const [appointment, setAppointment] = useState({
        employee_Id: 0,
        client_Id: 0,
        petId: 0,
        serviceId: 0,
    })

    useEffect(() => {
        const localParkerUser = localStorage.getItem("parker_user")
        const parkerUserObject = JSON.parse(localParkerUser)
        if (parkerUserObject.role !== 1) {
            navigate("/denied")
        }
        const appointmentCopy = {
            ...appointment,
            client_Id: parkerUserObject.id,
        }
        setAppointment(appointmentCopy)

        const fetches = [
            fetch(
                `${API}/clients?userId=${parkerUserObject.id}&_expand=user`
            ).then((res) => res.json()),
            fetch(`${API}/pets?client_Id=${parkerUserObject.id}`).then((res) =>
                res.json()
            ),
            fetch(`${API}/services`).then((res) => res.json()),
        ]
        Promise.all(fetches).then((data) => {
            setClientUser({ ...clientUser, ...data[0][0] })
            setPets(data[1])
            setServices(data[2])
        })
    }, [])

    const handleSearch = async () => {
        const clientZip = clientUser.user.zipCode
        const selectedPet = pets.find((pet) => pet.id === appointment.petId)
        const fetches = [
            fetch(
                `${API}/employeeZipcodes?zipcodeId=${ZIPDATA[clientZip]}&_expand=employee&_expand=zipcode`
            ).then((res) => res.json()),
            fetch(`${API}/users`).then((res) => res.json()),
        ]
        const [sitterData, userData] = await Promise.all(fetches)
        let filteredSitterData = []
        if (selectedPet.medications === 0) {
            filteredSitterData = sitterData.filter(
                (el) =>
                    parseInt(el.employee.petTypeId) ===
                    parseInt(selectedPet.petTypeId)
            )
        } else {
            filteredSitterData = sitterData.filter(
                (el) =>
                    el.employee.medications === 1 &&
                    parseInt(el.employee.petTypeId) ===
                        parseInt(selectedPet.petTypeId)
            )
        }
        if (filteredSitterData.length === 0) {
            window.alert(
                "No pet sitters were found matching these criteria. Please Contact Us"
            )
            return
        }
        filteredSitterData.forEach((el) => {
            const thisUser = userData.find(
                (user) => user.id === el.employee.userId
            )
            el.employee.fullName = thisUser.fullName
            el.employee.email = thisUser.email
            el.employee.phone = thisUser.phone
        })
        setSitters(filteredSitterData)
    }

    const handleClear = () => {
        const clearedAppointment = {
            employee_Id: 0,
            client_Id: 0,
            petId: 0,
            serviceId: 0,
        }
        setAppointment(clearedAppointment)
        setDates([new Date(), new Date()])
        setSitters([])
    }

    const handleSubmit = () => {
        const newAppointment = {
            employee_Id: appointment.employee_Id,
            client_Id: appointment.client_Id,
            petId: appointment.petId,
            serviceId: appointment.serviceId,
            startDate: dates[0].toISOString().split("T")[0],
            endDate: dates[1].toISOString().split("T")[0],
        }
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAppointment),
        }
        fetch(`${API}/appointments`, requestOptions)
            .then((res) => res.json)
            .then(() => {
                navigate("/client/appointments")
            })
    }

    const petOptions = pets.map((pet) => (
        <option key={`pet--${pet.id}`} value={pet.id}>
            {pet.name}
        </option>
    ))
    const serviceOptions = services.map((service) => {
        return (
            <option key={`service--${service.id}`} value={service.id}>
                {service.serviceName} (${service.price})
            </option>
        )
    })

    const foundSitters = sitters.map((el) => (
        <div
            key={`employee--${el.employee.id}`}
            className={
                el.employeeId === appointment.employee_Id
                    ? styles.selectedStyle
                    : ""
            }
        >
            <SmallCard
                imageLink={el.employee.profileImage}
                name={el.employee.fullName}
                email={el.employee.email}
                phone={el.employee.phone}
                bio={el.employee.biography}
                medications={el.employee.medications}
            />
            <Form.Check
                type="checkbox"
                label={`Select ${el.employee.fullName}`}
                checked={el.employeeId === appointment.employee_Id}
                className={styles.checkBox}
                onChange={(e) => {
                    if (e.currentTarget.checked) {
                        const appointmentCopy = {
                            ...appointment,
                            employee_Id: el.employeeId,
                        }
                        setAppointment(appointmentCopy)
                    } else {
                        const appointmentCopy = {
                            ...appointment,
                            employee_Id: 0,
                        }
                        setAppointment(appointmentCopy)
                    }
                }}
            />
        </div>
    ))

    const navigate = useNavigate()

    return (
        <>
            <NavBar />
            <div className="container">
                <h1>Make a Pet Sitting Appointment</h1>
                <div className={`row my-4 ${styles.formHolder}`}>
                    <Form className="my-4">
                        <Form.Group
                            className={StyleSheet.formHolder}
                            controlId="pet"
                        >
                            <Form.Label className={styles.apptText}>
                                Who would you like to make an appointment for?
                            </Form.Label>
                            <Form.Select
                                aria-label="Pet Select"
                                className={styles.optionText}
                                value={appointment.petId}
                                onChange={(e) => {
                                    const appointmentCopy = {
                                        ...appointment,
                                        petId: +e.target.value,
                                        serviceId: 0,
                                    }
                                    const selectedPet = pets.find(
                                        (pet) => pet.id === +e.target.value
                                    )
                                    if (selectedPet.medications === 1) {
                                        const filteredServices =
                                            services.filter((el) =>
                                                [2, 3, 4, 6, 7, 8].includes(
                                                    el.id
                                                )
                                            )
                                        setServices(filteredServices)
                                    }
                                    setAppointment(appointmentCopy)
                                }}
                            >
                                <option>Select a pet</option>
                                {petOptions}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label className={styles.apptText}>
                                Choose the start and end dates
                            </Form.Label>
                            <div className={styles.dateHolder}>
                                <DateRangePicker
                                    className={styles.dateChange}
                                    onChange={setDates}
                                    value={dates}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="pet">
                            <Form.Label className={styles.apptText}>
                                Choose a service from the list below
                            </Form.Label>
                            <Form.Select
                                aria-label="Service Select"
                                className={styles.optionText}
                                value={appointment.serviceId}
                                onChange={(e) => {
                                    const appointmentCopy = {
                                        ...appointment,
                                        serviceId: +e.target.value,
                                    }
                                    setAppointment(appointmentCopy)
                                }}
                            >
                                <option>Select a service</option>
                                {serviceOptions}
                            </Form.Select>
                            <Form.Text className="text-muted">
                                *15-minute visits are not available for pets who
                                need medication
                            </Form.Text>
                        </Form.Group>
                        <ButtonToolbar>
                            <Button
                                variant="outline-light"
                                className={`me-2 ${styles.findButton}`}
                                onClick={handleSearch}
                            >
                                Find Pet Sitters
                            </Button>
                            <Button
                                variant="outline-light"
                                className={`me-2 ${styles.clearButton}`}
                                onClick={handleClear}
                            >
                                Clear Selections
                            </Button>
                        </ButtonToolbar>
                        {sitters.length > 0 && (
                            <div className="mt-4">
                                <Form.Group className="mb-3" controlId="sitter">
                                    <div className={styles.holder}>
                                        <Form.Label
                                            className={styles.matchText}
                                        >
                                            The following pet sitters match your
                                            selections:
                                        </Form.Label>
                                    </div>
                                    <div className="d-flex flex-wrap gap-3">
                                        {foundSitters}
                                    </div>
                                </Form.Group>
                            </div>
                        )}
                    </Form>
                </div>
                <div className="row mt-4">
                    {sitters.length !== 0 && (
                        <div>
                            <Button
                                variant="outline-light"
                                className={styles.submitButton}
                                type="submit"
                                disabled={appointment.employee_Id === 0}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
