import Modal from "../UI/Modal";
import { useState } from "react";
import { ailDivision, ascDivision, apcDivision } from "../../App";
import axios from "axios";
import LoadingSpinner from "../UI/LoadingSpinner";


const EditTableData = (props) => {

    const [bu, setBu] = useState(localStorage.getItem("buState"));
    const [divisionArray, setDivisionArray] = useState(ailDivision);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    //states for the form data****************************
    const [division, setDivision] = useState(props.data["Division"]);
    const [receivedDate, setReceivedDate] = useState(props.data["Received Date"]);
    const [startDate, setStartDate] = useState(props.data["Start Date"]);
    const [activityType, setActivityType] = useState(props.data["Activity Type"]);
    const [finalDelivery, setFinalDelivery] = useState(props.data["Final Delivery"]);
    const [va, setVa] = useState(props.data["Number of VAs"]);
    const [staticSlides, setStaticSlides] = useState(props.data["Static Slides"]);
    const [interactiveSlides, setInteractiveSlides] = useState(props.data["Interactive Slides"]);
    const [adaptionSlides, setAdaptionSlides] = useState(props.data["Adaption Slides"]);
    const [customPages, setCustomPages] = useState(props.data["Custom Pages"]);
    const [staticPages, setStaticPages] = useState(props.data["Static Pages"]);
    const [taskName, setTaskName] = useState(props.data["Task Name"]);
    const [emailerType, setEmailerType] = useState(props.data["Emailer Type"]);
    const [emailerSubject, setEmailerSubject] = useState(props.data["Emailer Subject"]);
    const [addLink, setAddLink] = useState(props.data["Add Link"]);
    const [priority, setPriority] = useState(props.data["Priority"]);
    const [status, setStatus] = useState(props.data["Status"]);
    const [totalHours, setTotalHours] = useState();
    const [totalDays, setTotalDays] = useState();
    const [vistaarSpoc, setVistaarSpoc] = useState(props.data["Vistaar SPOC"]);
    const [buSpoc, setBuSpoc] = useState(props.data["BU SPOC"]);
    const [comments, setComments] = useState(props.data["Comments"]);

    const deliveryDate = new Date();
    // console.log("Delivery Date",deliveryDate.toLocaleString().slice(0,10))

    // hiding input fields based on activity type***********************
    const activityTypeUpdate = (e) => {
        setActivityType(e.target.value);
    }

    // const finalDeliveryDateHandler = (e) => {
    //     setStatus(e.target.value)
    //     if (status === "Uploaded to Production") {
    //         setFinalDelivery(e.target.value)
    //     } else {
    //         setFinalDelivery("")
    //     }
    // }


    const finalDeliveryDateHandler = (e) => {
        if (status === "Uploaded to Production") {
            console.log("If block")
            setFinalDelivery(e.target.value)
        } else {
            console.log("else block")
            setFinalDelivery("")
        }
    }

    console.log("status", status)
    console.log("Final Delivery", finalDelivery)

    const buUpdate = (e) => {
        setBu(e.target.value);
        // localStorage.setItem("buState", bu)
        if (e.target.value === "ail") setDivisionArray(ailDivision);
        else if (e.target.value === "asc") setDivisionArray(ascDivision);
        else if (e.target.value === "apc") setDivisionArray(apcDivision);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();

        setIsLoading(true);

        const editedData = {
            "Division": division,
            "Received Date": receivedDate,
            "Start Date": startDate,
            "Activity Type": activityType,
            "Number of VAs": va,
            "Static Slides": staticSlides,
            "Interactive Slides": interactiveSlides,
            "Adaption Slides": adaptionSlides,
            "Custom Pages": customPages,
            "Static Pages": staticPages,
            "Task Name": taskName,
            "Emailer Type": emailerType,
            "Emailer Subject": emailerSubject,
            "Add Link": addLink,
            "Priority": priority,
            "Status": status,
            "Final Delivery": finalDelivery,
            "Vistaar SPOC": vistaarSpoc,
            "BU SPOC": buSpoc,
            "Comments": comments
        }
        // console.log(editedData)

        // updating edited data in firebase database*******************************************
        axios.put(`https://project-tracker-7df16-default-rtdb.asia-southeast1.firebasedatabase.app/${bu}/${props.data.id}.json`, editedData).then(() => {
            setIsLoading(false);
            setIsLoading(false);
            props.onClose();
            window.location.reload();
        }).catch((err) => {
            setError(true)
            setIsLoading(false);

        })
    }

    return <Modal onClose={props.onClose} >
        <div>
            {error && <p style={{ color: "red" }}>Something went wrong, please try updating the data again!</p>}
            {isLoading && <LoadingSpinner />}
            {!isLoading &&

                <form onSubmit={formSubmitHandler} >

                    {/* BU************************ */}
                    <label>BU:
                        <select defaultValue={localStorage.getItem("buState")} required onChange={buUpdate}>
                            <option>
                                Select an Option
                            </option>
                            <option value="apc">APC</option>
                            <option value="asc">ASC</option>
                            <option value="ail">AIL</option>
                        </select>
                    </label>

                    {/* Division************************ */}

                    <label>Division:
                        <select defaultValue={props.data["Division"]} onChange={(e) => {
                            setDivision(e.target.value)
                        }}>
                            <option>{props.data["Division"]}</option>
                            {divisionArray.map((division, index) => (
                                <option value={division} key={index}>{division}</option>
                            ))}
                        </select>
                    </label>

                    {/* Activity type******************** */}
                    <label>
                        Activity Type:
                        <select defaultValue={props.data["Activity Type"]} onChange={activityTypeUpdate} >
                            {/* <option value={props.data["Activity Type"]}>{props.data["Activity Type"]}</option> */}
                            <option value="EDetailing">EDetailing</option>
                            <option value="Emailer">Emailer</option>
                            <option value="Landing Page">Landing Page</option>
                            <option value="RMC">RMC</option>
                        </select>
                    </label>

                    {/* Number of VAs********************** */}
                    {!!props.data["Static Slides"] && <label >
                        Number of VAs:
                        <input defaultValue={props.data["Number of VAs"]} type='number' min='0' onChange={(e) => { setVa(e.target.value) }} />
                    </label>}

                    {/* Static Slides********************** */}
                    {!!props.data["Static Slides"] && <label >
                        Static Slides:
                        <input defaultValue={props.data["Static Slides"]} type='number' min='0' onChange={(e) => { setStaticSlides(e.target.value) }} />
                    </label>}

                    {/* Interactive Slides********************** */}
                    {!!props.data["Static Slides"] && <label >
                        Interactive Slides:
                        <input defaultValue={props.data["Interactive Slides"]} type='number' min='0' onChange={(e) => { setInteractiveSlides(e.target.value) }} />
                    </label>}

                    {/* Adaptation Slides********************** */}
                    {!!props.data["Static Slides"] && <label >
                        Adaptation Slides:
                        <input defaultValue={props.data["Adaption Slides"]} type='number' min='0' onChange={(e) => { setAdaptionSlides(e.target.value) }} />
                    </label>}

                    {/* Emailer************************************************************* */}

                    {/* Emailer Type Pages********************** */}
                    {!!props.data["Emailer Type"] && <label>
                        Emailer Type:
                        <select value={props.data["Emailer Type"]} onChange={(e) => { setEmailerType(e.target.value) }}>
                            <option>Static</option>
                            <option>Custom</option>
                        </select>
                    </label>}

                    {/* Task/Emailer Name********************* */}
                    {!!props.data["Emailer Type"] && <label>
                        Task/Emailer Name:
                        <input defaultValue={props.data["Task Name"]} type="text" onChange={(e) => { setTaskName(e.target.value) }} />
                    </label>}

                    {/* Emailer Subject********************* */}
                    {!!props.data["Emailer Type"] && <label>
                        Emailer Subject:
                        <input defaultValue={props.data["Emailer Subject"]} type="text" onChange={(e) => { setEmailerSubject(e.target.value) }} />
                    </label>}

                    {/* Add Link********************* */}
                    <label>
                        Add Link:
                        <input defaultValue={props.data["Add Link"]} type="text" onChange={(e) => { setAddLink(e.target.value) }} />
                    </label>

                    {/* Priority******************** */}
                    <label>
                        Priority:
                        <select defaultValue={props.data["Priority"]} onChange={(e) => { setPriority(e.target.value) }}>
                            <option>Regular</option>
                            <option>High</option>
                        </select>
                    </label>

                    {/* Status******************** */}
                    <label>
                        Status:
                        <select defaultValue={props.data["Status"]} onChange={(e) => { setStatus(e.target.value) }}>
                            <option value="">---Select---</option>
                            <option value="Not Initiated">Not Initiated</option>
                            <option value="In Progress">In Progress</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Test Link Shared">Test Link Shared</option>
                            <option value="Uploaded to Sandbox">Uploaded to Sandbox</option>
                            <option value="Uploaded to Production">Uploaded to Production</option>
                            <option value="Feedback In Progress">Feedback In Progress</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </label>

                    {/* Received date**************** */}
                    {/* <label>
                        Received Date:
                        <input defaultValue={props.data.receivedDate.substring(0, 10)} type="date" onChange={(e) => { setReceivedDate(e.target.value) }} />
                    </label> */}

                    {/* Start date**************** */}
                    {/* <label>
                    Start Date:
                    <input defaultValue={props.data.startDate.substring(0, 10)} type="date" onChange={(e) => { setStartDate(e.target.value) }} />
                </label> */}

                    {/* Final date of Delivery**************** */}
                    <label>
                        Final Date of Delivery:
                        <input type="date" required={status === "Uploaded to Production" || status === "Completed"} value={finalDelivery} onChange={finalDeliveryDateHandler}
                        />
                    </label>

                    {/* Vistaar SPOC******************** */}
                    <label>
                        Vistaar SPOC:
                        <select defaultValue={props.data["Vistaar SPOC"]} onChange={(e) => { setVistaarSpoc(e.target.value) }}>
                            <option>Vanessa</option>
                            <option>Neelam</option>
                            <option>Onkar</option>
                            <option>Darshan</option>
                        </select>
                    </label>

                    {/* BU SPOC******************** */}
                    <label>
                        BU SPOC:
                        <input defaultValue={props.data["BU SPOC"]} type='text' onChange={(e) => { setBuSpoc(e.target.value) }} />
                    </label>

                    {/* Comments******************** */}
                    <label>
                        Comments:
                        <input required={status === "On Hold" || status === "Cancelled"} defaultValue={props.data["Comments"]} type='text' onChange={(e) => { setComments(e.target.value) }} />
                    </label>

                    <button>Save</button>
                    &nbsp;
                    <button onClick={props.onClose}>Cancel</button>
                </form>
            }
        </div>
    </Modal>
}

export default EditTableData