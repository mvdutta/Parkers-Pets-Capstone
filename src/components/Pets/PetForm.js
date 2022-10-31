import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar"
import styles from "../EmployeeProfile/EmployeeProfileForm.module.css"
import { UserContext } from "../../App"

export const PetForm = () => {

    const [pet, setPet] = useState({
        name: "",
        age: "",
        color:"",
        breedSpecies: "",
        medications: false,
        sex: "",
        instructions: "",
        vetInfo:"",
        image:"",
        clientId: "",
        petTypeId:""
    })
    const {petId} = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        const localParkerUser = localStorage.getItem("parker_user")
        const parkerUserObject = JSON.parse(localParkerUser)
        const petCopy = {...pet}
        petCopy.clientId = parkerUserObject.id
        if (petId) {
        petCopy.id = petId
        }
        setPet(petCopy)
        console.log(petId)
    }, [])

return (<>

    <NavBar/>  
    <h1>Pet Form</h1>
            {/* <h1 className={styles.formHeader}>Your Pet's Profile</h1>
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

            <input type="text" id="phone" name="field5" placeholder="Phone Number (xxx-xxx-xxxx) *" required value={user.phone}
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
            <button className={styles.deleteButton} 
        onClick={()=> {
            const confirmed = window.confirm("Are you sure you want to delete your profile?")
            if(!confirmed) return
            fetch(`http://localhost:8088/users/${parkerUserObject.id}`, {
                method: "DELETE"
            })
            .then(() => {
                setLoggedIn(false)
                localStorage.clear()
                navigate("/")
            })
        }} 
    >Delete Profile</button>
            </div>     */}
        



</>
)






}