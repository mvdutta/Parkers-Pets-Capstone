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
    // const [user, setUser] = useState[{}]

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
        console.log(petType)
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
        clickEvent.preventDefault()
          return fetch(`http://localhost:8088/employees/${employee.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            })
            .then(res => res.json()) 
            .then(() => {
                setFeedback("Profile successfully saved")
            })
            }
            const greeting =`Hello ${employee?.user?.fullName}`
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
              required
              value={employee.biography}
              onChange={(evt) => {
                const copy = { ...employee };
                copy.biography = evt.target.value;
                setEmployee(copy);
              }}
            ></textarea>
            </fieldset>
            <fieldset>
            <legend><span className={styles["number"]}>2</span> Street Address, Zip Code & Phone</legend>
            <label htmlFor="petType">What Type of Pet Do You Care For?</label>
            <select
              id="petType"
              name="field3"
              value={employee.petTypeId}
              onChange={(evt) => {
                const copy = { ...employee };
                copy.petTypeId = evt.target.value;
                setEmployee(copy);
              }}
            >
                {/* <option>Dog</option>
                <option>Cat</option> */}
                {petOptions}
            </select>
            </fieldset>


            </form>
            </div>


        {/*
            
            <label htmlFor="zipCode">Zip Code</label>
            <input type="text" id="zipCode" name="field4" required value={user.zipCode}
                onChange={
                    (evt) => {
                        const copy = {...user}
                        copy.zipCode = evt.target.value
                        setUser(copy)
                    }
                }
            />   
             <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" name="field5" required value={user.phone}
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
            </div>     */}
           
        </>
        )
}
