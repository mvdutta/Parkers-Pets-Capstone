import styles from "./EmployeeProfileForm.module.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar"

export const EmployeeProfileForm = () => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        streetAddress: "",
        zipCode: "",
        phone: "",
        role: ""       
    })

    const [feedback, setFeedback] = useState("")
    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    let navigate = useNavigate()

    const localParkerUser = localStorage.getItem("parker_user")
    const parkerUserObject = JSON.parse(localParkerUser)

    useEffect(() => {
        fetch(`http://localhost:8088/users/${parkerUserObject.id}`)
        .then(res => res.json())
        .then((data) => {
            setUser(data)
        })
    }, [])

    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()
          return fetch(`http://localhost:8088/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json()) 
            .then(() => {
                setFeedback("Employee profile successfully saved")
                navigate("/employeeprofile")
            })
            }
            const greeting = user.fullName[user.fullName.length-1] === 's' ? `${user.fullName}' Profile`:`${user.fullName}'s Profile`
        return ( <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
            </div>
            <NavBar/>  
            <h1 className={styles.formHeader}>{greeting}</h1>
            <div className={styles["form-style-5"]}>
            <form>
            <fieldset>
            <legend><span className={styles["number"]}>1</span> Full Name & Email</legend>
            <input type="text" id="fullName" name="field1" placeholder="Full Name *" required value={user.fullName}
                onChange={
                    (evt) => {
                        const copy = {...user}
                        copy.fullName = evt.target.value
                        setUser(copy)
                    }
                }   
            />

            <input type="email" id="email" name="field2" placeholder="Email *" required value={user.email}
                onChange={
                    (evt) => {
                        const copy = {...user}
                        copy.email = evt.target.value
                        setUser(copy)
                    }
                }
            />    
            </fieldset>
            <fieldset>
            <legend><span className={styles["number"]}>2</span>Street Address, Zip Code & Phone</legend>
            <input type="text" id="streetAddress" name="field3" placeholder="Street Address *" required value={user.streetAddress}
                onChange={
                    (evt) => {
                        const copy = {...user}
                        copy.streetAddress = evt.target.value
                        setUser(copy)
                    }
                }
            />

            <input type="text" id="zipCode" name="field4" placeholder="Zip Code *" required value={user.zipCode}
                onChange={
                    (evt) => {
                        const copy = {...user}
                        copy.streetAddress = evt.target.value
                        setUser(copy)
                    }
                }
            />   

            <input type="text" id="phone" name="field5" placeholder="Phone Number *" required value={user.phone}
                onChange={
                    (evt) => {
                        const copy = {...user}
                        copy.phone = evt.target.value
                        setUser(copy)
                    }
                }
            />   
            </fieldset>
            <input type="submit" value="Save Changes" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} />
            </form>
            </div>    
        </>
        )
}