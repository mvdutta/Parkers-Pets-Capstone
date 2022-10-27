import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../NavBar/NavBar'
import "./HomePage.css"

export const HomePage = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("parker_user", JSON.stringify({
                        id: user.id,
                        role: user.role
                    }))
                    console.log(user)
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    function playVideo(e) {
        e.play();
        e.classList.remove('fading');
        setTimeout(() => {
            e.classList.add('fading');
        }, (e.duration / e.playbackRate - 1) * 1000)
    } 
  return (<>
    <div>
        <NavBar/>
     
        <video controls preload="true" autoPlay playsInline loop muted id='video' onCanPlay={(e)=>{playVideo(e)}} onEnded={(e)=>{playVideo(e)}}>
            <source src = 'https://player.vimeo.com/external/515948828.sd.mp4?s=14b4f5fa6010a439ad44da0954c4cbc694e00520&profile_id=164&oauth2_token_id=57447761' type='video/mp4'/>
        </video>   
        <div className='overlay'></div>
        <div className='homepage-header'>
        <h1>Parker's Pet Sitting</h1>
        <p>Customizable and Trustworthy Care for Your Pet</p>
        </div>
        <p>Client Login</p>
        <input type="email" value={email} onChange={evt => setEmail(evt.target.value)}></input>
        <button onClick={handleLogin}>login</button>
    </div>
    <div className='divider-wrapper'>
    <div className="custom-shape-divider-top-1666820762">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
    </svg>
</div>
    </div>
      
        </>
  )
}
