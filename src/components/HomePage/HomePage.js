import React, { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { API } from "../../constants"
import { NavBar } from "../NavBar/NavBar"
import Spinner from 'react-bootstrap/Spinner'
import "./HomePage.css"


  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

export const HomePage = () => {
    const [email, setEmail] = useState("")
    const [currentUser, setCurrentUser] = useState({})
    const [showSpinner, setShowSpinner] = useState(false);
    const { loggedIn, setLoggedIn } = useContext(UserContext)
    const navigate = useNavigate()


    useEffect(() => {
        if (loggedIn) {
            const localParkerUser = localStorage.getItem("parker_user")
            setCurrentUser(JSON.parse(localParkerUser))
        } else {
            setCurrentUser({})
        }
    }, [loggedIn])

    const login = (emailAddress) => {
        setShowSpinner(true);
         return fetch(`${API}/users?email=${emailAddress}`)
           .then((res) => res.json())
           .then((foundUsers) => {
             if (foundUsers.length === 1) {
               const foundUser = foundUsers[0];
               localStorage.setItem("parker_user", JSON.stringify(foundUser));
               setCurrentUser(foundUser);
               setLoggedIn(true);
               return foundUser;
             } else {
               window.alert("Invalid login");
             }
           })
           .then((foundUser) => {
             if (!foundUser) {
               return navigate("/");
             }
             let whichProfile = "";
             if (foundUser.role === 1) {
               whichProfile = "/clientprofile";
             } else {
               whichProfile = "/employeeprofile";
             }
             setShowSpinner(false)
             navigate(whichProfile);
           });

    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (email === ""){
            window.alert("Please enter a valid email")
            return
        }
        login(email)   
    }

    const handleGuestLogin = (e) => {
        e.preventDefault()
        const address = "guest@email.com"
        setEmail(address)
        login(address)
    }

    function playVideo(e) {
        const vid = e.currentTarget
        vid.play()
        vid.classList.remove("fading")
        setTimeout(() => {
            vid.classList.add("fading")
        }, (vid.duration / vid.playbackRate - 1) * 1000)
    }
    const linkStyle = {
        color: "white",
        size: "14px",
    }

    const handleClick = (evt) => {
        if (evt.target.id === "dogIcon") {
            navigate("/dogservices")
        }
    }
    return (
      <>
        <div>
          <NavBar />
          <video
            preload="true"
            autoPlay
            playsInline
            loop
            muted
            id="video"
            onCanPlay={(e) => {
              playVideo(e);
            }}
            onEnded={(e) => {
              playVideo(e);
            }}
          >
            <source src="cat-video2.mp4" type="video/mp4" />
          </video>
          <div className="overlay"></div>
          <div className="homepage-header">
            <h1 className="header">Parker's Pet Sitting</h1>
            <p>Customizable and Trustworthy Care for Your Pet</p>
          </div>
          <div className={loggedIn ? `login-holder hidden` : `login-holder`}>
            <div className="login-container">
              <h2 className="login-header">Sign In</h2>
              <form onSubmit={handleLogin}>
                <div>
                  <input
                    className="email-input"
                    type="email"
                    value={email}
                    placeholder="enter your email"
                    onChange={(evt) => setEmail(evt.target.value)}
                  ></input>
                </div>
                <button className="login-button" type="submit">
                  Sign In
                </button>
                <div>{showSpinner ? (
                  <Spinner animation="border" variant="muted" />
                ) : (
                  ""
                )}
                </div>
              </form>
              <p className="login-text">Don't have an account yet?</p>
              <p className="login-text">
                <Link to="/register" style={linkStyle}>
                  Register Here
                </Link>
              </p>
              <button
                className="guest-button"
                type="submit"
                onClick={(e) => {
                  handleGuestLogin(e);
                }}
              >
                Guest Sign In
              </button>
            </div>
          </div>
        </div>
        <div className="divider-wrapper">
          <div className="serviceSection">
            <h1 className="servicesHeader">Our Services</h1>
            <h2>
              We offer daily pet sitting in your home with simple and
              straightforward pricing.
            </h2>
            <div className="servicesContent">
              <Link to="/dogservices" className="serviceLink">
                <div className="serviceIconArea">
                  <img
                    src="/poodle-icon.png"
                    className="serviceIcon"
                    alt="services for dogs"
                  />
                  <p>Dogs</p>
                </div>
              </Link>
              <Link to="/catservices" className="serviceLink">
                <div className="serviceIconArea">
                  <img
                    src="/cat-icon2.png"
                    className="serviceIcon"
                    alt="services for cats"
                  />
                  <p>Cats</p>
                </div>
              </Link>
              <Link to="/otherpetservices" className="serviceLink">
                <div className="serviceIconArea">
                  <img
                    src="/hamster-icon.png"
                    className="serviceIcon"
                    alt="services for other pets"
                  />
                  <p>Other Pets</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
}
