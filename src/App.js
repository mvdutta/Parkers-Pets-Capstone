import logo from "./logo.svg"
import "./App.css"
import { HomePage } from "./components/HomePage/HomePage"
import { Route, Routes } from "react-router-dom"
import { AboutUs } from "./components/AboutUs/AboutUs"
import { EmployeeProfile } from "./components/EmployeeProfile/EmployeeProfile"
import { Authorized } from "./components/Authorized/Authorized"
import { createContext, useEffect, useState } from "react"
import { ClientProfile } from "./components/ClientProfile/ClientProfile"
import { Denied, Page404 } from "./components/Page404"
import { Register } from "./components/Register/Register"
import { EmployeeProfileForm } from "./components/EmployeeProfile/EmployeeProfileForm"
import { ClientProfileForm } from "./components/ClientProfile/ClientProfileForm"
import { PetList } from "./components/Pets/PetList"
import { PetForm } from "./components/Pets/PetForm"
import { EmployeeBioForm } from "./components/EmployeeProfile/EmployeeBioForm"
import PetView from "./components/PetView/PetView"
import { OurTeam } from "./components/OurTeam/OurTeam"
import { ClientView } from "./components/ClientView/ClientView"
import { EmployeeAppointments } from "./components/EmployeeAppointments/EmployeeAppointments"
import { ContactUs } from "./components/ContactUs/ContactUs"
import { ClientAppointments } from "./components/ClientAppointments/ClientAppointments"
import { EmployeeView } from "./components/EmployeeView/EmployeeView"
import { AppointmentForm } from "./components/AppointmentForm/AppointmentForm"
import { DogServices } from "./components/DogServices/DogServices"
import { CatServices } from "./components/CatServices/CatServices"
import { OtherPetServices } from "./components/OtherPetServices/OtherPetServices"
//using contextAPI to create a global state accessible to all components in component tree
export const UserContext = createContext({
    loggedIn: false,
    setLoggedIn: () => {},
})

export function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        const localParkerUser = localStorage.getItem("parker_user")
        if (localParkerUser) {
            setLoggedIn(true)
        }
    }, [])
    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
            <>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/ourteam" element={<OurTeam />} />
                    <Route path="/dogservices" element={<DogServices />} />
                    <Route path="/catservices" element={<CatServices />} />
                    <Route
                        path="/otherpetservices"
                        element={<OtherPetServices />}
                    />
                    <Route path="/denied" element={<Denied />} />
                    <Route path="*" element={<Page404 />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/employeeprofile"
                        element={
                            <Authorized>
                                <EmployeeProfile />
                            </Authorized>
                        }
                    />
                    <Route
                        path="/clientprofile"
                        element={
                            <Authorized>
                                <ClientProfile />
                            </Authorized>
                        }
                    />
                    <Route
                        path="/employeeprofileform"
                        element={
                            <Authorized>
                                <EmployeeProfileForm />
                            </Authorized>
                        }
                    />
                    <Route
                        path="/clientprofileform"
                        element={
                            <Authorized>
                                <ClientProfileForm />
                            </Authorized>
                        }
                    />
                    <Route
                        path="/petList"
                        element={
                            <Authorized>
                                <PetList />
                            </Authorized>
                        }
                    />
                    <Route
                        path="/petform"
                        element={
                            <Authorized>
                                <PetForm />
                            </Authorized>
                        }
                    />
                    <Route
                        path="/petform/:petId"
                        element={
                            <Authorized>
                                <PetForm />
                            </Authorized>
                        }
                    />
                    <Route
                        path="/employeebioform"
                        element={
                            <Authorized>
                                <EmployeeBioForm />
                            </Authorized>
                        }
                    />
                    <Route
                        path="employee/petview/:petId"
                        element={
                            <Authorized>
                                <PetView />
                            </Authorized>
                        }
                    />

                    <Route
                        path="employee/clientview/:clientId"
                        element={
                            <Authorized>
                                <ClientView />
                            </Authorized>
                        }
                    />
                    <Route
                        path="client/employeeview/:employeeId"
                        element={
                            <Authorized>
                                <EmployeeView />
                            </Authorized>
                        }
                    />
                    <Route
                        path="/employee/appointments"
                        element={
                            <Authorized>
                                <EmployeeAppointments />
                            </Authorized>
                        }
                    />
                    <Route
                        path="/client/appointments"
                        element={
                            <Authorized>
                                <ClientAppointments />
                            </Authorized>
                        }
                    />
                    <Route
                        path="/client/appointment"
                        element={
                            <Authorized>
                                <AppointmentForm />
                            </Authorized>
                        }
                    />
                </Routes>
            </>
        </UserContext.Provider>
    )
}
