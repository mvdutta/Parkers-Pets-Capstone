
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { NavBar } from "../NavBar/NavBar"
import styles from "./Register.module.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        streetAddress: "",
        zipCode: "",
        phone: "",
        role: ""
        
    })
    const {setLoggedIn} = useContext(UserContext)

    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("parker_user", JSON.stringify(createdUser))
                    setLoggedIn(true)       
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (<>
        <NavBar/>   
        <h1 className={styles.formHeader}>Please Register for Parker's Pet Sitting</h1>
        <div className={styles["form-style-5"]}>
        <form onSubmit={handleRegister}>
        <fieldset>
        <legend><span className={styles["number"]}>1</span> Full Name & Email</legend>
        <input onChange={updateUser} type="text" id="fullName" name="field1" placeholder="Full Name *" required autofocus/>
        <input onChange={updateUser} type="email" id="email" name="field2" placeholder="Email *" required/>    
        </fieldset>
        <fieldset>
        <legend><span className={styles["number"]}>2</span>Street Address, Zip Code & Phone</legend>
        <input onChange={updateUser} type="text" id="streetAddress" name="field3" placeholder="Street Address *" required />
        <input onChange={updateUser} type="text" id="zipCode" name="field4" placeholder="Zip Code *" required/>   
        <input onChange={updateUser} type="text" id="phone" name="field5" placeholder="Phone Number *" required/>   
        </fieldset>
        <div className={styles.checkboxHolder}>
        <label htmlFor="checkbox" className={styles["register-text"]}> I am an employee </label>
    
        <input className={styles.checkbox} onChange={(evt) => {
                        const copy = {...user}
                        copy.role = evt.target.checked?0:1
                        setUser(copy)
                    }}
                        type="checkbox" id="employee" />
        </div>
     
        <input type="submit" value="Submit" />
        </form>
        </div>
       
    </>

    )
}

