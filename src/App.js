import logo from './logo.svg';
import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import { AboutUs } from './components/AboutUs/AboutUs';
import { Login } from './components/Login/Login';
import { MyProfile } from './components/MyProfile/MyProfile';
import { Authorized } from './components/Authorized/Authorized';
export function App() {
  return (
   <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/myprofile" element={
        <Authorized>
            <MyProfile/>
        </Authorized>
        }/>
        
      </Routes>
   </>
  );
}


