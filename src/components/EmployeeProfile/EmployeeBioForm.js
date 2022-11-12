import styles from "./EmployeeProfileForm.module.css"
import { useEffect, useState } from "react"
import { NavBar } from "../NavBar/NavBar"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from "react-bootstrap";

export const EmployeeBioForm = () => {

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);

    const [employee, setEmployee] = useState({
        userId: "",
        biography: "",
        medications: 0,
        profileImage: "",
        petTypeId: "",
        user: {
            id: "",
            fullName: "",
            email: "",
            streetAddress: "",
            zipCode: "",
            phone: "",
            role: 0,
        },
        petType: { id: "", type: "", petId: "" },
    })

    const [petTypes, setPetTypes] = useState([])
    const [enteredZips, setEnteredZips] = useState("")
    const [zipObjects, setZipObjects] = useState([])

    const [feedback, setFeedback] = useState("")
    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000)
        }
    }, [feedback])



    const localParkerUser = localStorage.getItem("parker_user")
    const parkerUserObject = JSON.parse(localParkerUser)

    useEffect(()=>{
        const fetches = [
            fetch(`http://localhost:8088/employees?userId=${parkerUserObject.id}&_expand=user&_expand=petType`),
            fetch(`http://localhost:8088/petTypes`),
            fetch(`http://localhost:8088/zipcodes`),
            fetch(`http://localhost:8088/employeeZipcodes?employeeId=${parkerUserObject.id}&_expand=zipcode`)
        ]
        Promise.all(fetches)
        .then((res) => res.map(el=>el.json()))//response.json() must be done to each element of the returned array
        .then((data)=>{
            data[0].then(x=>{
                setEmployee(x[0])
            })
            data[1].then(x=>{
                setPetTypes(x)
            })
            data[2].then(x=>{
                setZipObjects(x)
            })
            data[3].then(x=>{
                const curZips = x.length===0? "" : x.map(el=>el.zipcode.zip).sort().join(", ")
                setEnteredZips(curZips)
            })
        })
    }, [])

    const petOptions = petTypes.map((petType) => {
        return (
            <option key={`petOption--${petType.petId}`} value={petType.petId}>
                {petType.type}
            </option>
        )
    })

    const makeZipPostRequests = async (newZips) =>{

        const data= await fetch(`http://localhost:8088/employeeZipcodes?employeeId=${parkerUserObject.id}&_expand=zipcode`)
        const zipdata = await data.json()
        console.log(zipdata)
        const curZips = zipdata.map((el) => el.zipcode.zip)
        newZips.sort()
        curZips.sort()
        if (JSON.stringify(newZips)===JSON.stringify(curZips)){
            return []
        }
        //make delete requests
        const deletes = []
        for (let zipObject of zipdata){
            const zipcodeId = zipObjects.find(el=>el.zip===zipObject.zipcode.zip).id
            console.log(zipcodeId)
            const deleteRequest = fetch(`http://localhost:8088/employeeZipcodes/${zipObject.id}`,  { method: 'DELETE' })
            deletes.push(deleteRequest)
        }
        const deletePromises = Promise.all(deletes)
        //make post requests
        const adds = []
        for (let zip of [...newZips]){
            const zipcodeId = zipObjects.find(el=>el.zip===zip).id
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employeeId:  parkerUserObject.id, zipcodeId})
            };
            const postRequest = fetch('http://localhost:8088/employeeZipcodes', requestOptions)
            adds.push(postRequest)
        }
        const addPromises = Promise.all(adds)
        return deletePromises.then(()=>addPromises)
    
    }

    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()
        const reg = /^\d{5}(?:,\s*\d{5})+$/
        const reg1 = /^\d{5}$/
        if (!(reg.test(enteredZips.trim()) || reg1.test(enteredZips.trim()))) {
            window.alert("Please enter 5 digit zip codes separated by commas")
            return
        }
        let enteredZipList = enteredZips.split(",").map((el) => +el.trim())
        enteredZipList = [...new Set(enteredZipList)]
        const zipList = zipObjects.map((el) => el.zip)
        for (let enteredZip of enteredZipList) {
            if (!zipList.includes(enteredZip)) {
                window.alert(`We do not currently serve ${enteredZip}`)
                return
            }
        }
        const zipPostRequests = makeZipPostRequests(enteredZipList)

        if (employee.petTypeId === "") {
            window.alert("A pet type must be selected")
            return
        }
        const updatedUser = employee.user
        const updatedEmployee = { ...employee }
        delete updatedEmployee.user
        delete updatedEmployee.petType

        const fetchArray = [
            fetch(`http://localhost:8088/employees/${employee.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEmployee),
            }),
            fetch(`http://localhost:8088/users/${updatedUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            }),
            zipPostRequests
        ]

        Promise.all(fetchArray)
            .then(() => {
                setFeedback("Biography successfully saved")
                localStorage.setItem("parker_user", JSON.stringify(updatedUser))
            })
    }
    const greeting =
        employee.user.fullName[employee.user.fullName.length - 1] === "s"
            ? `${employee.user.fullName}' Bio`
            : `${employee.user.fullName}'s Bio`
    
    const zipTable = zipObjects.map(el => {
        return (
            <tr key={`table--${el.id}`}>
                <td>{el.zip}</td>
                <td>{el.location}</td>
            </tr>
        )

    })

    const updateZips = (evt) => {
        setEnteredZips(evt.target.value)
    }
    return (
        <>
            <div
                className={`${
                    feedback.includes("Error") ? "error" : "feedback"
                } ${feedback === "" ? "invisible" : "visible"}`}
            >
                {feedback}
            </div>
            <NavBar />
            <h1 className={styles.formHeader}>{greeting}</h1>
            <div className={styles["form-style-5"]}>
                <img
                    className={styles.bioImage}
                    src={
                        employee.profileImage === ""
                            ? "/generic_user.png"
                            : employee.profileImage
                    }
                    alt=""
                />

                <form>
                    <fieldset>
                        <legend>
                            <span className={styles["number"]}>1</span> My Name,
                            Bio & Photo
                        </legend>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="field1"
                            required
                            value={employee.user.fullName}
                            onChange={(evt) => {
                                const copy = { ...employee }
                                copy.user.fullName = evt.target.value
                                setEmployee(copy)
                            }}
                        />
                        <label htmlFor="Biography">My Biography</label>
                        <textarea
                            id="biography"
                            name="field2"
                            rows="8"
                            required
                            value={employee.biography}
                            onChange={(evt) => {
                                const copy = { ...employee }
                                copy.biography = evt.target.value
                                setEmployee(copy)
                            }}
                        ></textarea>
                        <label htmlFor="image">Profile Photo URL</label>
                        <input
                            type="text"
                            id="profileImage"
                            name="field4"
                            required
                            value={employee.profileImage}
                            onChange={(evt) => {
                                const copy = { ...employee }
                                copy.profileImage = evt.target.value
                                setEmployee(copy)
                            }}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            <span className={styles["number"]}>2</span> Pets &
                            Area I Serve
                        </legend>
                        <label htmlFor="petType">
                            Type of Pet I Specialize In
                        </label>
                        <select
                            id="petType"
                            name="field3"
                            value={employee.petTypeId}
                            required
                            onChange={(evt) => {
                                const copy = { ...employee }
                                copy.petTypeId = +evt.target.value
                                setEmployee(copy)
                            }}
                        >
                            <option value="">Pick a pet type</option>
                            {petOptions}
                        </select>
                        <div className="d-flex justify-content-between">
                            <label htmlFor="phone">Zip Codes I Serve</label>
                            <Button variant="info" onClick={handleShow}>
                                View Locations
                            </Button>
                            <Modal
                                size="lg"
                                show={show}
                                onHide={() => setShow(false)}
                                aria-labelledby="example-modal-sizes-title-lg"
                            >
                                <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    Current Service Locations
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Zip</th>
                                            <th>Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {zipTable}
                                    </tbody>
                                    </Table>
                                </Modal.Body>
                            </Modal>
                        </div>
                        <div className={styles.checkboxHolder}>
                            <label
                                htmlFor="checkbox"
                                className={styles["register-text"]}
                            >
                                I can serve all locations
                            </label>
                            <input
                                className={styles.checkbox}
                                onChange={(evt) => {
                                    if (evt.target.checked){
                                        setEnteredZips(zipObjects.map(el=>el.zip).sort().join(', '))
                                    } else {
                                        setEnteredZips("")
                                    }
                                }}
                                type="checkbox"
                                id="allLocations"
                                checked={
                                    enteredZips.split(', ').length === zipObjects.length ? true : false
                                }
                            />
                        </div>
                        <input
                            type="text"
                            id="phone"
                            name="field5"
                            required
                            placeholder="separate by commas"
                            value = {enteredZips}
                            onChange={updateZips}
                        />
                        <div className={styles.checkboxHolder}>
                            <label
                                htmlFor="checkbox"
                                className={styles["register-text"]}
                            >
                                I can administer medications
                            </label>
                            <input
                                className={styles.checkbox}
                                onChange={(evt) => {
                                    const copy = { ...employee }
                                    copy.medications = evt.target.checked
                                        ? 1
                                        : 0
                                    setEmployee(copy)
                                }}
                                type="checkbox"
                                id="medications"
                                checked={
                                    employee.medications === 1 ? true : false
                                }
                            />
                        </div>
                    </fieldset>
                    <input
                        type="submit"
                        value="Save Changes"
                        onClick={(clickEvent) =>
                            handleSaveButtonClick(clickEvent)
                        }
                    />
                </form>
            </div>
        </>
    )
}
