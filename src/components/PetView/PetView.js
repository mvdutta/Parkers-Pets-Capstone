import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { NavBar } from "../NavBar/NavBar";
import styles from "./PetView.module.css"

const PetView = () => {

    const [pet, setPet] = useState({
        name: "",
        age: "",
        color: "",
        breedSpecies: "",
        medications: 0,
        sex: "",
        instructions: "",
        vetInfo: "",
        image: "",
        client_Id: "",
        petTypeId: "",
      });
      const { petId } = useParams();
      let navigate = useNavigate();

    
      useEffect(() => {
        const localParkerUser = localStorage.getItem("parker_user");
        const parkerUserObject = JSON.parse(localParkerUser);
        const petCopy = { ...pet };
        petCopy.client_Id = parkerUserObject.id;
        setPet(petCopy);
      }, []);
    

      useEffect(() => {
          fetch(`http://localhost:8088/pets/${petId}?_expand=petType`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
              const petCopy = { ...pet, ...data };
              setPet(petCopy);
            });
      }, []);
    
  return (
    <>
        <NavBar/>
        <Link to={`/employee/clientview/${pet.client_Id}`}>Back to Client</Link>
        <div>
            <div className={styles["imageholder"]}><img src={pet.image} alt=""></img></div>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Pet Details</th>
                </tr>

                </thead>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{pet.name}</td>
                </tr>
                <tr>
                    <td>Age</td>
                    <td>{pet.age}</td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>{pet.petTypeId}</td>
                </tr>
                <tr>
                    <td>Color</td>
                    <td>{pet.color}</td>
                </tr>
                <tr>
                    <td>Breed/Species</td>
                    <td>{pet.breedSpecies}</td>
                </tr>
                <tr>
                    <td>Medications</td>
                    <td>{pet.medications===1?"Yes":"No"}</td>
                </tr>
                <tr>
                    <td>Sex</td>
                    <td>{pet.sex}</td>
                </tr>
                <tr>
                    <td>Instructions</td>
                    <td>{pet.instructions}</td>
                </tr>
                <tr>
                    <td>Vet Information</td>
                    <td>{pet.vetInfo}</td>
                </tr>
            </tbody>
            </table> 
        </div>
    </>
  )
}

export default PetView