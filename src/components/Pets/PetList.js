import { useEffect, useState } from "react"
import { NavBar } from "../NavBar/NavBar"
import { PetCard } from "../PetCard/PetCard"
import styles from "./pets.module.css"

export const PetList = () => {
    const [pets, setPets] = useState([])

    const localParkerUser = localStorage.getItem("parker_user")
    const parkerUserObject = JSON.parse(localParkerUser)

    useEffect(
        () => {
            fetch (`http://localhost:8088/clientPet?_expand=pet&clientId=${parkerUserObject.id}`)
                .then(res => res.json())
                .then((data) => {
                    setPets(data)
                })
        },[]
    )

    const makeNameString = (names) =>{
        let namestring = ""
        if (names.length===1) {
            namestring = "Your pet: " +names[0]
        }
        if (names.length ===2){
            namestring = "Your pets: "+names.join(" and ")
        }
        if (names.length >2){
            const last = names[names.length-1]
            const allButLast = names.slice(0, names.length-1)
            namestring="Your pets: " +allButLast.join(", ")+" and "+last
    
        }
        return namestring
    }

    const petNamelist = makeNameString(pets.map(pet=>pet.pet.name))
    const petCards = pets.map(pet => <PetCard
        name={pet.pet.name} 
        breed={pet.pet.breedSpecies}
        age={pet.pet.age}
        linkTo="/clientprofileform"
        image={pet.pet.image}
      />)

    return (<>
    <NavBar/>
    <h1 className={styles.welcomeMessage}>{petNamelist}</h1>
    <div className={styles.petCardHolder}>{petCards}
    </div>
    </>
    )
}