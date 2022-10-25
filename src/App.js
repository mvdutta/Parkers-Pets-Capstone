import logo from './logo.svg';
import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import { AboutUs } from './components/AboutUs/AboutUs';
export function App() {
  return (
   <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        
      </Routes>
   </>
  );
}


