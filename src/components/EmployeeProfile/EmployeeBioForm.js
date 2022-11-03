import styles from "./EmployeeProfileForm.module.css"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar"
import { UserContext } from "../../App"

export const EmployeeBioForm = () => {
    const [employee, setEmployee] = useState({
        userId: "",
        biography: "",
        medications: 0,
        profileImage: "",
        petTypeId: "",
        user:{id:"", fullName:"", email:"", streetAddress:"", zipCode:"", phone:"", role:0},
        petType:{id: "", type:"", petId: ""}
    })

    const [petTypes, setPetTypes] = useState([])
    
    const {loggedIn, setLoggedIn} = useContext(UserContext)


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
        fetch(`http://localhost:8088/employees/${parkerUserObject.id}?_expand=user&_expand=petType`)
        .then(res => res.json())
        .then((data) => {
            setEmployee(data)
        })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/petTypes`)
          .then((res) => res.json())
          .then((data) => {
            setPetTypes(data);
          });
      }, []);

      const petOptions = petTypes.map((petType) => {
        return (
          <option
            key={`petOption--${petType.petId}`}
            value={petType.petId}
          >
            {petType.type}
          </option>
        );
      });

    const handleSaveButtonClick = (clickEvent) => {
        const updatedUser = employee.user
        const updatedEmployee = {...employee}
        delete updatedEmployee.user
        delete updatedEmployee.petType
        clickEvent.preventDefault()
          return fetch(`http://localhost:8088/employees/${employee.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedEmployee)
            })
            .then(res => res.json()) 
            .then(() => {
                fetch(`http://localhost:8088/users/${updatedUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
            })
            .then(res => res.json()) 
            })
            .then(() => {
                setFeedback("Biography successfully saved")
            })
            }
            const greeting = employee.user.fullName[employee.user.fullName.length-1] === 's' ? `${employee.user.fullName}' Bio`:`${employee.user.fullName}'s Bio`
        return ( <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
            </div>
            <NavBar/>  
            <h1 className={styles.formHeader}>{greeting}</h1>
           <div className={styles["form-style-5"]}>
            <img className={styles.bioImage}src={employee.profileImage}/>
         
            <form>
            <fieldset>
            <legend><span className={styles["number"]}>1</span> My Name, Bio & Photo</legend>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" name="field1" required value={employee.user.fullName}
                onChange={
                    (evt) => {
                        const copy = {...employee}
                        copy.user.fullName = evt.target.value
                        setEmployee(copy)
                    }
                }   
            />
            <label htmlFor="Biography">My Biography</label>
            <textarea
              id="biography"
              name="field2"
              rows="10"
              required
              value={employee.biography}
              onChange={(evt) => {
                const copy = { ...employee };
                copy.biography = evt.target.value;
                setEmployee(copy);
              }}
            ></textarea>
             <label htmlFor="image">Profile Photo URL</label>
            <input type="text" id="profileImage" name="field4" required value={employee.profileImage}
                onChange={
                    (evt) => {
                        const copy = {...employee}
                        copy.profileImage = evt.target.value
                        setEmployee(copy)
                    }
                }
            />  
            </fieldset>
            <fieldset>
            <legend><span className={styles["number"]}>2</span> Pets & Area I Serve</legend>
            <label htmlFor="petType">Type of Pet I Specialize In</label>
            <select
              id="petType"
              name="field3"
              value={employee.petTypeId}
              onChange={(evt) => {
                const copy = { ...employee };
                copy.petTypeId = +evt.target.value;
                setEmployee(copy);
              }}
            >
                {petOptions}
            </select>
            <label htmlFor="phone">Zip Code I Serve</label>
            <input type="text" id="phone" name="field5" required value={employee.user.zipCode}
                onChange={
                    (evt) => {
                        const copy = {...employee}
                        copy.user.zipCode = evt.target.value
                        setEmployee(copy)
                    }
                }
            />  
             <div className={styles.checkboxHolder}>
              <label htmlFor="checkbox" className={styles["register-text"]}>
                I can administer medications
              </label>
              <input
                className={styles.checkbox}
                onChange={(evt) => {
                  const copy = { ...employee };
                  copy.medications = evt.target.checked ? 1 : 0;
                  setEmployee(copy);
                }}
                type="checkbox"
                id="medications"
                checked={employee.medications === 1 ? true : false}
              />
            </div>
            </fieldset>
            <input type="submit" value="Save Changes" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} />

            </form>
            </div>
           
        </>
        )
}