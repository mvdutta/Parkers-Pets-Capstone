import logo from './logo.svg';
import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import { AboutUs } from './components/AboutUs/AboutUs';
import { Login } from './components/Login/Login';
import { EmployeeProfile } from './components/EmployeeProfile/EmployeeProfile';
import { Authorized } from './components/Authorized/Authorized';
import { createContext, useEffect, useState } from 'react';
import { ClientProfile } from './components/ClientProfile/ClientProfile';
import { Denied, Page404 } from './components/Page404';
import { Register } from './components/Register/Register';
import { EmployeeProfileForm } from './components/EmployeeProfile/EmployeeProfileForm';
import { ClientProfileForm } from './components/ClientProfile/ClientProfileForm';
import { PetList } from './components/Pets/PetList';
import { PetForm } from './components/Pets/PetForm';
import { EmployeeBioForm } from './components/EmployeeProfile/EmployeeBioForm';
//using contextAPI to create a global state accessible to all components in component tree
export const UserContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
});


export function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(()=>{
    const localParkerUser = localStorage.getItem("parker_user")
    if (localParkerUser){
      setLoggedIn(true)
    }
  },[])
  return (
    <UserContext.Provider value={{loggedIn, setLoggedIn}}>
        <>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/aboutus" element={<AboutUs/>}/>
              <Route path="/denied" element={<Denied/>}/>
              <Route path="*" element={<Page404/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register />} />
              <Route path="/employeeprofile" element={
              <Authorized>
                  <EmployeeProfile/>
              </Authorized>
              }/>
              <Route path="/clientprofile" element={
              <Authorized>
                  <ClientProfile/>
              </Authorized>
              }/>
               <Route path="/employeeprofileform" element={
              <Authorized>
                  <EmployeeProfileForm/>
              </Authorized>
              }/>
              <Route path="/clientprofileform" element={
              <Authorized>
                  <ClientProfileForm/>
              </Authorized>
              }/>
               <Route path="/petList" element={
              <Authorized>
                  <PetList/>
              </Authorized>
              }/>
               <Route path="/petform" element={
              <Authorized>
                  <PetForm/>
              </Authorized>
              }/>
              <Route path="/petform/:petId" element={
              <Authorized>
                  <PetForm/>
              </Authorized>
              }/>
            <Route path="/employeebioform" element={
              <Authorized>
                  <EmployeeBioForm/>
              </Authorized>
              }/>
              
            </Routes>
        </>
   </UserContext.Provider>
  );
}


