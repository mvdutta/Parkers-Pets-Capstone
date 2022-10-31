import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar"
import styles from "../EmployeeProfile/EmployeeProfileForm.module.css"
import { UserContext } from "../../App"
import { type } from "@testing-library/user-event/dist/type"

export const PetForm = () => {

    const [pet, setPet] = useState({
        name: "",
        age: "",
        color:"",
        breedSpecies: "",
        medications: 0,
        sex: "",
        instructions: "",
        vetInfo:"",
        image:"",
        clientId: "",
        petTypeId:""
    })
    const [petTypes, setPetTypes] = useState([])
    const {petId} = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        const localParkerUser = localStorage.getItem("parker_user")
        const parkerUserObject = JSON.parse(localParkerUser)
        const petCopy = {...pet}
        petCopy.clientId = parkerUserObject.id
        setPet(petCopy)
    }, [])

    useEffect(()=>{
        fetch(`http://localhost:8088/petTypes`)
        .then(res => res.json())
        .then((data) => {
            setPetTypes(data)
        })
    }, [])

    useEffect(() => {
        if (petId) {
            fetch(`http://localhost:8088/pets/${petId}`)
            .then(res => res.json())
            .then((data) => {
                const petCopy = {...pet,...data}
                setPet(petCopy)
            })   
        }

    }, [])

    const petOptions =   petTypes.map((petType) => {
        return  <option 
        key={petType.petTypeId} 
        value={petType.petTypeId}
        // selected = {petType.petTypeId===pet.petTypeId}
        >
            {petType.type}
        </option>
    })
const handleSaveButtonClick = (clickEvent) => {
    clickEvent.preventDefault()
    if(pet.id) {
        return fetch(`http://localhost:8088/pets/${pet.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pet)
        })
        .then(res => res.json())
        .then(()=>{
            window.alert(`${pet.name}'s data has been saved!`)
        }) 
    } else {
        fetch(`http://localhost:8088/pets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pet)
        })
        .then(res => res.json())
        .then((data)=>{
            fetch(`http://localhost:8088/clientPet`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    clientId: pet.clientId,
                    petId: data.id
                })
            })
            .then(res => res.json())
            .then(navigate("/petlist"))
        }) 
    }
}

return (<>
<NavBar/>
            <h1 className={styles.formHeader}>Your Pet's Profile</h1>
            <div className={styles["form-style-5"]}>
            <form onSubmit= {(clickEvent) => handleSaveButtonClick(clickEvent)} >
            <fieldset>
            <legend><span className={styles["number"]}>1</span> Your Pet's Info</legend>
            <input type="text" id="name" name="field1" placeholder="Name *" required value={pet.name}
                onChange={
                    (evt) => {
                        const copy = {...pet}
                        copy.name = evt.target.value
                        setPet(copy)
                    }
                }   
            />
            <input type="number" id="age" name="field1" placeholder="Age *" required value={pet.age}
                onChange={
                    (evt) => {
                        const copy = {...pet}
                        copy.age = evt.target.value
                        setPet(copy)
                    }
                }   
            />

            <input type="text" id="color" name="field3" placeholder="Color(s) *" required value={pet.color}
                onChange={
                    (evt) => {
                        const copy = {...pet}
                        copy.color = evt.target.value
                        setPet(copy)
                    }
                }
            />    
            <select id="petType" name="field4" value={pet.petTypeId}
            onChange={(evt)=>{
                        const copy = {...pet}
                        copy.petTypeId = evt.target.value
                        setPet(copy)
                    }}>
           {petOptions}
            </select>
            <input type="text" id="breedSpecies" name="field5" placeholder="breed/species or description *" required value={pet.breedSpecies}
                onChange={
                    (evt) => {
                        const copy = {...pet}
                        copy.breedSpecies = evt.target.value
                        setPet(copy)
                    }
                }
            />   
            <input type="text" id="image" name="field6" placeholder="image url *" required value={pet.image}
                onChange={
                    (evt) => {
                        const copy = {...pet}
                        copy.image = evt.target.value
                        setPet(copy)
                    }
                }
            />                 
            </fieldset>
            <fieldset>
            <legend><span className={styles["number"]}>2</span>Your Pet's Care</legend>
            <textarea id="vetInfo" name="field7" placeholder="Vet Info *" required value={pet.vetInfo}
                onChange={
                    (evt) => {
                        const copy = {...pet}
                        copy.vetInfo = evt.target.value
                        setPet(copy)
                    }
                }>
            </textarea>

            <textarea id="instructions" name="field8" placeholder="Care Notes/Instructions *" value={pet.instructions}
                onChange={
                    (evt) => {
                        const copy = {...pet}
                        copy.instructions = evt.target.value
                        setPet(copy)
                    }
                }>
            </textarea>
            <div>
            <label htmlFor="checkbox" className={styles["register-text"]}>My pet needs medication</label> 
            <input className={styles.checkbox} onChange={(evt) => {
                        const copy = {...pet}
                        copy.medications = evt.target.checked?1:0
                        setPet(copy)
                    }}
                        type="checkbox" 
                        id="medications" 
                        checked= {pet.medications===1?true:false}
                        />
            </div> 
            </fieldset>
          
            <input type="submit" value="Save Changes"  />
            </form>

            </div>     
    
</>
)






}